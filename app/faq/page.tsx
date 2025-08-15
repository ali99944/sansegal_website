"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFaqCategories, useFaqs } from "@/src/hooks/use-faqs"
import { FAQ } from "@/src/types/faq"

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className=" rounded-lg overflow-hidden shadow-sm">
      <button
        className="w-full px-4 py-3 text-left bg-white hover:bg-white/80 cursor-pointer transition-colors duration-200 flex items-center justify-between"
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
  const { data: categories = [], isFetching: is_categories_loading } = useFaqCategories()
  const { data: faqs = [], isFetching: is_faqs_loading } = useFaqs()

  
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>()

  useEffect(() => {
    setSelectedCategory(categories?.at(0)?.id)
  }, [categories])
  

  const filteredFAQs = faqs.filter((faq) => faq.faq_category_id == selectedCategory)

  return (
    <div className="bg-neutral-light min-h-screen p-4">
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
            {is_categories_loading ? (
              // Skeleton loaders for categories
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="px-4 py-2 rounded-full bg-neutral-mid/10 animate-pulse h-9 w-24"
                  />
                ))}
              </>
            ) : (
              // Actual categories
              categories.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                    selectedCategory == category.id
                      ? "bg-primary text-white"
                      : "bg-neutral-mid/20 text-neutral-mid hover:bg-neutral-mid/40 cursor-pointer",
                  )}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding py-12">
        <div className="container-luxury max-w-4xl mx-auto">
          {is_faqs_loading ? (
            // Skeleton loaders for FAQs
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-sm">
                  <div className="w-full px-4 py-3 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-neutral-mid/10 animate-pulse rounded w-3/4" />
                      <div className="h-5 w-5 bg-neutral-mid/10 animate-pulse rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} />
                ))}
              </div>

              {filteredFAQs.length === 0 && !is_categories_loading && (
                <div className="text-center py-12">
                  <p className="text-neutral-mid text-lg">No FAQs found for the selected category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      </div>
    </div>
  )
}
