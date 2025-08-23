"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Testimonial } from "@/src/types/testimonial"
import { Dictionary } from "@/src/types/dictionary"

interface TestimonialCardProps {
  testimonial: Testimonial
  dictionary: Dictionary['home']['testimonials']['card'] // Pass the specific dictionary part
}

function TestimonialCard({ testimonial, dictionary }: TestimonialCardProps) {
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
            {dictionary.purchased}{" "}
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

export default TestimonialCard