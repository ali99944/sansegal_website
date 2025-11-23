"use client"

import type React from "react"
import { useState, useId, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Check, Minus } from "lucide-react"

interface CheckboxProps {
  checked?: boolean | "indeterminate"
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | "indeterminate") => void
  disabled?: boolean
  className?: string
  label?: React.ReactNode // Can be string or custom JSX
  id?: string
}

export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  className,
  label,
  id,
  ...props
}: CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked || false)
  const checkboxId = useId()
  const uniqueId = id || checkboxId
  const inputRef = useRef<HTMLInputElement>(null)

  const currentChecked = isControlled ? checked : internalChecked

  // Sync indeterminate state with the native input element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = `${currentChecked}` == "indeterminate"
    }
  }, [currentChecked])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    const newChecked = event.target.checked
    if (!isControlled) {
      setInternalChecked(newChecked)
    }
    onCheckedChange?.(newChecked)
  }

  const ariaChecked = `${currentChecked}` === "indeterminate" ? "mixed" : currentChecked === true ? "true" : "false"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        type="checkbox"
        id={uniqueId}
        ref={inputRef}
        checked={currentChecked === true} // Native input only understands true/false
        onChange={handleChange}
        disabled={disabled}
        className="sr-only" // Hide native checkbox visually but keep it accessible
        aria-checked={ariaChecked}
        {...props}
      />
      <label
        htmlFor={uniqueId}
        className={cn(
          "flex items-center justify-center h-5 w-5 cursor-pointer rounded border transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          currentChecked === true
            ? "bg-primary border-none"
            : `${currentChecked}` === "indeterminate"
              ? "bg-primary "
              : "bg-white border-gray-300",
          disabled ?
            (currentChecked === true || `${currentChecked}` === "indeterminate"
              ? "bg-primary/50 border-gray-200 opacity-60 cursor-not-allowed"
              : "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed") : '',
          "peer", // Used for styling the label based on peer input state
        )}
      >
        {currentChecked === true && <Check className="h-4 w-4 text-white" />}
        {`${currentChecked}` === "indeterminate" && <Minus className="h-4 w-4 text-white" />}
      </label>
      {label && (
        <label
          htmlFor={uniqueId}
          className={cn(
            "text-sm text-gray-900 cursor-pointer select-none",
            disabled ? "text-gray-500 cursor-not-allowed": '',
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
}
