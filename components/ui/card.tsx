"use client"

import { cn } from "@/lib/utils"
import type React from "react"

// Simple card variant types
export type CardVariant = "default" | "outlined" | "filled" | "interactive" | "elevated" | "disabled"

interface CardProps {
  variant?: CardVariant
  className?: string
  children: React.ReactNode
  onClick?: () => void
  darkMode?: boolean
  // Custom colors for filled variant
  fillColor?: string
  textColor?: string
}

// Card variant styles
const cardVariants: Record<CardVariant, string> = {
  default: "bg-white border border-gray-200",
  outlined: "bg-white border-2 border-gray-400/60 shadow-none",
  filled: "bg-gray-50 border border-gray-200 shadow-none",
  interactive: "bg-white border border-gray-200 hover:border-black/20 cursor-pointer transition-all duration-200",
  elevated: "bg-white shadow-sm",
  disabled: "bg-gray-200 border border-gray-400 opacity-60 cursor-not-allowed",
}

// Dark mode variants
const darkCardVariants: Record<CardVariant, string> = {
  default: "bg-gray-800 border border-gray-700 text-white",
  outlined: "bg-gray-800 border-2 border-gray-600 shadow-none text-white",
  filled: "bg-gray-900 border border-gray-700 shadow-none text-white",
  interactive:
    "bg-gray-800 border border-gray-700 hover:border-gray-500 cursor-pointer transition-all duration-200 text-white",
  elevated: "bg-gray-800  text-white",
  disabled: "bg-gray-900 border border-gray-800 opacity-60 cursor-not-allowed text-gray-400",
}

export function Card({
  variant = "elevated",
  className,
  children,
  onClick,
  darkMode = false,
  fillColor,
  textColor,
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  // Use dark mode variants if darkMode is true
  const variantStyles = darkMode ? darkCardVariants[variant] : cardVariants[variant]

  // Custom styles for filled variant with custom colors
  const customStyles =
    variant === "filled" && (fillColor || textColor)
      ? {
          backgroundColor: fillColor,
          color: textColor,
        }
      : {}

  // Disable onClick for disabled variant
  const handleClick = variant === "disabled" ? undefined : onClick

  return (
    <div className={cn("rounded-lg p-6", variantStyles, className)} onClick={handleClick} style={customStyles} {...props}>
      {children}
    </div>
  )
}
