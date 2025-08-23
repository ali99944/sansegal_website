"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Minus, Plus, Share2 } from "lucide-react"
import { Product, ProductImage } from "@/src/types/product"
import { useCart } from "@/src/hooks/use-cart"
import { ProductCard } from "@/components/features/home/product_card"
import { TranslatedViewProps } from "@/src/types/i18n"
import { useLocalization } from "@/src/hooks/use-localization"

interface ProductDetailsProps extends TranslatedViewProps {
  product: Product
  related_products: Product[]
}

export default function ProductDetailPage({ product, related_products, dictionary }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const { addToCart, loading } = useCart()
  const { locale } = useLocalization()
  const productDictionary = dictionary.product_details
  const currency = productDictionary.currency

  const galleryImages: ProductImage[] = [
    { id: 0, url: product.image },
    ...product.images
  ]
  
  // Get product name and description for the current language
  const productName = product.name[locale]
  const productDescription = product.description[locale]

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity)
  }

  const handleShareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: productDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(productDictionary.linkCopied);
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
                <div className="aspect-square bg-neutral-light rounded-lg overflow-hidden">
                  <Image
                    src={galleryImages[selectedImage].url || "/placeholder.svg"}
                    alt={productName}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
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
                        alt={`${productName} ${productDictionary.altImageView.replace('{index}', String(index + 1))}`}
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
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
                    {productName}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">{product?.price} {currency}</span>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-3">{productDictionary.quantity}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-neutral-light rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-neutral-mid/20 transition-colors rounded-l-lg"
                        disabled={quantity <= 1}
                        style={{ cursor: quantity > 1 ? 'pointer' : 'not-allowed' }}
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
                    <ShoppingBag className="h-5 w-5 mx-2" />
                    {productDictionary.addToCart
                        .replace('{price}', ((product?.price ?? 0) * quantity).toFixed(2))
                        .replace('{currency}', currency)}
                  </Button>
                  <Button onClick={handleShareProduct} size="lg" variant="outline" className="px-4 bg-transparent">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-8 pt-6 border-t border-neutral-mid/20">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary mb-4">{productDictionary.description}</h3>
                    <p className="text-neutral-mid text-md leading-relaxed">{productDescription}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary mb-4">{productDictionary.specifications}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.specifications?.map((spec) => (
                        <div key={spec.id} className="flex justify-between py-2 border-b border-black">
                          <span className="font-medium text-primary">{spec.key}</span>
                          <span className="text-neutral-mid text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto mt-8 ">
      {related_products.length !== 0 && (
              <div className="mt-20">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-semibold text-primary mb-4 tracking-tight">{productDictionary.relatedProductsTitle}</h2>
                  <p className="text-neutral-mid text-lg max-w-2xl mx-auto">{productDictionary.relatedProductsSubtitle}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                  {related_products.map((related_product) => (
                    <ProductCard key={related_product.id} product={related_product} dictionary={dictionary.home.products.card} />
                  ))}
                </div>
              </div>
            )}
      </div>
    </div>
  )
}