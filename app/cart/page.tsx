"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, Gift } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/src/hooks/use-cart"


export default function CartPage() {
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const { items: cartItems, removeItem, clearCart, updateQuantity } = useCart()  

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "welcome15") {
      setAppliedPromo({ code: promoCode, discount: 0.15 })
    } else if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: promoCode, discount: 0.1 })
    } else {
      alert("Invalid promo code")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const shipping = subtotal > 200 ? 0 : 15
  // const tax = (subtotal - promoDiscount) * 0.08
  const tax = 0
  const total = subtotal - promoDiscount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="bg-neutral-light min-h-screen flex justify-center pt-20">
        <section className="section-padding">
          <div className="container-luxury max-w-2xl text-center">
            <div className="bg-white rounded-lg  p-12">
              <ShoppingBag className="h-16 w-16 text-neutral-mid mx-auto mb-6" />
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
              <div className="bg-white rounded-lg  overflow-hidden">
                <div className="p-4 border-b border-neutral-mid/20">
                  <div className="flex justify-between items-center">
                    <h2 className="font-serif text-xl font-semibold text-primary">Items in Your Cart</h2>
                    <button
                      onClick={async () => await clearCart()}
                      className="p-2 text-destructive cursor-pointer hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-neutral-light transition-colors cursor-pointer"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-destructive cursor-pointer hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg  p-6 sticky top-6">
                <h2 className="font-serif text-xl font-semibold text-primary mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyPromoCode} variant="outline" size={'sm'}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 flex items-center text-green-600 text-sm">
                      <Gift className="h-4 w-4 mr-1" />
                      {appliedPromo.code} applied ({(appliedPromo.discount * 100).toFixed(0)}% off)
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-mid">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>


                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-neutral-mid">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-mid">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-neutral-mid/20 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-primary">Total</span>
                      <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="mb-6 p-3 bg-highlight/10 border border-highlight/30 rounded text-sm">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                {/* Checkout Button */}
                <Link href={'/cart/checkout'}>
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                    Complete your order
                  </Button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
