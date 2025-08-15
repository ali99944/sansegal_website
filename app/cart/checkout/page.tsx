"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, ShoppingBag, Mail, ArrowLeft, Copy, Check } from "lucide-react"
import { CustomerInfo } from "@/src/types/checkout"
import { useCart } from "@/src/hooks/use-cart"
import { useCreateOrder } from "@/src/hooks/use-order"


export default function CheckoutPage() {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    address: "",
    secondaryAddress: "",
    city: "",
    specialMark: "",
  })
  
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  
  // List of Egyptian cities
  const egyptianCities = [
    "Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", 
    "Luxor", "Aswan", "Asyut", "Ismailia", "Faiyum", "Zagazig", "Damietta", 
    "Mansoura", "Tanta", "Sohag", "Hurghada", "Shibin El Kom", "Beni Suef", 
    "Qena", "Minya", "Damanhur", "El Mahalla El Kubra", "Kafr El Sheikh", 
    "Arish", "Mallawi", "Bilbais", "Marsa Matruh", "Idfu", "Mit Ghamr", 
    "Kafr El Dawwar", "Qalyub", "Desouk", "Abu Kabir", "Girga", "Akhmim", 
    "El Tor", "Abnub", "El Balyana", "Banha", "Dishna", "Qalyubia", "Siwa Oasis", 
    "New Cairo", "6th of October City", "10th of Ramadan City", "El Gouna", 
    "Sheikh Zuweid", "Sharm El Sheikh", "Dahab", "Nuweiba", "Saint Catherine"
  ]

  const [isCompleted, setIsCompleted] = useState(false)
  const [orderCode, setOrderCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedOrderCode, setCopiedOrderCode] = useState(false)

  const { items: cartItems } = useCart()  

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 15
  // const tax = subtotal * 0.08
  const tax = 0
  const total = subtotal + shipping + tax

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const createOrderAction = useCreateOrder()


  const handleCompleteOrder = async () => {
    // Validate required fields
    const requiredFields: (keyof CustomerInfo)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
    ]

    const missingFields = requiredFields.filter((field) => !customerInfo[field].trim())

    if (missingFields.length > 0) {
      alert("Please fill in all required fields")
      return
    }

    setIsLoading(true)

    await createOrderAction.mutateAsync({
      first_name: customerInfo.firstName,
      last_name: customerInfo.lastName,
      address: customerInfo.address,
      city: customerInfo.city,
      email: customerInfo.email,
      phone: customerInfo.phone,
      secondary_address: customerInfo.secondaryAddress,
      secondary_phone: customerInfo.secondaryPhone,
      special_mark: customerInfo.specialMark,
    }, {
      onError() {
        setIsLoading(false)
      },

      onSuccess(order) {
        setIsLoading(false)
        setOrderCode(order.order_code)
        setIsCompleted(true)
      },
    })


    
  }

  const copyOrderCode = async () => {
    try {
      await navigator.clipboard.writeText(orderCode)
      setCopiedOrderCode(true)
      setTimeout(() => setCopiedOrderCode(false), 2000)
    } catch (err) {
      console.error("Failed to copy order code:", err)
    }
  }

  if (isCompleted) {
    return (
      <div className="bg-neutral-light min-h-screen mx-auto flex justify-center py-12 px-4">
        <section className="section-padding">
          <div className="container-luxury max-w-2xl">
            <div className="bg-white rounded-lg p-8 md:p-12 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>

              {/* Success Message */}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Order Confirmed!</h1>
              <p className="text-neutral-mid text-lg mb-8">
                Thank you for your purchase. Your order has been successfully placed and is being processed.
              </p>

              {/* Order Code */}
              <div className="bg-neutral-light rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-primary mb-3">Your Order Code</h2>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-2xl font-mono font-bold text-primary bg-white px-4 rounded border">
                    {orderCode}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyOrderCode}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    {copiedOrderCode ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Email Confirmation */}
              <div className="bg-highlight/10 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-black">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">
                    Order confirmation and tracking details have been sent to your email
                  </span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="text-left bg-neutral-light rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-primary mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.product.name.en}</span>
                        <span className="text-neutral-mid ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-neutral-mid/20 pt-3">
                    <div className="flex justify-between font-bold text-primary">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/track-order")}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Track Your Order
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-neutral-mid/20 px-4">
        <div className="container-luxury py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Button>
            <div className="h-6 w-px bg-neutral-mid/20" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">Complete Your Order</h1>
          </div>
        </div>
      </section>

      <section className="section-padding flex justify-center py-12 px-4">
        <div className="container-luxury w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information Form */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-primary">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">First Name *</label>
                    <Input
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Last Name *</label>
                    <Input
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Secondary Phone Number</label>
                    <Input
                      type="tel"
                      value={customerInfo.secondaryPhone}
                      onChange={(e) => handleInputChange("secondaryPhone", e.target.value)}
                      placeholder="Enter secondary phone number (optional)"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-primary">Shipping Address</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Street Address *</label>
                    <Input
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your street address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Secondary Street Address</label>
                    <Input
                      value={customerInfo.secondaryAddress}
                      onChange={(e) => handleInputChange("secondaryAddress", e.target.value)}
                      placeholder="Enter additional address details (optional)"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-primary mb-2">City *</label>
                    <Input
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Select your city"
                      required
                      onFocus={() => setShowCityDropdown(true)}
                      onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                    />
                    {showCityDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-mid/20 rounded-md shadow-lg max-h-60 overflow-auto">
                        {egyptianCities
                          .filter(city => city.toLowerCase().includes(customerInfo.city.toLowerCase()))
                          .map((city, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 hover:bg-neutral-light cursor-pointer"
                              onMouseDown={() => {
                                handleInputChange("city", city);
                                setShowCityDropdown(false);
                              }}
                            >
                              {city}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Special Mark (Optional)</label>
                    <Input
                      value={customerInfo.specialMark}
                      onChange={(e) => handleInputChange("specialMark", e.target.value)}
                      placeholder="Add special instructions for delivery"
                    />
                    <p className="text-xs text-neutral-mid mt-1">Add any special marks or instructions to help the delivery person locate you</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="bg-white rounded-lg p-6">
                <h2 className="font-serif text-xl font-semibold text-primary mb-6">Your Order</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-neutral-light rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name.en}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-primary text-sm">{item.product.name.en}</h3>
                        {/* <div className="text-xs text-neutral-mid mt-1">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.size && <span className="ml-2">Size: {item.size}</span>}
                        </div> */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-neutral-mid">Qty: {item.quantity}</span>
                          <div className="text-right">
                            <span className="font-medium text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                            {/* {item.originalPrice && (
                              <div className="text-xs text-neutral-mid line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </div>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-neutral-mid/20 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-mid">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-mid">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-mid">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-mid/20 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-primary">Total</span>
                      <span className="font-bold text-primary text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Complete Order Button */}
                <Button
                  size="lg"
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleCompleteOrder}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Order...
                    </div>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Complete Order - ${total.toFixed(2)}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
