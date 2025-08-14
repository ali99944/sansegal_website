"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Model {
  id: string
  name: string
  image: string
  bagName: string
  isWide?: boolean // true for wide images, false for tall images
}

interface ModelsBentoGridProps {
  models: Model[]
  isLoading?: boolean
}

// Skeleton Loader Component
function BentoSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
      {Array.from({ length: 12 }).map((_, index) => {
        const isWide = Math.random() > 0.5
        const isTall = Math.random() > 0.7
        
        return (
          <div
            key={index}
            className={cn(
              "animate-pulse bg-neutral-mid/20 rounded-lg",
              isWide ? "col-span-2" : '',
              isTall ? "row-span-2" : ''
            )}
          >
            <div className="h-full w-full bg-gradient-to-br from-neutral-mid/10 to-neutral-mid/30 rounded-lg" />
          </div>
        )
      })}
    </div>
  )
}

// Model Card Component
function ModelCard({ model, className }: { model: Model; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-neutral-light cursor-pointer",
        "hover:scale-[1.02] transition-all duration-500",
        className
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src={model.image || "/placeholder.svg"}
          alt={`${model.name} carrying ${model.bagName}`}
          fill
          className={cn(
            "object-cover transition-all duration-700",
            "group-hover:scale-110",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-mid/20 to-neutral-mid/40 animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="font-serif text-lg font-semibold mb-1">{model.name}</h3>
          <p className="text-sm text-white/90">carrying {model.bagName}</p>
        </div>
      </div>
    </div>
  )
}

export function ModelsBentoGrid({ models, isLoading = false }: ModelsBentoGridProps) {
  const [displayModels, setDisplayModels] = useState<Model[]>([])

  useEffect(() => {
    if (!isLoading && models.length > 0) {
      // Simulate loading delay for better UX
      const timer = setTimeout(() => {
        setDisplayModels(models)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [models, isLoading])

  if (isLoading || displayModels.length === 0) {
    return (
      <section className="section-padding mx-auto max-w-7xl py-20">
        <div className="container-luxury">
          <BentoSkeleton />
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding  py-20 bg-neutral-light">
      <div className="container-luxury mx-auto max-w-7xl">


        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px] p-4">
          {displayModels.map((model, index) => {
            // Dynamic grid positioning based on image orientation and index
            const isWide = model.isWide || (index % 5 === 0)
            const isTall = !model.isWide && (index % 7 === 0)
            
            return (
              <ModelCard
                key={model.id}
                model={model}
                className={cn(
                  isWide ? "col-span-3" : '',
                  isTall ? "row-span-2" : '',
                  // Ensure proper responsive behavior
                  "col-span-1 md:col-span-1",
                  isWide ? "md:col-span-3" : '',
                  isTall ? "md:row-span-3" : ''
                )}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Example usage with sample data
export function ModelsBentoGridExample() {
  const [isLoading, setIsLoading] = useState(true)
  
  const sampleModels: Model[] = [
    {
      id: "1",
      name: "Sarah",
      image: "/placeholder.svg?height=400&width=300",
      bagName: "Classic Tote",
      isWide: false,
    },
    {
      id: "2",
      name: "Maya",
      image: "/placeholder.svg?height=300&width=500",
      bagName: "Executive Briefcase",
      isWide: true,
    },
    {
      id: "3",
      name: "Layla",
      image: "/placeholder.svg?height=500&width=300",
      bagName: "Evening Clutch",
      isWide: false,
    },
    {
      id: "4",
      name: "Nour",
      image: "/placeholder.svg?height=400&width=300",
      bagName: "Crossbody Messenger",
      isWide: false,
    },
    {
      id: "5",
      name: "Rana",
      image: "/placeholder.svg?height=300&width=500",
      bagName: "Travel Duffle",
      isWide: true,
    },
    {
      id: "6",
      name: "Dina",
      image: "/placeholder.svg?height=400&width=300",
      bagName: "Mini Backpack",
      isWide: false,
    },
  ]

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return <ModelsBentoGrid models={sampleModels} isLoading={isLoading} />
}
