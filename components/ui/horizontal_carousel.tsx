"use client"

import type React from "react"
import { useRef, useCallback, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, } from "lucide-react"
import {Button} from "./button"



interface HorizontalCarouselProps {
  title: string
  children: React.ReactNode // Now accepts any JSX elements
  onSeeMoreClick?: () => void
  scrollStep?: number // Pixels to scroll per click
  className?: string
}

export function HorizontalCarousel({
  title,
  children,
  onSeeMoreClick,
  scrollStep = 200,
  className,
}: HorizontalCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth)
    }
  }, [])

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollability)
      window.addEventListener("resize", checkScrollability)
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability)
      }
      window.removeEventListener("resize", checkScrollability)
    }
  }, [checkScrollability])

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollContainerRef.current
      if (container) {
        container.scrollBy({
          left: direction === "left" ? -scrollStep : scrollStep,
          behavior: "smooth",
        })
      }
    },
    [scrollStep],
  )

  return (
    <div className={cn("w-full max-w-7xl mx-auto py-8", className)}>
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center space-x-2">
          <button
            className="rounded cursor-pointer  text-white bg-primary hover:bg-primary/80 p-1"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className=" cursor-pointer text-white bg-primary hover:bg-primary/80 px-1 py-1"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {onSeeMoreClick && (
            <Button
              variant="dark"
              onClick={onSeeMoreClick}
            >
              See more
            </Button>
          )}
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex overflow-x-auto py-2 px-4 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex space-x-4 pb-2">
          {children} {/* Render children directly */}
        </div>
      </div>
    </div>
  )
}
