"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dictionary } from "@/src/types/dictionary"

// Define the specific props for this component
interface HeroSectionProps {
  dictionary: Dictionary['home']['hero']
  videoSrc?: string
  ctaHref?: string
  onCtaClick?: () => void
  showScrollIndicator?: boolean
}

export function HeroSection({
  dictionary,
  videoSrc = "/placeholder.mp4",
  ctaHref = "/shop",
  onCtaClick,
  showScrollIndicator = true,
}: HeroSectionProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else if (ctaHref) {
      window.location.href = ctaHref
    }
  }

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          onLoadedMetadata={() => setIsVideoLoaded(true)}
          poster="/placeholder.svg?height=1080&width=1920"
        >
          <source src={videoSrc} type="video/mp4" />
          <div className="h-full w-full bg-cover bg-center bg-[url('/placeholder.svg?height=1080&width=1920')]" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container-luxury text-center">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Main Title from Dictionary */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              {dictionary.title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={`inline-block transform transition-all duration-700 ease-out ${
                    showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h1>

            {/* Subtitle from Dictionary */}
            <p
              className={`text-lg sm:text-xl md:text-2xl text-neutral-light/90 mb-12 max-w-3xl mx-auto leading-relaxed transform transition-all duration-700 ease-out ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {dictionary.subtitle}
            </p>

            {/* CTA Button from Dictionary */}
            <div
              className={`transform transition-all duration-700 ease-out ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Button
                size="md"
                onClick={handleCtaClick}
                className="bg-[#9e2a2b] hover:bg-red-700 text-white font-semibold px-12 py-2 text-lg rounded-full shadow-2xl hover:shadow-red-600/25 transition-all duration-300  active:scale-95"
              >
                {dictionary.ctaText}
              </Button>
            </div>

            {/* Brand Accent Line */}
            <div
              className={`mt-16 flex items-center justify-center space-x-4 transform transition-all duration-700 ease-out ${
                showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="h-px w-16 bg-highlight/60" />
              <span className="font-serif text-highlight text-sm tracking-widest uppercase">Sansegal</span>
              <div className="h-px w-16 bg-highlight/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator from Dictionary */}
      {showScrollIndicator && (
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 ease-out ${
            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group"
            aria-label="Scroll to next section"
          >
            <span className="text-xs uppercase tracking-widest mb-2 font-medium">{dictionary.scrollText}</span>
            <ChevronDown className="h-6 w-6 animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-20 bg-primary flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-highlight border-r-transparent mb-4" />
          </div>
        </div>
      )}
    </section>
  )
}