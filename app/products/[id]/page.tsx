"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Minus, Plus, Share2 } from "lucide-react"
import { ProductCard } from "@/components/features/home/feautred_products"

interface Product {
  id: string
  name: string
  nameAr: string
  price: number
  originalPrice?: number
  images: string[]
  description: string
  specifications: { [key: string]: string }
  colors: { name: string; value: string }[]
  isNew?: boolean
  isSale?: boolean
  inStock: boolean
}

// Mock product data (in real app, this would be fetched based on the ID)
const mockProduct: Product = {
  id: "1",
  name: "Classic Tote Bag",
  nameAr: "حقيبة توت كلاسيكية",
  price: 299,
  originalPrice: 399,
  images: [
    "/assets/images/products/p1.png",
    "/assets/images/products/p2.png",
    "/assets/images/products/p3.png",
    "/assets/images/products/p4.png",
  ],
  description:
    "Crafted from premium full-grain leather, this classic tote bag embodies timeless elegance and functionality. Each piece is meticulously handcrafted by skilled artisans in Egypt, ensuring exceptional quality and attention to detail. The spacious interior and durable construction make it perfect for both professional and casual use.",
  specifications: {
    Material: "Full-grain Egyptian leather",
    Dimensions: "40cm x 30cm x 15cm",
    Weight: "1.2kg",
    "Handle Drop": "25cm",
    Closure: "Zip top closure",
    Interior: "Fabric lining with pockets",
    Hardware: "Antique brass",
    Care: "Clean with leather conditioner",
  },
  colors: [
    { name: "Cognac", value: "#B08D57" },
    { name: "Black", value: "#1A1A1A" },
    { name: "Brown", value: "#8B4513" },
    { name: "Tan", value: "#D2B48C" },
  ],
  isNew: true,
  isSale: true,
  inStock: true,
}

const relatedProducts = [
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
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0])
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", {
      product: mockProduct,
      color: selectedColor,
      quantity,
    })
  }

  return (
    <div className="py-12 px-4">
        <div className="bg-white min-h-screen max-w-7xl mx-auto p-8 rounded-lg shadow-sm">
      <section className="section-padding">
        <div className="container-luxury max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-neutral-light rounded-lg overflow-hidden">
                <Image
                  src={mockProduct.images[selectedImage] || "/placeholder.svg"}
                  alt={mockProduct.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-neutral-light rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-neutral-mid"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${mockProduct.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {mockProduct.isNew && (
                  <span className="bg-highlight text-primary text-sm font-semibold px-3 py-1 rounded">New</span>
                )}
                {mockProduct.isSale && (
                  <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">Sale</span>
                )}
              </div>

              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
                  {mockProduct.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">${mockProduct.price}</span>
                {mockProduct.originalPrice && (
                  <>
                    <span className="text-xl text-neutral-mid line-through">${mockProduct.originalPrice}</span>
                    <span className="bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded">
                      -{Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-3">Color: {selectedColor.name}</h3>
                <div className="flex gap-3">
                  {mockProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-12 h-12 rounded-full transition-all duration-300 ${
                        selectedColor.name === color.name
                          ? "ring-2 ring-primary ring-offset-2 scale-110"
                          : "hover:scale-105 hover:ring-1 hover:ring-neutral-mid hover:ring-offset-1"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {selectedColor.name === color.name && (
                        <div className="absolute inset-0 rounded-full border-2 border-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-neutral-light rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-neutral-mid/20 transition-colors rounded-l-lg"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-3 font-medium min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-neutral-mid/20 transition-colors rounded-r-lg"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-neutral-mid">{mockProduct.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleAddToCart}
                  disabled={!mockProduct.inStock}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart - ${(mockProduct.price * quantity).toFixed(2)}
                </Button>
                <Button size="lg" variant="outline" className="px-4 bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-8 pt-6 border-t border-neutral-mid/20">
                {/* Description */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Description</h3>
                  <p className="text-neutral-mid text-lg leading-relaxed">{mockProduct.description}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(mockProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-neutral-mid/10">
                        <span className="font-medium text-primary">{key}</span>
                        <span className="text-neutral-mid">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-semibold text-primary mb-4 tracking-tight">You May Also Like</h2>
              <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
                Discover more handcrafted pieces from our collection
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}
