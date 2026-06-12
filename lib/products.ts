export type Category = 
  | "TODOS" 
  | "BUZOS" 
  | "JEANS" 
  | "CAMPERAS" 
  | "JOGGINGS" 
  | "REMERAS";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  sizes?: string[];
  featured?: boolean;
}

// Centralized product database - easy to edit
export const products: Product[] = [
  // BUZOS (buzo1 - buzo13)
  { id: "buzo1", name: "Buzo Money - Bordos", category: "BUZOS", price: 35000, image: `images/buzo1.jpeg`, sizes: ["4", "3"]},
 
  { id: "buzo3", name: "Buzo strewtear negro trigal (frizado)", category: "BUZOS", price: 35000, image: `images/buzo3.jpeg`, sizes: ["5", "3", "2"] },
  { id: "buzo4", name: "Buzo Urban -beige oversite", category: "BUZOS", price: 35000, image: `images/buzo4.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "buzo7", name: "sweter wafle - Gris Oscuro", category: "BUZOS", price: 20000, image: `images/buzo7.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "buzo8", name: "Buzo darlon - verde", category: "BUZOS", price: 25000, image: `images/buzo8.jpeg`, sizes: ["S", "M", "L", "XL"] },
  
  { id: "buzo10", name: "Buzo con capucha - azul", category: "BUZOS", price: 25000, image: `images/buzo10.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "buzo11", name: "Buzo liso - gris", category: "BUZOS", price: 35000, image: `images/buzo11.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "buzo12", name: "Buzo con capucha - bordo", category: "BUZOS", price: 25000, image: `images/buzo12.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "buzo13", name: "Buzo Bicolor - Marron", category: "BUZOS", price: 35000, image: `images/buzo13.jpeg`, sizes: ["S", "M", "L", "XL"] },

  // JEANS (jean1 - jean17)
  { id: "jean1", name: "Chino Recto - Negro Esencial", category: "JEANS", price: 40000, image: `images/jean1.jpeg`, sizes: ["S", "M", "L", "XL"], featured: true },
  { id: "jean2", name: "Jean Slim - Azul Oscuro", category: "JEANS", price: 35000, image: `images/jean2.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean3", name: "Jean Straight - Negro", category: "JEANS", price: 35000, image: `images/jean3.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean4", name: "Jean Baggy - Azul Claro", category: "JEANS", price: 35000, image: `images/jean4.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean5", name: "Jean Cargo - Verde", category: "JEANS", price: 35000, image: `images/jean5.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean6", name: "Jean Relaxed - Gris", category: "JEANS", price: 35000, image: `images/jean6.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean7", name: "Jean Classic - Indigo", category: "JEANS", price: 35000, image: `images/jean7.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean8", name: "Jean Skinny - Negro", category: "JEANS", price: 35000, image: `images/jean8.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean9", name: "Jean Wide - Azul Medio", category: "JEANS", price: 35000, image: `images/jean9.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean10", name: "Jean Tapered - Carbón", category: "JEANS", price: 35000, image: `images/jean10.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean11", name: "Jean Distressed - Azul", category: "JEANS", price: 35000, image: `images/jean11.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean12", name: "Jean Premium - Negro", category: "JEANS", price: 35000, image: `images/jean12.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean13", name: "Jean Urban - Gris Oscuro", category: "JEANS", price: 35000, image: `images/jean13.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean14", name: "Jean Tech - Negro", category: "JEANS", price: 35000, image: `images/jean14.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean15", name: "Jean Essential - Azul", category: "JEANS", price: 35000, image: `images/jean15.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean16", name: "Jean Vintage - Desteñido", category: "JEANS", price: 35000, image: `images/jean16.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "jean17", name: "Jean Modern - Negro", category: "JEANS", price: 35000, image: `images/jean17.jpeg`, sizes: ["S", "M", "L", "XL"] },

  // CAMPERAS (campera1 - campera12)
  { id: "campera1", name: "Campera Bomber - Negra", category: "CAMPERAS", price: 30000, image: `images/campera1.jpeg`, sizes: ["S", "M", "L", "XL"], featured: true },
  { id: "campera2", name: "Conjunto de river", category: "CAMPERAS", price: 30000, image: `images/campera2.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera3", name: "Campera Puffer - Negra", category: "CAMPERAS", price: 30000, image: `images/campera3.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera4", name: "Campera Leather - Negra", category: "CAMPERAS", price: 30000, image: `images/campera4.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera5", name: "Campera Coach - Azul Marino", category: "CAMPERAS", price: 30000, image: `images/campera5.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera6", name: "Campera Windbreaker - Gris", category: "CAMPERAS", price: 30000, image: `images/campera6.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera7", name: "Campera Track - Negra", category: "CAMPERAS", price: 30000, image: `images/campera7.jpeg`, sizes: ["S", "M", "L",("XL")], featured:true},

  { id: "campera8", name: "Campera Sherpa - Beige", category: "CAMPERAS", price: 30000, image: `images/campera8.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera9", name: "Campera Varsity - Negra", category: "CAMPERAS", price: 30000, image: `images/campera9.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera10", name: "Campera Rain - Negra", category: "CAMPERAS", price: 30000, image: `images/campera10.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera11", name: "Campera Quilted - Gris", category: "CAMPERAS", price: 30000, image: `images/campera11.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "campera12", name: "Campera Tech - Negra", category: "CAMPERAS", price: 30000, image: `images/campera12.jpeg`, sizes: ["S", "M", "L", "XL"] },

  // JOGGINGS (joggin1 - joggin12)
  { id: "joggin1", name: "Conjunto Tech Fit - Azul Escolar", category: "JOGGINGS", price: 30000, image: `images/joggin1.jpeg`, sizes: ["S", "M", "L", "XL"], featured: true },
  { id: "joggin2", name: "Joggin Relaxed - Negro", category: "JOGGINGS", price: 30000, image: `images/joggin2.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "joggin3", name: "Joggin Cargo - Gris", category: "JOGGINGS", price: 30000, image: `images/joggin3.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "joggin4", name: "Joggin Sport -gris", category: "JOGGINGS", price: 15000, image: `images/joggin4.jpeg`, sizes: ["S", "M", "L", "XL"] },
 
  { id: "joggin6", name: "Joggin Wide - Beige", category: "JOGGINGS", price: 30000, image: `images/joggin6.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "joggin7", name: "Joggin Tech - Gris Oscuro", category: "JOGGINGS", price: 30000, image: `images/joggin7.jpeg`, sizes: ["S", "M", "L", "XL"] },
 
  // REMERAS (remera1 - remera15)
 
  { id: "remera2", name: "Remera Logo - Blanca", category: "REMERAS", price: 20000, image: `images/remera2.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera3", name: "Remera Oversized - Gris", category: "REMERAS", price: 20000, image: `images/remera3.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera4", name: "Remera Print - Negra", category: "REMERAS", price: 20000, image: `images/remera4.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera5", name: "Remera Essential - Blanca", category: "REMERAS", price: 20000, image: `images/remera5.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera6", name: "Remera Vintage - Crema", category: "REMERAS", price: 20000, image: `images/remera6.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera7", name: "Remera Urban - Negra", category: "REMERAS", price: 20000, image: `images/remera7.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera8", name: "Remera Graphic - Blanca", category: "REMERAS", price: 20000, image: `images/remera8.jpeg`, sizes: ["S", "M", "L", "XL"] },

  { id: "remera10", name: "Remera Long - Negra", category: "REMERAS", price: 20000, image: `images/remera10.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera11", name: "Remera Pocket - Blanca", category: "REMERAS", price: 20000, image: `images/remera11.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera12", name: "Remera Sport - Azul", category: "REMERAS", price: 20000, image: `images/remera12.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera13", name: "Remera Tech - Negra", category: "REMERAS", price: 20000, image: `images/remera13.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera14", name: "Remera Classic - Blanca", category: "REMERAS", price: 20000, image: `images/remera14.jpeg`, sizes: ["S", "M", "L", "XL"] },
  { id: "remera15", name: "Remera Premium - Negra", category: "REMERAS", price: 20000, image: `images/remera15.jpeg`, sizes: ["S", "M", "L", "XL"] },

];

export const categories: Category[] = [
  "TODOS",
  "BUZOS",
  "JEANS",
  "CAMPERAS",
  "JOGGINGS",
  "REMERAS",
];

export function formatPrice(price: number): string {
  return `$ ${price.toLocaleString('es-AR')}`;
}

export function getWhatsAppUrl(productName: string, size?: string): string {
  const phone = "5493804155476";
  const message = size 
    ? `Hola KODE, me interesa el ${productName} en talle ${size}. Quiero más info.`
    : `Hola KODE, me interesa el ${productName}. Quiero más info.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
