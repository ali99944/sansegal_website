"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/src/hooks/use-cart"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useSettings } from "@/src/hooks/use-settings"


export default function CartPage() {
  const { items: cartItems, removeItem, clearCart, updateQuantity, loading } = useCart()  

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const { data: settings } = useSettings()

  const shipping = settings?.store.delivery_fee ?? 0
  // const tax = (subtotal - promoDiscount) * 0.08
  const tax = 0
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="bg-neutral-light min-h-screen flex justify-center pt-20">
        <section className="section-padding">
          <div className="container-luxury max-w-2xl text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-12">
              <ShoppingBag className="h-16 w-16 text-black mx-auto mb-6" />
              <h1 className="font-serif text-3xl font-semibold text-primary mb-4">Your Cart is Empty</h1>
              <p className="text-neutral-mid mb-8">
                Looks like you haven&apos;t added any items to your cart yet. Discover our beautiful collection of
                handcrafted leather goods.
              </p>
              <Link href={'/'}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-neutral-light min-h-screen p-6">
      {/* Header */}
      <section className="max-w-7xl mx-auto">
        <div className="container-luxury py-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">Shopping Cart</h1>
          <p className="text-neutral-mid">{cartItems.length} item(s) in your cart</p>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <div className="border-b border-neutral-mid/20  pb-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-serif text-xl font-semibold text-primary">Items in Your Cart</h2>
                    <Button
                      onClick={async () => await clearCart()}
                      className="p-2 text-destructive cursor-pointer bg-transparent hover:bg-red-50 rounded transition-colors"
                    >
                      {
                        loading ? (
                          <Spinner />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )
                      }
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-neutral-mid/20">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-neutral-light rounded-lg overflow-hidden">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product?.name?.en}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-primary mb-1">{item.product?.name?.en}</h3>
                          {/* <div className="text-sm text-neutral-mid space-y-1">
                            {item.color && <p>Color: {item.color}</p>}
                            {item.size && <p>Size: {item.size}</p>}
                          </div> */}

                          <div className="flex items-center mt-3">
                            <span className="text-lg font-bold text-primary">${item.product.price}</span>
                            {item.product.price && (
                              <span className="text-sm text-neutral-mid line-through ml-2">${item.product.price}</span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-neutral-light transition-colors cursor-pointer"
                            >
                              {
                                loading ? (
                                  <Spinner />
                                ) : (
                                  <Minus className="h-4 w-4" />
                                )
                              }
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-neutral-light transition-colors cursor-pointer"
                            >
                              {
                                loading ? (
                                  <Spinner />
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )
                              }
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-destructive cursor-pointer hover:bg-red-50 rounded transition-colors"
                          >
                            {
                              loading ? (
                                <Spinner />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )
                            }
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
                <h2 className="font-serif text-xl font-semibold text-primary mb-4">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-mid">Subtotal</span>
                    <span className="font-medium">{subtotal.toFixed(2)} EGP</span>
                  </div>



                  <div className="flex justify-between">
                    <span className="text-neutral-mid">Shipping</span>
                    <span className="font-medium">{`${shipping.toFixed(2)} EGP`}</span>
                  </div>


                  <div className="border-t border-neutral-mid/20 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-primary">Total</span>
                      <span className="text-lg font-bold text-primary">{total.toFixed(2)} EGP</span>
                    </div>
                  </div>
                </div>


                {/* Checkout Button */}
                <Link href={'/cart/checkout'}>
                  <Button icon={ShoppingBag} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                    Complete your order
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
