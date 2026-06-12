"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, formatPrice, getWhatsAppUrl, type Product } from "@/lib/products";

// 3 Featured products for the carousel
const featuredProducts: Product[] = [
  products.find(p => p.id === "joggin1")!,
  products.find(p => p.id === "buzo1")!,
  products.find(p => p.id === "jean1")!,
].filter(Boolean);

// Descriptions for each featured product
const descriptions: Record<string, string> = {
  "joggin1": "Conjunto completo Tech Fit. Comodidad y estilo para el día a día.",
  "buzo1": "Buzo oversize con diseño exclusivo. Algodón premium de alta calidad.",
  "jean1": "Pantalón chino recto en negro. Corte clásico y versátil para cualquier ocasión.",
};

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string | null>>({});
  const [isPaused, setIsPaused] = useState(false);

  const currentProduct = featuredProducts[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const handleBuy = () => {
    const selectedSize = selectedSizes[currentProduct.id];
    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
      alert("Por favor seleccioná un talle");
      return;
    }
    const url = getWhatsAppUrl(currentProduct.name, selectedSize || undefined);
    window.open(url, "_blank");
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [currentProduct.id]: size
    }));
  };

  return (
    <section 
      className="bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Image - Left side with navigation */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square bg-secondary rounded-sm overflow-hidden shadow-lg">
              <Image
                src={`/${currentProduct.image}`}
                alt={currentProduct.name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                aria-label="Producto anterior"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                aria-label="Siguiente producto"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? "bg-foreground w-6" 
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Ir al producto ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Product Info - Right side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Badge */}
            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Producto Destacado
            </span>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight text-balance">
              {currentProduct.name.toUpperCase()}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-base lg:text-lg">
              {descriptions[currentProduct.id] || "Producto de alta calidad KODE."}
            </p>

            {/* Price */}
            <p className="text-3xl sm:text-4xl font-bold text-foreground">
              {formatPrice(currentProduct.price)}
            </p>

            {/* Size Selector */}
            {currentProduct.sizes && currentProduct.sizes.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Seleccionar Talle
                </span>
                <div className="flex gap-3">
                  {currentProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`w-12 h-12 border text-sm font-medium transition-all duration-200 ${
                        selectedSizes[currentProduct.id] === size
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buy Button */}
            <button
              onClick={handleBuy}
              className="w-full bg-foreground text-background py-4 text-sm font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors duration-200 mt-2"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
