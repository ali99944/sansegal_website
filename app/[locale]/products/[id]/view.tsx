"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Minus, Plus, Share2 } from "lucide-react"
import { ProductCard } from "@/components/features/home/feautred_products"
import { Product, ProductImage } from "@/src/types/product"
import { useCart } from "@/src/hooks/use-cart"



interface ProductDetailsProps {
  product: Product
  related_products: Product[]
}

export default function ProductDetailPage({ product, related_products }: ProductDetailsProps) {
  console.log(product);

  
  const [selectedImage, setSelectedImage] = useState(0)
  // const [selectedColor, setSelectedColor] = useState()
  const [quantity, setQuantity] = useState(1)
  const galleryImages: ProductImage[] = [
    {
      id: 0,
      url: product.image
    },
    ...product.images
  ]
  
  const { addToCart, loading } = useCart()
  const handleAddToCart = async () => {
    await addToCart(product.id, quantity)
  }

  const handleShareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name.en,
          text: product.description.en,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
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
                  src={galleryImages[selectedImage].url || "/placeholder.svg"}
                  // src={product?.image ?? ''}
                  alt={product?.name.en ?? ''}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex overflow-x-auto custom-scroll gap-3 pb-2 scrollbar-thin scrollbar-thumb-neutral-mid scrollbar-track-neutral-light">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-none aspect-square w-24 bg-neutral-light rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-neutral-mid"
                    }`}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`${product?.name} view ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
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
                <span className="text-3xl font-bold text-primary">{product?.price} EGP</span>
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
                      style={{
                        cursor: quantity > 1 ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-neutral-mid/20 cursor-pointer transition-colors rounded-r-lg"
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
                  loading={loading}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart - {((product?.price ?? 0) * quantity).toFixed(2)} EGP
                </Button>
                <Button onClick={handleShareProduct} size="lg" variant="outline" className="px-4 bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-8 pt-6 border-t border-neutral-mid/20">
                {/* Description */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Description</h3>
                  <p className="text-neutral-mid text-md leading-relaxed">{product?.description.en}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications?.map((spec) => (
                      <div key={spec.id} className="flex justify-between py-2 border-b border-black">
                        <span className="font-medium text-primary">{spec.key}</span>
                        <span className="text-neutral-mid">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            related_products.length != 0 && (
              <div className="mt-20">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-semibold text-primary mb-4 tracking-tight">You May Also Like</h2>
                  <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
                    Discover more handcrafted pieces from our collection
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                  {related_products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </section>
    </div>
    </div>
  )
}
