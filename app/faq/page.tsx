"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: "1",
    category: "Orders & Shipping",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 business days) and overnight shipping are also available. International shipping times vary by destination, typically 7-14 business days.",
  },
  {
    id: "2",
    category: "Orders & Shipping",
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free standard shipping on all orders over $200 within the United States. For orders under $200, standard shipping is $15.",
  },
  {
    id: "3",
    category: "Orders & Shipping",
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 2 hours of placement. After this time, orders enter our fulfillment process and cannot be changed. Please contact customer service immediately if you need to make changes.",
  },
  {
    id: "4",
    category: "Products",
    question: "What type of leather do you use?",
    answer:
      "We use premium full-grain leather sourced from the finest tanneries in Italy and France. Our leather is vegetable-tanned using traditional methods, ensuring durability and developing a beautiful patina over time.",
  },
  {
    id: "5",
    category: "Products",
    question: "How should I care for my leather bag?",
    answer:
      "Clean your bag regularly with a soft, dry cloth. For deeper cleaning, use a leather cleaner specifically designed for your bag's leather type. Apply leather conditioner every 3-6 months to keep the leather supple. Store in the provided dust bag when not in use.",
  },
  {
    id: "6",
    category: "Products",
    question: "Do you offer personalization services?",
    answer:
      "Yes, we offer monogramming and embossing services for most of our products. Personalization adds 3-5 business days to your order processing time and is non-refundable. Contact us for available options and pricing.",
  },
  {
    id: "7",
    category: "Returns & Exchanges",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return window for all items in original condition. Items must include all tags, dust bags, and packaging. Personalized items cannot be returned unless defective.",
  },
  {
    id: "8",
    category: "Returns & Exchanges",
    question: "How do I return an item?",
    answer:
      "Contact our customer service team to initiate a return. You'll receive a prepaid return label and RMA number. Package the item securely and ship using the provided label. Refunds are processed within 5-7 business days of receipt.",
  },
  {
    id: "9",
    category: "Returns & Exchanges",
    question: "Can I exchange for a different size or color?",
    answer:
      "Yes, exchanges are available within 30 days for different sizes or colors in the same product line. If your desired item is unavailable, we'll process a full refund instead.",
  },
  {
    id: "10",
    category: "Account & Payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Klarna for buy-now-pay-later options.",
  },
  {
    id: "11",
    category: "Account & Payment",
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers and is processed through secure payment gateways.",
  },
  {
    id: "12",
    category: "Account & Payment",
    question: "Do I need to create an account to place an order?",
    answer:
      "No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, view order history, and receive exclusive offers.",
  },
]

const categories = ["All", "Orders & Shipping", "Products", "Returns & Exchanges", "Account & Payment"]

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className=" rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-3 text-left bg-white hover:bg-white/80 cursor-pointer transition-colors duration-200 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-primary pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-neutral-mid flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-neutral-mid flex-shrink-0" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 py-4 bg-white/70 border-t border-neutral-mid/20">
          <p className="text-text-primary leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFAQs = selectedCategory === "All" ? faqs : faqs.filter((faq) => faq.category === selectedCategory)

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
      <section className="  ">
        <div className="container-luxury py-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-mid max-w-3xl">
            Find answers to common questions about our products, shipping, returns, and more. Can&apos;t find what you&apos;re
            looking for? Contact our customer service team.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section>
        <div className="container-luxury">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-neutral-mid/20 text-neutral-mid hover:bg-neutral-mid/40 cursor-pointer",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding py-12">
        <div className="container-luxury max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-mid text-lg">No FAQs found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      </div>
    </div>
  )
}
