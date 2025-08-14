"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center rounded text-sm  transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
        secondary: "bg-secondary text-text-primary hover:bg-secondary/90 active:bg-secondary/80 focus-visible:ring-[#003a78]",
        accent: "bg-accent text-black hover:bg-accent/90 active:bg-accent/80",
        outline:
          "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:bg-primary/80 focus-visible:ring-[#003a78]",
        ghost: "text-[#003a78] bg-transparent hover:bg-[#f1f0ec] active:bg-[#f1f0ec] focus-visible:ring-[#003a78]",
        link: "text-[#003a78] underline-offset-2 hover:underline active:underline focus-visible:ring-[#003a78]",
        destructive: "bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/80",
        neutral: "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-300 focus-visible:ring-gray-400",
        light: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-200 focus-visible:ring-gray-400",
        dark: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-700 focus-visible:ring-gray-700",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon: Icon, iconPosition = "left", loading, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={isDisabled} {...props}>
        {loading && (
          <div className={cn("h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent", children ? "mr-2" : '')} />
        )}
        {Icon && iconPosition === "left" && !loading && <Icon className={cn("h-4 w-4", children ? "mr-2" : '')} />}
        {children}
        {Icon && iconPosition === "right" && !loading && <Icon className={cn("h-4 w-4", children ? "ml-2" : '')} />}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

