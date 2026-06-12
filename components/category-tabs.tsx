"use client";

import { useRef, useEffect } from "react";
import { type Category, categories } from "@/lib/products";

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Scroll to active tab when it changes
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = activeTabRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      // Calculate the scroll position to center the active tab
      const scrollLeft = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth"
      });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex px-4 sm:px-6 lg:px-8 lg:justify-center lg:w-full">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => onCategoryChange(category)}
                  className={`
                    relative flex-shrink-0 px-4 sm:px-6 py-4 min-h-[52px]
                    text-sm sm:text-base font-medium tracking-wider
                    transition-colors duration-200
                    ${isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground/80"
                    }
                  `}
                >
                  {category}
                  {/* Active indicator - bottom border */}
                  <span
                    className={`
                      absolute bottom-0 left-2 right-2 h-[3px] bg-foreground
                      transition-transform duration-200 origin-center
                      ${isActive ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar globally for this component */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
