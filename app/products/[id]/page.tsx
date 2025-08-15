"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Minus, Plus, Share2 } from "lucide-react"
import { ProductCard } from "@/components/features/home/feautred_products"
import { useProduct } from "@/src/hooks/use-products"
import { useParams } from "next/navigation"
import { Product } from "@/src/types/product"


const relatedProducts: Product[] = []

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  // const [selectedColor, setSelectedColor] = useState()
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const { data: product, isFetching: is_product_loading } = useProduct(+!id)

  const handleAddToCart = () => {

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
                  // src={product?.images[selectedImage] || "/placeholder.svg"}
                  src={''}
                  alt={product?.name.en ?? ''}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              {/* <div className="grid grid-cols-4 gap-3">
                {product?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-neutral-light rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-neutral-mid"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product?.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div> */}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Badges */}
              {/* <div className="flex gap-2">
                {product?.isNew && (
                  <span className="bg-highlight text-primary text-sm font-semibold px-3 py-1 rounded">New</span>
                )}
                {product?.isSale && (
                  <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">Sale</span>
                )}
              </div> */}

              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
                  {product?.name.en}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">${product?.price}</span>
              </div>

              <div>
                {/* <h3 className="font-semibold text-primary mb-3">Color: {selectedColor.name}</h3> */}
                {/* <div className="flex gap-3">
                  {product?.colors.map((color) => (
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
                </div> */}
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
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart - ${((product?.price ?? 0) * quantity).toFixed(2)}
                </Button>
                <Button size="lg" variant="outline" className="px-4 bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-8 pt-6 border-t border-neutral-mid/20">
                {/* Description */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Description</h3>
                  <p className="text-neutral-mid text-lg leading-relaxed">{product?.description.en}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries([]).map(([key, value]) => (
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
