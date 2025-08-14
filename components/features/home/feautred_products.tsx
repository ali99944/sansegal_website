"use client"

import Image from "next/image"
import { Plus, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  nameAr: string
  price: number
  originalPrice?: number
  image: string
  isNew?: boolean
  isSale?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "Classic Tote Bag",
    nameAr: "حقيبة توت كلاسيكية",
    price: 299,
    originalPrice: 399,
    image: "/assets/images/products/p1.png",
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Executive Briefcase",
    nameAr: "حقيبة تنفيذية",
    price: 549,
    image: "/assets/images/products/p2.png",
    isNew: false,
  },
  {
    id: "3",
    name: "Evening Clutch",
    nameAr: "حقيبة يد مسائية",
    price: 199,
    originalPrice: 249,
    image: "/assets/images/products/p3.png",
    isSale: true,
  },
  {
    id: "4",
    name: "Crossbody Messenger",
    nameAr: "حقيبة كتف",
    price: 349,
    image: "/assets/images/products/p4.png",
    isNew: true,
  },
  {
    id: "5",
    name: "Travel Duffle",
    nameAr: "حقيبة سفر",
    price: 699,
    image: "/assets/images/products/p5.png",
  },
  {
    id: "6",
    name: "Mini Backpack",
    nameAr: "حقيبة ظهر صغيرة",
    price: 279,
    originalPrice: 329,
    image: "/assets/images/products/p6.png",
    isSale: true,
  },
  {
    id: "7",
    name: "Leather Satchel",
    nameAr: "حقيبة جلدية كلاسيكية",
    price: 429,
    image: "/assets/images/products/p7.jpg",
    isNew: true,
  },
  {
    id: "8",
    name: "Designer Handbag",
    nameAr: "حقيبة يد مصممة",
    price: 599,
    originalPrice: 699,
    image: "/assets/images/products/p8.jpg",
    isSale: true,
  },
  {
    id: "9",
    name: "Business Portfolio",
    nameAr: "محفظة أعمال",
    price: 379,
    image: "/assets/images/products/p9.jpg",
  },
  {
    id: "10",
    name: "Vintage Messenger",
    nameAr: "حقيبة رسول عتيقة",
    price: 459,
    image: "/assets/images/products/p10.jpg",
    isNew: true,
  },
  {
    id: "11",
    name: "Luxury Wallet",
    nameAr: "محفظة فاخرة",
    price: 149,
    originalPrice: 199,
    image: "/assets/images/products/p11.jpg",
    isSale: true,
  },
  {
    id: "12",
    name: "Weekend Bag",
    nameAr: "حقيبة نهاية الأسبوع",
    price: 529,
    image: "/assets/images/products/p12.jpg",
  },
  {
    id: "13",
    name: "Compact Purse",
    nameAr: "محفظة صغيرة",
    price: 189,
    image: "/assets/images/products/p13.jpg",
    isNew: true,
  },
  {
    id: "14",
    name: "Professional Briefcase",
    nameAr: "حقيبة مهنية",
    price: 649,
    originalPrice: 749,
    image: "/assets/images/products/p14.jpg",
    isSale: true,
  },
  {
    id: "15",
    name: "Casual Daypack",
    nameAr: "حقيبة يومية كاجوال",
    price: 329,
    image: "/assets/images/products/p15.jpg",
  },
  {
    id: "16",
    name: "Elegant Clutch",
    nameAr: "حقيبة يد أنيقة",
    price: 229,
    image: "/assets/images/products/p16.jpg",
    isNew: true,
  },
  {
    id: "17",
    name: "Premium Tote",
    nameAr: "حقيبة توت فاخرة",
    price: 399,
    originalPrice: 479,
    image: "/assets/images/products/p17.jpg",
    isSale: true,
  },
]

export function ProductCard({ product }: { product: Product }) {
  const [, setIsHovered] = useState(false)
  const router = useRouter()

  const navigateToProductPage = () => {
    router.push(`/products/${product.id}`)
  }

  return (
    <div
      onClick={navigateToProductPage}
      className="group relative bg-white shadow-none rounded-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {/* Badges */}
        <div className="bg-[#0d1321] flex items-center justify-between px-3 py-2">
        <div className="  flex items-center gap-2 ">
          {product.isNew && (
            <span className="bg-highlight text-primary text-xs font-semibold px-2 py-1 rounded text-center">New</span>
          )}
          {product.isSale && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded text-center">Discount</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => {}}
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
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500"
        />

        


      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-serif text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-mid line-through">${product.originalPrice}</span>
            )}
          </div>
          {product.isSale && product.originalPrice && (
            <span className="text-xs text-red-600 font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function AllProducts() {
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
