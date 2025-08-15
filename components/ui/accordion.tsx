/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from "react"

import type { ReactNode } from "react"
import { useState, useId, useCallback, createContext, useContext, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

// --- Contexts ---
interface AccordionContextType {
  type: "single" | "multiple"
  collapsible: boolean
  value: string[]
  onItemClick: (itemValue: string) => void
  disabled: boolean
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

function useAccordionContext() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within an <Accordion> component")
  }
  return context
}

// --- Accordion Component ---
interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean // Only applies to type="single"
  value?: string | string[] // Controlled state
  defaultValue?: string | string[] // Uncontrolled state
  onValueChange?: (value: string | string[]) => void
  disabled?: boolean
  className?: string
  children: ReactNode
}

export function Accordion({
  type = "single",
  collapsible = false,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  children,
}: AccordionProps) {
  const initialValue = useMemo(() => {
    if (defaultValue === undefined) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  }, [defaultValue])

  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(initialValue)

  const currentValue =
    controlledValue !== undefined
      ? Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue]
      : uncontrolledValue

  const handleValueChange = useCallback(
    (newValue: string[]) => {
      if (onValueChange) {
        onValueChange(type === "single" ? newValue[0] || "" : newValue)
      }
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue)
      }
    },
    [onValueChange, type, controlledValue],
  )

  const onItemClick = useCallback(
    (itemValue: string) => {
      if (disabled) return

      let newSelectedValues: string[]
      if (type === "single") {
        const isAlreadyOpen = currentValue.includes(itemValue)
        if (isAlreadyOpen && collapsible) {
          newSelectedValues = [] // Close if already open and collapsible
        } else if (isAlreadyOpen && !collapsible) {
          newSelectedValues = [itemValue] // Keep open if not collapsible
        } else {
          newSelectedValues = [itemValue] // Open new item
        }
      } else {
        // type === "multiple"
        if (currentValue.includes(itemValue)) {
          newSelectedValues = currentValue.filter((val) => val !== itemValue)
        } else {
          newSelectedValues = [...currentValue, itemValue]
        }
      }
      handleValueChange(newSelectedValues)
    },
    [type, currentValue, collapsible, handleValueChange, disabled],
  )

  const contextValue = useMemo(
    () => ({
      type,
      collapsible,
      value: currentValue,
      onItemClick,
      disabled,
    }),
    [type, collapsible, currentValue, onItemClick, disabled],
  )

  return (
    <div className={cn("w-full", className)}>
      <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>
    </div>
  )
}

// --- AccordionItem Component ---
interface AccordionItemProps {
  value: string
  disabled?: boolean
  className?: string
  children: ReactNode
}

export function AccordionItem({ value, disabled, className, children }: AccordionItemProps) {
  const { value: openItems, disabled: groupDisabled } = useAccordionContext()
  const isOpen = openItems.includes(value)
  const isDisabled = disabled || groupDisabled

  return (
    <div
      className={cn(
        "border-b border-gray-200 last:border-b-0",
        isDisabled ? "opacity-60 cursor-not-allowed" : '',
        className,
      )}
      data-state={isOpen ? "open" : "closed"}
      data-disabled={isDisabled}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && (child.type === AccordionTrigger || child.type === AccordionContent)) {
          return React.cloneElement(child, {
            itemValue: value,
            isOpen,
            isDisabled,
          } as any) // Type assertion for internal props
        }
        return child
      })}
    </div>
  )
}

// --- AccordionTrigger Component ---
interface AccordionTriggerProps {
  children: ReactNode
  className?: string
  // Internal props passed from AccordionItem
  itemValue?: string
  isOpen?: boolean
  isDisabled?: boolean
}

export function AccordionTrigger({ children, className, itemValue, isOpen, isDisabled }: AccordionTriggerProps) {
  const { onItemClick } = useAccordionContext()
  const triggerId = useId()
  const contentId = useId() // Assuming content will use this ID for aria-controls

  const handleClick = useCallback(() => {
    if (itemValue && !isDisabled) {
      onItemClick(itemValue)
    }
  }, [itemValue, onItemClick, isDisabled])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        handleClick()
      }
    },
    [handleClick],
  )

  return (
    <button
      id={triggerId}
      type="button"
      role="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full items-center justify-between py-2 px-2 text-lg font-medium text-gray-900 transition-colors duration-200 ease-out",
        !isDisabled ? "hover:bg-gray-50" : '',
        isDisabled ? "cursor-not-allowed" : '',
        className,
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 ease-in-out",
          isOpen ? "rotate-180" : '',
        )}
      />
    </button>
  )
}

// --- AccordionContent Component ---
interface AccordionContentProps {
  children: ReactNode
  className?: string
  // Internal props passed from AccordionItem
  itemValue?: string
  isOpen?: boolean
  isDisabled?: boolean
}

export function AccordionContent({ children, className, itemValue, isOpen }: AccordionContentProps) {
  const contentId = useId() // Should match the ID used by AccordionTrigger

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={itemValue} // Link to the trigger's value
      className={cn(
        "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
        isOpen ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0",
        className,
      )}
    >
      <div className="pb-4 px-4 text-sm text-gray-700">{children}</div>
    </div>
  )
}
