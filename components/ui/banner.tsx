"use client"

import React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import {Button} from "./button"

export type BannerVariant = "default" | "success" | "destructive" | "warning" | "info"

interface BannerProps {
  variant?: BannerVariant
  title?: React.ReactNode // Optional title for the banner
  message: React.ReactNode // Main message content
  icon?: React.ReactNode // Optional custom icon
  actions?: React.ReactNode // Optional action buttons/links
  onClose?: () => void // Makes the banner dismissible
  className?: string
  position?: "top" | "bottom" // Position of the banner
}

const bannerVariants: Record<BannerVariant, string> = {
  default: "bg-gray-800 text-white",
  success: "bg-success text-black",
  destructive: "bg-destructive text-white",
  warning: "bg-warning text-black",
  info: "bg-primary text-white",
}


export function Banner({
  variant = "default",
  title,
  message,
  actions,
  onClose,
  className,
  position = "top",
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null


  return (
    <div
      role="banner"
      className={cn(
        "left-0 w-full z-50 py-3 px-4 flex items-center justify-between gap-4 shadow-md",
        position === "top" ? "top-0" : "bottom-0",
        bannerVariants[variant],
        className,
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* {typeof IconComponent === "function" ? <IconComponent className="w-5 h-5 flex-shrink-0" /> : IconComponent} */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
          {title && <h3 className="text-sm font-semibold flex-shrink-0">{title}</h3>}
          <p className={cn("text-sm", title ? "sm:border-l sm:border-white/30 sm:pl-2 sm:ml-2 truncate" : '')}>{message}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {actions}
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white/80 hover:text-white hover:bg-white/20"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
