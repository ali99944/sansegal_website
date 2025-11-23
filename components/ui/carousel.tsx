"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import {Button} from "./button"
// import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  showNavigation?: boolean
  showPlayPause?: boolean
  className?: string
  slideClassName?: string
}

export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showIndicators = true,
  showNavigation = true,
  showPlayPause = true,
  className,
  slideClassName,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const totalSlides = children.length

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    resetTimeout()
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1))
      }, interval)
    }
    return () => resetTimeout()
  }, [currentIndex, isPlaying, totalSlides, interval, resetTimeout])

  const goToNext = useCallback(() => {
    resetTimeout()
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1))
  }, [totalSlides, resetTimeout])

  const goToPrevious = useCallback(() => {
    resetTimeout()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1))
  }, [totalSlides, resetTimeout])

  const goToSlide = useCallback(
    (index: number) => {
      resetTimeout()
      setCurrentIndex(index)
    },
    [resetTimeout],
  )

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  return (
    <div className={cn("relative w-full overflow-hidden group", className)}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className={cn("w-full flex-shrink-0", slideClassName)}>
            {child}
          </div>
        ))}
      </div>

      {showNavigation && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {(showIndicators || showPlayPause) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 shadow-md">
          {showPlayPause && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 text-gray-700 hover:bg-gray-200"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          )}
          {showIndicators && (
            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    currentIndex === index ? "bg-gray-800 w-4" : "bg-gray-400",
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index ? "true" : "false"}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
