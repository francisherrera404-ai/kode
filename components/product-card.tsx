"use client";

import { useState } from "react";
import Image from "next/image";
import { type Product, formatPrice, getWhatsAppUrl } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  const handleBuy = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Selecciona un talle");
      return;
    }
    const url = getWhatsAppUrl(product.name, selectedSize || undefined);
    window.open(url, "_blank");
  };

  return (
    <div className="group bg-card border border-border overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
        {!imageError ? (
          <Image
            src={`/${product.image}`}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">
                {product.name}
              </p>
            </div>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-foreground text-background px-2 py-1 text-[10px] font-bold tracking-wider">
            FEATURED
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-card-foreground tracking-wide mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground tracking-wider mb-3">
          {product.category}
        </p>
        <p className="text-lg font-bold text-card-foreground tracking-wide mb-4">
          {formatPrice(product.price)}
        </p>

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-semibold text-muted-foreground tracking-wider mb-2">
              TALLE
            </p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 text-xs font-semibold tracking-wide border transition-all duration-200 ${
                    selectedSize === size
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
          className="w-full bg-foreground text-background py-3 text-sm font-bold tracking-[0.15em] transition-all duration-200 hover:bg-foreground/90 active:scale-[0.98]"
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
}
