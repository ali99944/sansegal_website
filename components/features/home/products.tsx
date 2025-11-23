"use client"

import { useProducts } from "@/src/hooks/use-products"
import { TranslatedViewProps } from "@/src/types/i18n"
import { ProductCard } from "./product_card"

export function AllProducts({ dictionary }: TranslatedViewProps) {
  const { data: products = [], isFetching: is_products_loading } = useProducts()

  if (is_products_loading) {
    return (
      <section className="section-padding bg-neutral-light py-20">
        <div className="container-luxury max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="w-full p-4 mb-4 bg-[#0d1321]/10 animate-pulse flex items-center justify-center h-16">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-4 p-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="bg-gray-100 h-10 flex items-center justify-between px-3"></div>
                <div className="relative aspect-[4/4] bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-neutral-light py-20">
      <div className="container-luxury max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="w-full p-4 mb-4 bg-[#0d1321] flex items-center justify-center">
            <h2 className="font-serif text-3xl font-semibold text-white tracking-tight">
              {dictionary.home.products.sectionTitle}
            </h2> 
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-4 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} dictionary={dictionary.home.products.card} />
          ))}
        </div>

      </div>
    </section>
  )
}

// Keep the old component name for backward compatibility
export const FeaturedProducts = AllProducts