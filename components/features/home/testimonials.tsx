
"use client"

import { HorizontalCarousel } from "@/components/ui/horizontal_carousel"
import { Card } from "@/components/ui/card"
import { useTestimonials } from "@/src/hooks/use-testimonials"
import { TranslatedViewProps } from "@/src/types/i18n"
import TestimonialCard from "./testimonial_card"

// --- Loading Skeleton Component (No changes needed) ---
function TestimonialSkeleton() {
  return (
    <Card className="!min-w-[350px] !max-w-[350px] animate-pulse">
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="mt-8 space-y-2">
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
    </Card>
  )
}


export function Testimonials({ dictionary }: TranslatedViewProps) {
  const { data: testimonials = [], isLoading } = useTestimonials()

  // Don't render the section if there are no testimonials and it's not loading
  if (!isLoading && testimonials.length === 0) {
    return null
  }
  
  const testimonialsDictionary = dictionary.home.testimonials

  return (
    <section className="section-padding max-w-7xl mx-auto">
      <div className="container-luxury">
        <HorizontalCarousel title={testimonialsDictionary.title} scrollStep={370} className="max-w-none">
          {isLoading ? (
            // Show skeleton loaders while fetching data
            Array.from({ length: 4 }).map((_, i) => <TestimonialSkeleton key={i} />)
          ) : (
            // Render the actual testimonials once loaded
            testimonials.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                dictionary={testimonialsDictionary.card} 
              />
            ))
          )}
        </HorizontalCarousel>
      </div>
    </section>
  )
}