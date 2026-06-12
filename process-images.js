/* Script automático (ES): procesa imágenes, genera products.json y actualiza rutas.
Requisitos: node >= 16. Ejecutar: npm run process-images

El script intenta instalar dependencias si faltan (sharp, fast-glob, slugify).

NO ejecutar en CI sin revisar.
*/
const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');

async function ensurePkg(name) {
  try {
    require.resolve(name);
    return true;
  } catch (e) {
    return false;
  }
}

async function run(cmd) {
  return new Promise((res, rej) => {
    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err) return rej({ err, stdout, stderr });
      res({ stdout, stderr });
    });
  });
}

async function main() {
  const cwd = process.cwd();
  // instalar deps si hacen falta
  const need = [];
  if (!await ensurePkg('fast-glob')) need.push('fast-glob');
  if (!await ensurePkg('slugify')) need.push('slugify');
  let hasSharp = await ensurePkg('sharp');
  if (!hasSharp) need.push('sharp');
  if (need.length) {
    console.log('Instalando dependencias:', need.join(', '));
    await run('npm install ' + need.join(' ') + ' --no-audit --no-fund --silent');
    hasSharp = await ensurePkg('sharp');
  }

  const fg = require('fast-glob');
  const slugify = require('slugify');
  const sharp = hasSharp ? require('sharp') : null;

  const searchDirs = ['public', 'assets', 'src', 'app', 'components'];
  const patterns = searchDirs.map(d => d + '/**/*.{jpg,jpeg,png,webp}');

  const entries = await fg(patterns, { dot: false, onlyFiles: true, unique: true, caseSensitiveMatch: false });
  if (!entries.length) {
    console.log('No se encontraron imágenes.');
    return;
  }

  // crear estructura
  const imgDir = path.join('public','img');
  const productsDir = path.join('public','products');
  await fs.mkdir(imgDir, { recursive: true });
  await fs.mkdir(productsDir, { recursive: true });

  const keywords = [
    ['remera','remera','camiseta'],
    ['jean','jeans','pantalon','denim'],
    ['joggin','jogger','jogging','jogging'],
    ['buzo','sweat','hoodie'],
    ['campera','chaqueta','campera','parka'],
    ['gorra','cap','hat'],
    ['accesorio','acessorio','accesorio','accesorios','accesorio'],
    ['conjunto','set','outfit','oufit','conjunto']
  ];
  const mapCategory = (name) => {
    const n = name.toLowerCase();
    for (const group of keywords) {
      for (const k of group) if (n.includes(k)) return group[0];
    }
    return 'otros';
  }

  const products = [];
  let idCounter = 1;
  const replacements = [];

  for (const rel of entries) {
    const abs = path.join(cwd, rel);
    const base = path.basename(rel);
    const nameNoExt = base.replace(/\.[^.]+$/, '');
    const inferred = mapCategory(rel + ' ' + base + ' ' + path.dirname(rel));
    const category = inferred;

    // infer color simple: buscar color palabras comunes
    const colors = ['negra','negro','blanco','blanca','azul','rojo','gris','verde','amarillo','beige'];
    let color = 'varios';
    for (const c of colors) if (rel.toLowerCase().includes(c)) { color = c; break; }

    const slugBase = slugify(nameNoExt + ' ' + category + ' kode', { lower: true, strict: true });
    const slug = slugBase + '-' + idCounter;
    const targetImgDir = path.join(imgDir, category);
    const targetProdDir = path.join(productsDir, category);
    await fs.mkdir(targetImgDir, { recursive: true });
    await fs.mkdir(targetProdDir, { recursive: true });

    const outFilename = slug + '.webp';
    const outPath = path.join(targetImgDir, outFilename);
    const prodPath = path.join(targetProdDir, outFilename);

    // procesar imagen (si sharp disponible)
    try {
      if (sharp) {
        let img = sharp(abs);
        // trim (remover borde de color homogéneo), centrar y convertir a fondo blanco
        img = img.flatten({ background: { r: 255, g: 255, b: 255 } }).trim();
        // resize con limit para mejorar peso, manteniendo aspecto
        img = img.resize(1200, 1200, { fit: 'inside', withoutEnlargement: true });
        await img.webp({ quality: 80 }).toFile(outPath);
        // copia al products folder (optimizado)
        await fs.copyFile(outPath, prodPath);
      } else {
        // sin sharp: solo copiar archivo y renombrar a .webp conservando extensión (no conversión real)
        const fallbackOut = path.join(targetImgDir, slug + path.extname(base));
        await fs.copyFile(abs, fallbackOut);
        await fs.copyFile(fallbackOut, path.join(targetProdDir, path.basename(fallbackOut)));
      }
    } catch (err) {
      console.error('Error procesando', rel, err.message || err);
    }

    const priceMap = { remera: 2999, jean: 7999, joggin: 3999, buzo: 5999, campera: 9999, gorra: 999, accesorio: 499, conjunto: 12999, otros: 1999 };
    const price = priceMap[category] || 1999;

    const product = {
      id: 'p' + String(idCounter).padStart(4,'0'),
      nombre: `${category} Kode ${idCounter}`,
      descripcion: `Producto Kode: ${category} - color ${color}. Imagen procesada automáticamente.`,
      categoria: category,
      color: color,
      talles: ['S','M','L'],
      precio: price,
      tags: [category, 'kode'],
      slug: slug,
      ruta_imagen: path.posix.join('/img', category, outFilename)
    };
    products.push(product);

    // record replacement: original rel -> new ruta_imagen
    replacements.push({ from: rel.replaceAll('\\','/'), to: product.ruta_imagen });

    idCounter++;
  }

  // escribir products.json
  await fs.writeFile(path.join('public','products.json'), JSON.stringify(products, null, 2), 'utf8');

  // actualizar referencias en archivos fuente (js, jsx, ts, tsx, html, css)
  const codeFiles = await fg(['**/*.{js,jsx,ts,tsx,html,css,md}'], { dot: true });
  for (const file of codeFiles) {
    if (file.startsWith('node_modules')) continue;
    let content = await fs.readFile(file, 'utf8');
    let changed = false;
    for (const r of replacements) {
      if (content.includes(r.from)) {
        content = content.split(r.from).join(r.to);
        changed = true;
      }
      // also attempt basename matches
      const basename = path.posix.basename(r.from);
      if (content.includes(basename) && !content.includes(r.to)) {
        content = content.split(basename).join(path.posix.basename(r.to));
        changed = true;
      }
    }
    if (changed) await fs.writeFile(file, content, 'utf8');
  }

  console.log('Procesado completado. Productos generados:', products.length);
  console.log('Resumen: imágenes procesadas:', entries.length);
}

main().catch(e => { console.error(e); process.exit(1); });
