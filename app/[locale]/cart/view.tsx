"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/src/hooks/use-cart"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useSettings } from "@/src/hooks/use-settings"
import { useLocalization } from "@/src/hooks/use-localization"
import { TranslatedViewProps } from "@/src/types/i18n"

export default function CartPage({ dictionary }: TranslatedViewProps) {
  const { items: cartItems, removeItem, clearCart, updateQuantity, loading } = useCart()  
  const { locale } = useLocalization()
  
  const cartDictionary = dictionary.cart

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const { data: settings } = useSettings()

  const shipping = settings?.store.delivery_fee ?? 0
  const tax = 0
  const total = subtotal + shipping + tax
  const currency = cartDictionary.currency

  // --- Empty Cart View ---
  if (cartItems.length === 0) {
    return (
      <div className="bg-neutral-light min-h-screen flex justify-center pt-20">
        <section className="section-padding">
          <div className="container-luxury max-w-2xl text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-12">
              <ShoppingBag className="h-16 w-16 text-black mx-auto mb-6" />
              <h1 className="font-serif text-3xl font-semibold text-primary mb-4">{cartDictionary.empty.title}</h1>
              <p className="text-neutral-mid mb-8">{cartDictionary.empty.description}</p>
              <Link href={'/'}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <ShoppingBag className="h-5 w-5 mx-2" />
                  {cartDictionary.empty.cta}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // --- Main Cart View ---
  return (
    <div className="bg-neutral-light min-h-screen p-6">
      <section className="max-w-7xl mx-auto">
        <div className="container-luxury py-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">{cartDictionary.title}</h1>
          <p className="text-neutral-mid">{cartDictionary.itemsCount.replace('{count}', cartItems.length.toString())}</p>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <div className="border-b border-neutral-mid/20 pb-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-serif text-xl font-semibold text-primary">{cartDictionary.itemsInCartTitle}</h2>
                    <Button
                      onClick={async () => await clearCart()}
                      className="p-2 text-destructive cursor-pointer bg-transparent hover:bg-red-50 rounded transition-colors"
                    >
                      {loading ? <Spinner /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-neutral-mid/20">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start gap-x-4 rtl:gap-x-reverse">
                        <div className="flex-shrink-0 w-24 h-24 bg-neutral-light rounded-lg overflow-hidden">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product?.name?.[locale] || ''}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-primary mb-1">{item.product?.name?.[locale]}</h3>
                          <div className="flex items-center mt-3">
                            <span className="text-lg font-bold text-primary">{item.product.price} {currency}</span>
                            {/* Original Price Logic Here */}
                          </div>
                        </div>

                        <div className="flex items-center gap-x-3 rtl:gap-x-reverse">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-neutral-light transition-colors cursor-pointer"
                            >
                              {loading ? <Spinner /> : <Minus className="h-4 w-4" />}
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-neutral-light transition-colors cursor-pointer"
                            >
                              {loading ? <Spinner /> : <Plus className="h-4 w-4" />}
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-destructive cursor-pointer hover:bg-red-50 rounded transition-colors"
                          >
                            {loading ? <Spinner /> : <Trash2 className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <h2 className="font-serif text-xl font-semibold text-primary mb-4">{cartDictionary.summary.title}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-mid">{cartDictionary.summary.subtotal}</span>
                    <span className="font-medium">{subtotal.toFixed(2)} {currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-mid">{cartDictionary.summary.shipping}</span>
                    <span className="font-medium">{shipping.toFixed(2)} {currency}</span>
                  </div>
                  <div className="border-t border-neutral-mid/20 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-primary">{cartDictionary.summary.total}</span>
                      <span className="text-lg font-bold text-primary">{total.toFixed(2)} {currency}</span>
                    </div>
                  </div>
                </div>

                <Link href={'/cart/checkout'}>
                  <Button icon={ShoppingBag} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                    {cartDictionary.summary.cta}
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}