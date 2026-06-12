const fg = require('fast-glob');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function ensureDeps(){
  try{ require.resolve('fast-glob'); } catch(e){
    execSync('npm install fast-glob --no-audit --no-fund', {stdio:'inherit'});
  }
}

(async ()=>{
  await ensureDeps();
  const patterns = ['src/**/*.{js,jsx,ts,tsx,html}', 'components/**/*.{js,jsx,ts,tsx,html}', 'pages/**/*.{js,jsx,ts,tsx,html}'];
  const files = await fg(patterns, { dot:false, onlyFiles:true, unique:true });
  const map = new Map([
    ['Add to cart','Agregar al carrito'],
    ['Shop now','Comprar ahora'],
    ['New Collection','Nueva colección'],
    ['Search','Buscar'],
    ['Cart','Carrito'],
    ['Checkout','Checkout'],
    ['View cart','Ver carrito'],
    ['Continue to payment','Continuar al pago'],
    ['Sign in','Iniciar sesión'],
    ['Sign up','Registrarse'],
    ['Profile','Perfil'],
    ['Order summary','Resumen de pedido'],
    ['Subtotal','Subtotal'],
    ['Shipping','Envío'],
    ['Place order','Realizar pedido'],
    ['Quantity','Cantidad'],
    ['Size','Talle'],
    ['Filter','Filtrar'],
    ['Sort by','Ordenar por'],
    ['Loading','Cargando']
  ]);

  for (const file of files){
    try{
      let txt = await fs.readFile(file,'utf8');
      let original = txt;
      for (const [en,es] of map.entries()){
        const re = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'g');
        txt = txt.replace(re, es);
      }
      if (txt !== original){
        await fs.writeFile(file, txt, 'utf8');
        console.log('Traducido:', file);
      }
    } catch(e){ console.error('Error traduciendo', file, e.message); }
  }
  console.log('Traducción frontend completada. Revisar cambios.');
})();