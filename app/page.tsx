"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CategoryTabs } from "@/components/category-tabs";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { products, type Category } from "@/lib/products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("TODOS");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "TODOS") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const categoryCount = useMemo(() => {
    if (activeCategory === "TODOS") {
      return products.length;
    }
    return filteredProducts.length;
  }, [activeCategory, filteredProducts]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <Hero />

      {/* Category Filter Tabs */}
      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {/* Products Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-foreground">
                {activeCategory === "TODOS" ? "Todos los Productos" : activeCategory}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 tracking-wide">
                {categoryCount} {categoryCount === 1 ? "producto" : "productos"}
              </p>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
