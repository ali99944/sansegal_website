"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFaqCategories, useFaqs } from "@/src/hooks/use-faqs"
import { FAQ } from "@/src/types/faq"
import { TranslatedViewProps } from "@/src/types/i18n"

// --- FAQItem Component (No changes needed, it's already dynamic) ---
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

// --- Main FAQPage Component (Refactored for i18n) ---
export default function FAQPage({ dictionary }: TranslatedViewProps) {
  const { data: categories = [], isFetching: is_categories_loading } = useFaqCategories()
  const { data: faqs = [], isFetching: is_faqs_loading } = useFaqs()
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>()

  const faqDictionary = dictionary.faq

  useEffect(() => {
    // Set the first category as active by default once they load
    if (categories.length > 0 && selectedCategory === undefined) {
      setSelectedCategory(categories[0].id)
    }
  }, [categories, selectedCategory])

  const filteredFAQs = faqs.filter((faq) => faq.faq_category_id === selectedCategory)

  return (
    <div className="bg-neutral-light min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <section>
          <div className="container-luxury py-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
              {faqDictionary.title}
            </h1>
            <p className="text-lg text-neutral-mid max-w-3xl">
              {faqDictionary.subtitle}
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section>
          <div className="container-luxury">
            <div className="flex flex-wrap gap-2">
              {is_categories_loading ? (
                // Skeleton loaders for categories
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="px-4 py-2 rounded-full bg-neutral-mid/10 animate-pulse h-9 w-24" />
                ))
              ) : (
                // Actual categories from API
                categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                      selectedCategory === category.id
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
                {Array.from({ length: 4 }).map((_, i) => (
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
                    <p className="text-neutral-mid text-lg">
                      {faqDictionary.noFaqsFound}
                    </p>
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