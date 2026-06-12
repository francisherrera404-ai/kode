const fg = require('fast-glob');
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function ensureDeps() {
  try { require.resolve('sharp'); require.resolve('slugify'); }
  catch (e) {
    console.log('Instalando dependencias: sharp fast-glob slugify (esto ejecuta npm install en tu máquina)...');
    execSync('npm install sharp fast-glob slugify --no-audit --no-fund', { stdio: 'inherit' });
  }
}

(async ()=>{
  await ensureDeps();
  const sharp = require('sharp');
  const slugify = require('slugify');
  const root = process.cwd();
  const searchDirs = [path.join(root,'public'), path.join(root,'assets'), path.join(root,'src')];
  const patterns = searchDirs.map(d=>path.posix.join(d.replace(/\\/g,'/'),'**/*.{jpg,jpeg,png,webp}'));
  const files = await fg(patterns, { dot: false, onlyFiles: true, unique: true });
  const outImgDir = path.join(root,'public','img');
  const outProdDir = path.join(root,'public','products');
  await fsp.mkdir(outImgDir, { recursive: true });
  await fsp.mkdir(outProdDir, { recursive: true });

  const counters = {};
  const products = [];

  function inferCategory(name){
    name = name.toLowerCase();
    if (name.includes('remera')) return 'remera';
    if (name.includes('jean')) return 'jean';
    if (name.includes('joggin') || name.includes('jogger')) return 'joggin';
    if (name.includes('campera')) return 'campera';
    if (name.includes('buzo')) return 'buzo';
    if (name.includes('gorra') || name.includes('gorro')) return 'accesorio';
    if (name.includes('accesor') || name.includes('acessorio')) return 'accesorio';
    if (name.includes('conjunto') || name.includes('outfit')) return 'conjunto';
    return 'varios';
  }
  function inferColor(name){
    name = name.toLowerCase();
    if (/negro|black/.test(name)) return 'Negro';
    if (/blanco|white|offwhite/.test(name)) return 'Blanco';
    if (/azul|blue/.test(name)) return 'Azul';
    if (/gris|gray/.test(name)) return 'Gris';
    if (/beige|camel/.test(name)) return 'Beige';
    if (/verde/.test(name)) return 'Verde';
    return 'Varios';
  }
  function defaultsFor(cat){
    switch(cat){
      case 'remera': return {style:'oversize',label:'REMERAS',sizes:['S','M','L','XL'],price:30000};
      case 'jean': return {style:'recto',label:'JEANS',sizes:['28','30','32','34','36'],price:45000};
      case 'joggin': return {style:'relaxed',label:'JOGGINS',sizes:['S','M','L','XL'],price:40000};
      case 'campera': return {style:'premium',label:'CAMPERAS',sizes:['S','M','L','XL'],price:90000};
      case 'buzo': return {style:'oversize',label:'BUZOS',sizes:['S','M','L','XL'],price:55000};
      case 'accesorio': return {style:'premium',label:'ACCESORIOS',sizes:['U'],price:8000};
      case 'conjunto': return {style:'coordinado',label:'CONJUNTOS',sizes:['S','M','L'],price:65000};
      default: return {style:'minimal',label:'VARIOS',sizes:['S','M','L'],price:25000};
    }
  }

  for (const file of files){
    try{
      const name = path.basename(file);
      const base = path.parse(name).name;
      const ext = '.webp';
      const cat = inferCategory(file+base);
      counters[cat] = (counters[cat]||0)+1;
      const idx = String(counters[cat]).padStart(2,'0');
      const color = inferColor(base);
      const def = defaultsFor(cat);
      const newBase = `${cat}-${color.toLowerCase()}-${def.style}-kode-${idx}`.replace(/\s+/g,'-');
      const slug = slugify(newBase, {lower:true,strict:true});
      const outName = `${slug}${ext}`;
      const outPath = path.join(outImgDir,outName);

      // Procesar imagen con sharp: intentar trim, centrar, mejorar, convertir webp
      let img = sharp(file, {failOnError:false});
      try{ img = img.trim(); } catch(e){}
      img = img.resize(1200,1200, { fit:'contain', background:{r:0,g:0,b:0,alpha:0} });
      img = img.modulate({ brightness:1.03, saturation:1.01 });
      img = img.sharpen();
      await img.webp({quality:82,effort:6,nearLossless:true}).toFile(outPath);

      const title = `${cat.charAt(0).toUpperCase()+cat.slice(1)} ${color} ${def.style}`.replace(/\s+/g,' ').trim();
      const description = `KODE: ${title}. Prenda premium, corte ${def.style}, color ${color}. Minimalista, urbano y duradero. Ideal para outfits streetwear.`;
      const product = {
        id: `${cat}-${idx}`,
        name: title,
        description,
        category: def.label,
        color,
        sizes: def.sizes,
        price: def.price,
        tags: [cat,def.style,color,'kode','premium','urbano'],
        slug,
        image: `./img/${outName}`
      };
      products.push(product);
      console.log('Procesado:', file, '->', outPath);
    } catch(err){
      console.error('Error procesando', file, err.message);
    }
  }

  await fsp.writeFile(path.join(outProdDir,'products.json'), JSON.stringify(products,null,2),'utf8');
  console.log('Catálogo generado:', path.join(outProdDir,'products.json'));
})();