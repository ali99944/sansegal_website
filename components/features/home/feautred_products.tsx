"use client"

import Image from "next/image"
import { Plus, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProducts } from "@/src/hooks/use-products"
import { Product } from "@/src/types/product"
import { useCart } from "@/src/hooks/use-cart"


const calculateDiscountAmount = (product: Product) => {
  if(!product.discount) return null
  if(product.discount_type == 'fixed') {
    return `-${+product.discount} LE`
  }

  return `-${product.discount}%`
}

export function ProductCard({ product }: { product: Product }) {
  const [, setIsHovered] = useState(false)
  const router = useRouter()
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    await addToCart(product.id, 1)
  }
  
  const navigateToProductPage = () => {
    router.push(`/products/${product.id}`)
  }

  return (
    <div
      className="group relative bg-white shadow-sm rounded-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* Badges */}
        <div className="bg-[#0d1321] flex items-center justify-between px-3 py-2">
        <div className="  flex items-center gap-2 ">
          {product.created_at && (
            <span className="bg-highlight text-primary text-xs font-semibold px-2 py-1 rounded text-center">New</span>
          )}
          {product.discount && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded text-center">Discount</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleAddToCart}
          className={`flex py-1.5 px-2 cursor-pointer rounded-full transition-all duration-300 bg-white/80 text-primary hover:bg-white `}
        >
          <ShoppingBag className={`h-4 w-4`} />
          <Plus className={`h-4 w-4 cursor-pointer`} />
        </button>
        </div>
      {/* Product Image */}
      <div className="relative aspect-[4/4] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name.en}
          fill
          className="object-contain transition-transform duration-500"
        />

        


      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 onClick={navigateToProductPage} className="font-serif cursor-pointer hover:underline underline-offset-2 text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors line-clamp-1">
          {product.name.en}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            {/* {product.price && (
              <span className="text-xs text-neutral-mid line-through">${product.price}</span>
            )} */}
          </div>
          {product.discount && (
            <span className="text-xs text-red-600 font-semibold">
              {calculateDiscountAmount(product)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function AllProducts() {
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
                {/* Badge Area Skeleton */}
                <div className="bg-gray-100 h-10 flex items-center justify-between px-3"></div>
                
                {/* Image Skeleton */}
                <div className="relative aspect-[4/4] bg-gray-200"></div>
                
                {/* Content Skeleton */}
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
            <h2 className="font-serif text-3xl font-semibold text-white tracking-tight">Our Products</h2> 
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-4 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}

// Keep the old component name for backward compatibility
export const FeaturedProducts = AllProducts
