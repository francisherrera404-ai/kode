const fs = require('fs');
const path = require('path');

// All images found in public/images
const images = [
  'remera1.jpeg', 'remera2.jpeg', 'remera4.jpeg', 'remera5.jpeg', 'remera6.jpeg',
  'remera7.jpeg', 'remera8.jpeg', 'remera10.jpeg', 'remera11.jpeg', 'remera12.jpeg',
  'remera13.jpeg', 'remera14.jpeg', 'remera15.jpeg',
  'jean1.jpeg', 'jean2.jpeg', 'jean3.jpeg', 'jean4.jpeg', 'jean5.jpeg',
  'jean6.jpeg', 'jean7.jpeg', 'jean8.jpeg', 'jean9.jpeg', 'jean10.jpeg',
  'jean11.jpeg', 'jean12.jpeg', 'jean13.jpeg', 'jean14.jpeg', 'jean15.jpeg',
  'jean16.jpeg', 'jean17.jpeg',
  'buzo1.jpeg', 'buzo2.jpeg', 'buzo3.jpeg', 'buzo4.jpeg', 'buzo5.jpeg',
  'buzo6.jpeg', 'buzo7.jpeg', 'buzo8.jpeg', 'buzo9.jpeg', 'buzo10.jpeg',
  'buzo11.jpeg', 'buzo12.jpeg', 'buzo13.jpeg',
  'joggin1.jpeg', 'joggin2.jpeg', 'joggin3.jpeg', 'joggin4.jpeg', 'joggin6.jpeg', 'joggin7.jpeg',
  'campera1.jpeg', 'campera2.jpeg', 'campera3.jpeg', 'campera4.jpeg', 'campera5.jpeg',
  'campera6.jpeg', 'campera7.jpeg', 'campera8.jpeg', 'campera9.jpeg', 'campera10.jpeg',
  'campera11.jpeg', 'campera12.jpeg',
  'conjunto1.jpeg', 'conjunto2.jpeg', 'conjunto3.jpeg', 'conjunto4.jpeg', 'conjunto5.jpeg', 'conjunto6.jpeg',
  'accesorio (1).jpeg', 'accesorio (2).jpeg', 'accesorio (3).jpeg', 'accesorio (4).jpeg',
  'accesorio (5).jpeg', 'accesorio (6).jpeg', 'accesorio (7).jpeg', 'accesorio (8).jpeg',
  'accesorio (9).jpeg', 'accesorio (12).jpeg', 'accesorio (13).jpeg', 'accesorio (14).jpeg',
  'accesorio (15).jpeg', 'accesorio (16).jpeg', 'accesorio (17).jpeg', 'accesorio (18).jpeg',
  'accesorio (19).jpeg', 'accesorio (20).jpeg', 'accesorio (21).jpeg', 'accesorio (22).jpeg',
  'accesorio (23).jpeg', 'accesorio (24).jpeg',
  'acessorio (23).jpeg', 'acessorio (24).jpeg',
  'oufit1.jpeg'
];

const categoryMap = {
  remera: ['remera'],
  jean: ['jean'],
  joggin: ['joggin'],
  buzo: ['buzo'],
  campera: ['campera'],
  accesorio: ['accesorio', 'acessorio'],
  conjunto: ['conjunto', 'oufit'],
};

const colorMap = {
  negro: ['negro', 'black'],
  blanco: ['blanco', 'white'],
  gris: ['gris', 'gray'],
  azul: ['azul', 'blue', 'marino', 'escolar'],
  rojo: ['rojo', 'red'],
  verde: ['verde', 'green'],
  beige: ['beige', 'cream', 'crema', 'café', 'cafe'],
  burdeos: ['burdeos', 'burgundy', 'wine', 'bordo'],
  marrón: ['marron', 'brown'],
};

const descriptions = {
  remera: 'Remera de algodón premium confeccionada con atención al detalle. Diseño minimalista perfecto para streetwear urbano.',
  jean: 'Jean con tela denim premium y elasticidad natural. Confeccionado para máxima durabilidad y comodidad.',
  buzo: 'Buzo de algodón con capucha ajustable. Prenda versátil diseñada para comodidad y estilo urbano.',
  joggin: 'Pantalón jogger de tela breathable. Perfecto para looks casuales, deportivos y athleisure.',
  campera: 'Campera de tela premium con costuras reforzadas. Diseño icónico del streetwear moderno premium.',
  accesorio: 'Accesorio de moda confeccionado en materiales duraderos. Completa cualquier outfit urbano.',
  conjunto: 'Set completo de prendas coordinadas. Cada pieza diseñada para combinar perfectamente entre sí.',
};

const priceMap = {
  remera: 4999,
  jean: 9999,
  joggin: 5999,
  buzo: 8999,
  campera: 14999,
  accesorio: 1999,
  conjunto: 16999,
};

function detectCategory(filename) {
  const lower = filename.toLowerCase();
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return cat;
    }
  }
  return 'otros';
}

function detectColor(filename) {
  const lower = filename.toLowerCase();
  for (const [color, keywords] of Object.entries(colorMap)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return color;
    }
  }
  return 'varios';
}

const products = images.map((img, idx) => {
  const id = idx + 1;
  const cat = detectCategory(img);
  const color = detectColor(img);
  const nameNoExt = img.replace(/\.[^.]+$/, '');

  return {
    id: `p${String(id).padStart(4, '0')}`,
    nombre: `${cat.charAt(0).toUpperCase() + cat.slice(1)} KODE ${id}`,
    descripcion: descriptions[cat] || descriptions['accesorio'],
    categoria: cat,
    color: color,
    talles: cat === 'accesorio' ? [] : ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    precio: priceMap[cat] || 2999,
    tags: [cat, 'kode', 'premium', color].filter(t => t),
    slug: `${cat}-${nameNoExt.replace(/\s+/g, '-')}-${id}`.toLowerCase(),
    ruta_imagen: `/images/${img}`,
    destacado: id % 5 === 1,
  };
});

// Write products.json
fs.writeFileSync(path.join(__dirname, 'public', 'products.json'), JSON.stringify(products, null, 2), 'utf8');

console.log(`✅ Catálogo generado: ${products.length} productos`);
console.log('Resumen por categoría:');
const byCat = {};
products.forEach(p => {
  if (!byCat[p.categoria]) byCat[p.categoria] = 0;
  byCat[p.categoria]++;
});
Object.entries(byCat).sort().forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
