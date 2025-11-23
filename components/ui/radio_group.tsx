"use client"

import type React from "react"
import { useState, useId, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface RadioOption {
  value: string
  label: React.ReactNode // Can be string or custom JSX
  disabled?: boolean
}

interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  label?: string
  disabled?: boolean
  className?: string
  direction?: "vertical" | "horizontal"
}

export function RadioGroup({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  disabled = false,
  className,
  direction = "vertical",
  ...props
}: RadioGroupProps & React.HTMLAttributes<HTMLDivElement>) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue || "")
  const groupId = useId()

  const currentValue = isControlled ? value : internalValue

  const handleChange = useCallback(
    (optionValue: string) => {
      if (disabled) return

      if (!isControlled) {
        setInternalValue(optionValue)
      }
      onValueChange?.(optionValue)
    },
    [disabled, isControlled, onValueChange],
  )

  return (
    <div className={cn("space-y-2", className)} role="radiogroup" aria-labelledby={`${groupId}-label`} {...props}>
      {label && (
        <div id={`${groupId}-label`} className="text-base font-normal text-gray-900 mb-2">
          {label}
        </div>
      )}
      <div className={cn("flex", direction === "vertical" ? "flex-col space-y-3" : "flex-row space-x-6")}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`
          const isDisabled = disabled || option.disabled
          const isChecked = currentValue === option.value

          return (
            <div key={option.value} className={cn("flex items-center", isDisabled ? "opacity-60 cursor-not-allowed" : '')}>
              <input
                type="radio"
                id={optionId}
                name={groupId} // All radios in a group must have the same name
                value={option.value}
                checked={isChecked}
                onChange={() => handleChange(option.value)}
                disabled={isDisabled}
                className="sr-only" // Hide native radio visually
              />
              <label
                htmlFor={optionId}
                className={cn(
                  "flex items-center cursor-pointer select-none",
                  !isDisabled ? "hover:text-gray-900" : '',
                  isDisabled ? "cursor-not-allowed" : '',
                )}
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border",
                    "transition-all duration-150 ease-out",
                    isChecked ? "border-primary bg-primary" : "border-gray-400 bg-white",
                    isDisabled ? (isChecked ? "border-blue-300 bg-blue-300" : "border-gray-300 bg-gray-100") : '',
                  )}
                >
                  {isChecked && (
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full bg-white",
                        isDisabled ? "bg-gray-400" : '', // Darker dot for disabled checked
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm",
                    isChecked ? "text-gray-900" : "text-gray-700",
                    isDisabled ? "text-gray-500" : '',
                  )}
                >
                  {option.label}
                </span>
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
