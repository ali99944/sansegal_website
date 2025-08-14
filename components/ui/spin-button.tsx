// "use client"

// import type React from "react"
// import { useState, useId, useCallback, useEffect } from "react"
// import { cn } from "@/lib/utils"
// import { ChevronUp, ChevronDown } from "lucide-react"

// interface SpinButtonProps {
//   value?: number
//   defaultValue?: number
//   onValueChange?: (value: number) => void
//   label?: string
//   min?: number
//   max?: number
//   step?: number
//   disabled?: boolean
//   className?: string
// }

// export function SpinButton({
//   value,
//   defaultValue = 0,
//   onValueChange,
//   label,
//   min = Number.NEGATIVE_INFINITY,
//   max = Number.POSITIVE_INFINITY,
//   step = 1,
//   disabled = false,
//   className,
//   ...props
// }: SpinButtonProps & React.InputHTMLAttributes<HTMLInputElement>) {
//   const isControlled = value !== undefined
//   const [internalValue, setInternalValue] = useState<number>(defaultValue)
//   const inputId = useId()

//   const currentValue = isControlled ? value : internalValue

//   // Ensure value stays within min/max bounds
//   useEffect(() => {
//     if (isControlled && value !== undefined) {
//       setInternalValue(Math.max(min, Math.min(max, value)))
//     } else if (!isControlled) {
//       setInternalValue((prev) => Math.max(min, Math.min(max, prev)))
//     }
//   }, [value, isControlled, min, max])

//   const updateValue = useCallback(
//     (newValue: number) => {
//       const clampedValue = Math.max(min, Math.min(max, newValue))
//       if (clampedValue !== currentValue) {
//         if (!isControlled) {
//           setInternalValue(clampedValue)
//         }
//         onValueChange?.(clampedValue)
//       }
//     },
//     [currentValue, isControlled, onValueChange, min, max],
//   )

//   const handleIncrement = useCallback(() => {
//     if (disabled) return
//     updateValue(currentValue + step)
//   }, [currentValue, step, updateValue, disabled])

//   const handleDecrement = useCallback(() => {
//     if (disabled) return
//     updateValue(currentValue - step)
//   }, [currentValue, step, updateValue, disabled])

//   const handleInputChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       if (disabled) return
//       const numValue = Number.parseFloat(event.target.value)
//       if (!isNaN(numValue)) {
//         updateValue(numValue)
//       } else if (event.target.value === "") {
//         // Allow clearing the input temporarily, but revert to last valid on blur
//         if (!isControlled) {
//           setInternalValue(Number.NaN) // Use NaN to indicate invalid input
//         }
//         onValueChange?.(Number.NaN) // Notify parent of invalid state if needed
//       }
//     },
//     [updateValue, disabled, isControlled, onValueChange],
//   )

//   const handleInputBlur = useCallback(() => {
//     if (isNaN(currentValue)) {
//       // If input was cleared or invalid, revert to min or 0
//       updateValue(min > 0 ? min : 0)
//     }
//   }, [currentValue, updateValue, min])

//   const handleKeyDown = useCallback(
//     (event: React.KeyboardEvent<HTMLInputElement>) => {
//       if (disabled) return
//       if (event.key === "ArrowUp") {
//         event.preventDefault()
//         handleIncrement()
//       } else if (event.key === "ArrowDown") {
//         event.preventDefault()
//         handleDecrement()
//       }
//     },
//     [handleIncrement, handleDecrement, disabled],
//   )

//   return (
//     <div className={cn("w-full", className)}>
//       {label && (
//         <label htmlFor={inputId} className="block text-base font-normal text-gray-900 mb-2">
//           {label}
//         </label>
//       )}
//       <div
//         className={cn(
//           "relative flex items-center w-full border rounded overflow-hidden",
//           "focus-within:border-primary ", // Focus style
//           disabled ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed" : "bg-white border-gray-300",
//         )}
//       >
//         <input
//           id={inputId}
//           type="text" // Use text to allow partial input, parse to number
//           value={isNaN(currentValue) ? "" : currentValue}
//           onChange={handleInputChange}
//           onBlur={handleInputBlur}
//           onKeyDown={handleKeyDown}
//           disabled={disabled}
//           className={cn(
//             "flex-1 px-3 py-1.5 text-sm outline-none bg-transparent",
//             "appearance-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden", // Hide native spin buttons
//             disabled ? "text-gray-500" : "text-gray-900",
//           )}
//           role="spinbutton"
//           aria-valuenow={currentValue}
//           aria-valuemin={min}
//           aria-valuemax={max}
//           aria-disabled={disabled}
//           {...props}
//         />
//         <div className={cn("flex flex-col border-l", disabled ? "border-gray-200" : "border-gray-300")}>
//           <button
//             type="button"
//             onClick={handleIncrement}
//             disabled={disabled || currentValue >= max}
//             className={cn(
//               "flex items-center justify-center w-6 h-5 text-gray-500 hover:bg-gray-100",
//               "transition-colors duration-150 ease-out",
//               (disabled || currentValue >= max) && "opacity-50 cursor-not-allowed hover:bg-transparent",
//             )}
//             aria-label="Increment value"
//           >
//             <ChevronUp className="h-3 w-3" />
//           </button>
//           <button
//             type="button"
//             onClick={handleDecrement}
//             disabled={disabled || currentValue <= min}
//             className={cn(
//               "flex items-center justify-center w-6 h-5 text-gray-500 hover:bg-gray-100",
//               "transition-colors duration-150 ease-out",
//               (disabled || currentValue <= min) && "opacity-50 cursor-not-allowed hover:bg-transparent",
//             )}
//             aria-label="Decrement value"
//           >
//             <ChevronDown className="h-3 w-3" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
