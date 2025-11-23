"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, Truck, CheckCircle, Clock, Mail, Phone } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleItem } from "@/components/ui/collabsible"
import { Card } from "@/components/ui/card"

interface OrderStatus {
  id: string
  status: "processing" | "shipped" | "in-transit" | "delivered"
  orderNumber: string
  orderDate: string
  estimatedDelivery: string
  items: Array<{
    name: string
    image: string
    quantity: number
    price: number
  }>
  tracking: Array<{
    status: string
    date: string
    location: string
    description: string
  }>
}

const mockOrder: OrderStatus = {
  id: "ORD-2024-001234",
  status: "in-transit",
  orderNumber: "ORD-2024-001234",
  orderDate: "January 15, 2024",
  estimatedDelivery: "January 22, 2024",
  items: [
    {
      name: "Classic Tote Bag",
      image: "/assets/images/products/p1.png",
      quantity: 1,
      price: 299,
    },
    {
      name: "Leather Wallet",
      image: "/assets/images/products/p11.png",
      quantity: 1,
      price: 149,
    },
  ],
  tracking: [
    {
      status: "Order Placed",
      date: "Jan 15, 2024 - 2:30 PM",
      location: "Online",
      description: "Your order has been confirmed and is being prepared",
    },
    {
      status: "Processing",
      date: "Jan 16, 2024 - 10:15 AM",
      location: "Sansegal Workshop",
      description: "Items are being carefully prepared and quality checked",
    },
    {
      status: "Shipped",
      date: "Jan 18, 2024 - 4:45 PM",
      location: "New York, NY",
      description: "Package has been shipped via Express Delivery",
    },
    {
      status: "In Transit",
      date: "Jan 20, 2024 - 8:20 AM",
      location: "Chicago, IL",
      description: "Package is on its way to your delivery address",
    },
  ],
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [orderData, setOrderData] = useState<OrderStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrackOrder = async () => {
    if (!orderNumber || !email) {
      setError("Please enter both order number and email address")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toLowerCase().includes("ord-2024-001234")) {
        setOrderData(mockOrder)
      } else {
        setError("Order not found. Please check your order number and email address.")
      }
      setIsLoading(false)
    }, 1500)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-600" />
      case "in transit":
        return <Clock className="h-5 w-5 text-orange-600" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Track Your Order</h1>
          <p className="text-lg text-neutral-mid max-w-3xl">
            Enter your order details below to track the status and location of your Sansegal purchase.
          </p>
        </div>
      </section>

      {/* Track Order Form */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="container-luxury max-w-2xl">
          <Card>
            <h2 className="font-serif text-2xl font-semibold text-primary mb-6">Order Information</h2>

            <div className="space-y-6">
              <Input
                label="Order Number"
                placeholder="e.g., ORD-2024-001234"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter the email used for your order"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</div>}

              <Button
                onClick={handleTrackOrder}
                loading={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Track Order
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Order Results */}
      {orderData && (
        <section className="pb-16 max-w-7xl mx-auto">
          <div className="container-luxury max-w-4xl">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-primary mb-2">
                    Order #{orderData.orderNumber}
                  </h2>
                  <p className="text-neutral-mid">Placed on {orderData.orderDate}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      orderData.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : orderData.status === "in-transit"
                          ? "bg-blue-100 text-blue-800"
                          : orderData.status === "shipped"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1).replace("-", " ")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-3">Estimated Delivery</h3>
                  <p className="text-neutral-mid">{orderData.estimatedDelivery}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-3">Items Ordered</h3>
                  <div className="space-y-2">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-neutral-light rounded overflow-hidden">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary">{item.name}</p>
                          <p className="text-xs text-neutral-mid">
                            Qty: {item.quantity} × ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="font-serif text-2xl font-semibold text-primary mb-8">Tracking History</h2>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-mid/30" />

                <div className="space-y-8">
                  {orderData.tracking.map((event, index) => (
                    <div key={index} className="relative flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-neutral-mid/30 rounded-full">
                        {getStatusIcon(event.status)}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1 min-w-0 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="font-semibold text-primary">{event.status}</h3>
                          <span className="text-sm text-neutral-mid mt-1 sm:mt-0">{event.date}</span>
                        </div>
                        <p className="text-sm text-neutral-mid mt-1">{event.location}</p>
                        <p className="text-neutral-mid mt-2">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

<section className="section-padding mx-auto mt-12 max-w-7xl ">
        <div className="container-luxury max-w-4xl">
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Need Help?</h2>
            <p className="text-lg text-neutral-mid">
              Our customer service team is here to assist you with any questions about your order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Phone Support */}
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <p className="font-semibold text-primary">+20 2 1234 5678</p>
              <p className="text-sm text-neutral-mid">Daily 9:00 AM - 8:00 PM</p>
            </div>

            {/* Email Support */}
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-secondary" />
              </div>
              <p className="font-semibold text-primary">support@sansegal.com</p>
              <p className="text-sm text-neutral-mid">Response within 24 hours</p>
            </div>

          </div>
        </div>
      </section>

      <section className="section-padding mx-auto mt-12 max-w-7xl ">
      <div className="bg-white rounded-lg p-8">
            <h3 className="font-serif text-xl font-semibold text-primary mb-6">Common Questions</h3>
            <Collapsible defaultValue="item-1">
            <CollapsibleItem value="item-1" title="How can I track my order?">
              <CollapsibleContent
                content={
                  <>
                    <p className="mb-2">
                      You can easily track your order by entering your order number and the email address used during purchase in our tracking system above. Your order number can be found in your order confirmation email.
                    </p>
                    <p>
                      Once entered, you&apos;ll be able to see detailed information about your order status, including shipping updates and estimated delivery date.
                    </p>
                  </>
                }
              />
            </CollapsibleItem>
            <CollapsibleItem value="item-2" title="What do the different order statuses mean?">
              <CollapsibleContent
                content={
                  <p>
                    Order statuses include: &quot;Processing&quot; (order confirmed and being prepared), &quot;Shipped&quot; (package has left our warehouse), &quot;In Transit&quot; (package is on its way to delivery address), and &quot;Delivered&quot; (package has been successfully delivered to the destination).
                  </p>
                }
              />
            </CollapsibleItem>
            <CollapsibleItem value="item-3" title="How long does shipping take?">
              <CollapsibleContent
                content={
                  <p>
                    Shipping times vary depending on your location and chosen delivery method. Typically, domestic orders are delivered within 3-7 business days, while international shipping may take 7-14 business days. You can find the estimated delivery date for your specific order in the tracking details.
                  </p>
                }
              />
            </CollapsibleItem>
            <CollapsibleItem value="item-4" title="What should I do if my order is delayed?">
              <CollapsibleContent
                content={
                  <p>
                    If your order appears delayed beyond the estimated delivery date, please contact our customer service team through email at support@sansegal.com or call us at +20 2 1234 5678. We&apos;ll investigate the status and provide you with updated information about your delivery.
                  </p>
                }
              />
            </CollapsibleItem>
          </Collapsible>
          </div>
      </section>
    </div>
  )
}
