"use client"

import type React from "react"
import { useState, useId } from "react"
import { cn } from "@/lib/utils"

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  label?: string
}

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  className,
  label,
  ...props
}: SwitchProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false)
  const switchId = useId()

  const currentChecked = isControlled ? checked : internalChecked

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    const newChecked = event.target.checked
    if (!isControlled) {
      setInternalChecked(newChecked)
    }
    onCheckedChange?.(newChecked)
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <input
        type="checkbox"
        id={switchId}
        role="switch"
        checked={currentChecked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <label
        htmlFor={switchId}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          currentChecked ? "bg-primary" : "bg-gray-200",
          disabled ? "cursor-not-allowed opacity-60" : '',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out",
            currentChecked ? "translate-x-4 bg-white" : "translate-x-0 bg-gray-600",
          )}
        />
      </label>
      {label && (
        <label htmlFor={switchId} className={cn("text-sm text-gray-900", disabled ? "text-gray-500" : '')}>
          {label}
        </label>
      )}
    </div>
  )
}

