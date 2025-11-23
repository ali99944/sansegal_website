"use client"

import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/src/types/product"
import { useCart } from "@/src/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Dictionary } from "@/src/types/dictionary"

const calculateDiscountAmount = (product: Product) => {
  if (!product.discount) return null
  if (product.discount_type == 'fixed') {
    return `-${+product.discount} LE`
  }
  return `-${product.discount}%`
}

interface ProductCardProps {
  product: Product
  dictionary: Dictionary['home']['products']['card'] // Pass the specific dictionary part
}

export function ProductCard({ product, dictionary }: ProductCardProps) {
  const [, setIsHovered] = useState(false)
  const router = useRouter()
  const { addToCart, loading } = useCart()

  const handleAddToCart = async () => {
    await addToCart(product.id, 1)
  }
  
  const navigateToProductPage = () => {
    router.push(`/products/${product.id}`)
  }
  
  // Dynamic name based on current language (assuming you add this to your routing/context)
  // For now, defaulting to 'en', but you'd replace 'en' with a variable like `currentLang`
  const productName = product.name['en'] 

  return (
    <div
      className="group relative bg-white shadow-sm rounded-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* Badges */}
        <div className="bg-[#0d1321] flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          {product.created_at && (
            <span className="bg-highlight text-primary text-xs font-semibold px-2 py-1 rounded text-center">
              {dictionary.newBadge}
            </span>
          )}
          {product.discount && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded text-center">
              {dictionary.discountBadge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          onClick={handleAddToCart}
          loading={loading}
          className={`flex !py-1 !px-2 cursor-pointer rounded-full transition-all duration-300 bg-white/80 text-primary hover:bg-white `}
        >
          <ShoppingBag className={`h-4 w-4`} />
        </Button>
        </div>
      {/* Product Image */}
      <div className="relative aspect-[4/4] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-contain transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 onClick={navigateToProductPage} className="font-serif cursor-pointer hover:underline underline-offset-2 text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors line-clamp-1">
          {productName}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-md font-bold text-primary">
              {
                product.discount && product.discount != 0 ? (
                  product.discount_type == 'fixed' ? (
                    `${product.price - product.discount} ${dictionary.currency}`
                  ) : (
                    `${product.price - (product.price * (product.discount / 100))} ${dictionary.currency}`
                  )
                ) : (
                  `${product.price} ${dictionary.currency}`
                )
              }
            </span>
          </div>
          {product.discount && product.discount != 0 && (
            <span className="text-xs text-red-600 font-semibold">
              {calculateDiscountAmount(product)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}