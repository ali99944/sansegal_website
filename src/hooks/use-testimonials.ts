"use client"

import { useGetQuery } from "./queries-actions"
import type { Testimonial } from "../types/testimonial"

/**
 * Hook to fetch the list of visible testimonials for the public website.
 */
export function useTestimonials() {
  return useGetQuery<Testimonial[]>({
    key: ["testimonials"],
    url: "testimonials", // This calls GET /api/testimonials
  })
}