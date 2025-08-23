"use client"

import Link from "next/link"
import { HorizontalCarousel } from "@/components/ui/horizontal_carousel"
import { Card } from "@/components/ui/card"
import { Testimonial } from "@/src/types/testimonial"
import { useTestimonials } from "@/src/hooks/use-testimonials"

// --- Testimonial Card Component with Conditional Linking ---
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // Determine if the product link should be active
  const canLinkToProduct = testimonial.product.isActive && testimonial.product.id

  return (
    <Card className="!min-w-[350px] !max-w-[350px]">
      {/* Review Text */}
      <blockquote className="text-neutral-mid leading-relaxed mb-6 text-sm">
        &quot;{testimonial.review}&quot;
      </blockquote>

      {/* Customer Info */}
      <div className="mt-4">
        <h4 className="font-serif font-semibold text-primary text-sm">{testimonial.name}</h4>
        {testimonial.location && (
          <p className="text-neutral-mid text-xs mb-1">{testimonial.location}</p>
        )}
        
        {/* Product Name: Render as a Link or as plain text */}
        {testimonial.product.name && (
          <p className="text-accent text-xs font-medium">
            Purchased:{" "}
            {canLinkToProduct ? (
              <Link
                href={`/products/${testimonial.product.id}`}
                className="hover:underline underline transition-colors"
              >
                {testimonial.product.name}
              </Link>
            ) : (
              <span>{testimonial.product.name}</span>
            )}
          </p>
        )}
      </div>
    </Card>
  )
}

// --- Loading Skeleton Component ---
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


export function Testimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials()
  console.log(testimonials);
  

  // Don't render the section if there are no testimonials and it's not loading
  if (!isLoading && testimonials.length === 0) {
    return null
  }

  return (
    <section className="section-padding max-w-7xl mx-auto">
      <div className="container-luxury">
        <HorizontalCarousel title="What Our Customers Say" scrollStep={370} className="max-w-none">
          {isLoading ? (
            // Show skeleton loaders while fetching data
            Array.from({ length: 4 }).map((_, i) => <TestimonialSkeleton key={i} />)
          ) : (
            // Render the actual testimonials once loaded
            testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))
          )}
        </HorizontalCarousel>
      </div>
    </section>
  )
}