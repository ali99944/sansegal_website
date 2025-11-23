"use client"

import { useState, useEffect } from 'react'

const promotions = [
  {
    text: "Free shipping on orders over $200 - Limited time offer",
    bgColor: "bg-blue-600",
    textColor: "text-white"
  },
  {
    text: "New Collection: Handcrafted Italian Leather - Shop Now",
    bgColor: "bg-amber-600",
    textColor: "text-white"
  },
  {
    text: "Exclusive: 15% off your first order with code WELCOME15",
    bgColor: "bg-emerald-600",
    textColor: "text-white"
  },
  {
    text: "Artisan Spotlight: Meet our master craftsmen behind each piece",
    bgColor: "bg-purple-600",
    textColor: "text-white"
  }
]

export function PromotionalBanner() {
  const [currentPromo, setCurrentPromo] = useState(0)

  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {


    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentPromo((prev) => (prev + 1) % promotions.length)
        setIsAnimating(false)
      }, 250)
    }, 3000)

    return () => clearInterval(interval)
  }, [])



  return (
    <div className={`${promotions[currentPromo].bgColor} ${promotions[currentPromo].textColor} py-2 px-4 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className={`text-sm font-medium text-center transition-all duration-250 ${
          isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
        }`}>
          {promotions[currentPromo].text}
        </div>
      </div>
    </div>
  )
}
