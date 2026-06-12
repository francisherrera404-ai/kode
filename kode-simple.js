#!/usr/bin/env node

/**
 * KODE AUTOMATION - VERSIÓN SIMPLIFICADA
 * Sin dependencias externas complejas
 * Ejecutar: node kode-simple.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function findImages() {
  log('\n📸 BUSCANDO IMÁGENES...', 'blue');
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    log('❌ No encontrado: public/images', 'yellow');
    return [];
  }

  const files = fs.readdirSync(imagesDir).filter(f => 
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  log(`✅ ${files.length} imágenes encontradas`, 'green');
  return files;
}

function generateCatalog(images) {
  log('\n📋 GENERANDO CATÁLOGO...', 'blue');

  const categories = {
    remera: ['remera'],
    jean: ['jean'],
    joggin: ['joggin'],
    buzo: ['buzo'],
    campera: ['campera'],
  };

  const detectCat = (name) => {
    const n = name.toLowerCase();
    for (const [cat, keywords] of Object.entries(categories)) {
      for (const k of keywords) {
        if (n.includes(k)) return cat;
      }
    }
    return 'otros';
  };

  const colors = {
    negro: ['negro', 'black'],
    blanco: ['blanco', 'white'],
    gris: ['gris', 'gray'],
    azul: ['azul', 'blue', 'marino'],
    rojo: ['rojo', 'red'],
    verde: ['verde', 'green'],
    beige: ['beige', 'cream', 'crema'],
  };

  const detectColor = (name) => {
    const n = name.toLowerCase();
    for (const [color, keywords] of Object.entries(colors)) {
      for (const k of keywords) {
        if (n.includes(k)) return color;
      }
    }
    return 'varios';
  };

  const priceMap = {
    remera: 4999,
    jean: 9999,
    joggin: 5999,
    buzo: 8999,
    campera: 14999,
    otros: 2999,
  };

  const descriptions = {
    remera: 'Remera de algodón premium con corte moderno. Diseño minimalista perfecto para streetwear.',
    jean: 'Jean con tela denim premium y elasticidad natural. Confeccionado para máxima durabilidad.',
    buzo: 'Buzo de algodón con capucha ajustable. Prenda versátil diseñada para comodidad y estilo.',
    joggin: 'Pantalón jogger de tela breathable. Perfecto para looks casuales y deportivos.',
    campera: 'Campera de tela premium con costuras reforzadas. Diseño icónico del streetwear moderno.',
  };

  const products = images.map((img, idx) => {
    const id = idx + 1;
    const cat = detectCat(img);
    const color = detectColor(img);
    const name = path.parse(img).name;

    return {
      id: `p${String(id).padStart(4, '0')}`,
      nombre: `${cat.charAt(0).toUpperCase() + cat.slice(1)} KODE ${id}`,
      descripcion: descriptions[cat] || descriptions['accesorio'],
      categoria: cat,
      color: color,
      talles: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      precio: priceMap[cat] || 2999,
      tags: [cat, 'kode', 'premium'],
      slug: `${name}-${id}`,
      ruta_imagen: `/images/${img}`,
      destacado: id % 5 === 0,
    };
  });

  // Guardar catálogo
  const jsonPath = path.join('public', 'products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf8');

  log(`✅ Catálogo generado: ${products.length} productos`, 'green');
  return products;
}

function updateProductsTs(products) {
  log('\n🔧 ACTUALIZANDO lib/products.ts...', 'blue');

  const productsTs = `export type Category = 
  | "TODOS" 
  | "BUZOS" 
  | "JEANS" 
  | "CAMPERAS" 
  | "JOGGINGS" 
  | "REMERAS" 
  | "ACCESORIOS" 
  | "CONJUNTOS";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  sizes?: string[];
  featured?: boolean;
}

// BASE DE DATOS GENERADA - ${products.length} PRODUCTOS
export const products: Product[] = [
${products
  .map(p => {
    const cat = p.categoria.toUpperCase();
    return `  { id: "${p.id}", name: "${p.nombre}", category: "${cat}", price: ${p.precio}, image: "${p.ruta_imagen}", sizes: ["XS", "S", "M", "L", "XL", "XXL"], featured: ${p.destacado} }`;
  })
  .join(',\n')}
];

export const categories: Category[] = [
  "TODOS",
  "BUZOS",
  "JEANS",
  "CAMPERAS",
  "JOGGINGS",
  "REMERAS",
  "ACCESORIOS",
  "CONJUNTOS",
];

export function formatPrice(price: number): string {
  return \`$ \${price.toLocaleString('es-AR')}\`;
}

export function getWhatsAppUrl(productName: string, size?: string): string {
  const phone = "5493804155476";
  const message = size 
    ? \`Hola KODE, me interesa el \${productName} en talle \${size}. Quiero más info.\`
    : \`Hola KODE, me interesa el \${productName}. Quiero más info.\`;
  return \`https://wa.me/\${phone}?text=\${encodeURIComponent(message)}\`;
}
`;

  const filePath = path.join('lib', 'products.ts');
  fs.writeFileSync(filePath, productsTs, 'utf8');
  log(`✅ Archivo actualizado: lib/products.ts`, 'green');
}

function main() {
  log('\n╔════════════════════════════════════════╗', 'bright');
  log('║  KODE - COMPLETE AUTOMATION SIMPLE   ║', 'cyan');
  log('║           Sistema Principal            ║', 'cyan');
  log('╚════════════════════════════════════════╝\n', 'bright');

  try {
    // Phase 1: Find images
    const images = findImages();
    if (images.length === 0) {
      log('❌ No hay imágenes para procesar', 'yellow');
      process.exit(1);
    }

    // Phase 2: Generate catalog
    const products = generateCatalog(images);

    // Phase 3: Update TypeScript
    updateProductsTs(products);

    // Summary
    log('\n\n════════════════════════════════════════', 'bright');
    log('        ✅ PROCESAMIENTO COMPLETADO ✅', 'green');
    log('════════════════════════════════════════\n', 'bright');

    log('📊 ESTADÍSTICAS:', 'blue');
    const byCat = {};
    products.forEach(p => {
      if (!byCat[p.categoria]) byCat[p.categoria] = 0;
      byCat[p.categoria]++;
    });

    Object.entries(byCat).sort().forEach(([cat, count]) => {
      log(`   ${cat.padEnd(12)} → ${count}`, 'yellow');
    });

    log('\n📁 ARCHIVOS GENERADOS:', 'blue');
    log('   ✅ public/products.json', 'green');
    log('   ✅ lib/products.ts', 'green');

    log('\n✨ La aplicación está lista para ejecutar con: npm run dev\n', 'cyan');
  } catch (e) {
    log(`\n❌ ERROR: ${e.message}`, 'red');
    console.error(e);
    process.exit(1);
  }
}

main();
