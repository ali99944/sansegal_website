// "use client"

// import React from "react"

// import type { ReactNode } from "react"
// import { useState, useRef, useEffect, useCallback } from "react"
// import { cn } from "@/lib/utils"
// import {Button} from "./button"

// interface DropdownProps {
//   children: ReactNode
//   isOpen?: boolean
//   onOpenChange?: (isOpen: boolean) => void
//   align?: "start" | "center" | "end"
//   sideOffset?: number
//   className?: string
// }

// interface DropdownTriggerProps {
//   children: ReactNode
// }

// interface DropdownMenuProps {
//   children: ReactNode
//   className?: string
// }

// interface DropdownMenuItemProps {
//   children: ReactNode
//   onSelect?: () => void
//   disabled?: boolean
//   className?: string
// }

// interface DropdownMenuSeparatorProps {
//   className?: string
// }

// const alignClasses = {
//   start: "left-0",
//   center: "left-1/2 -translate-x-1/2",
//   end: "right-0",
// }

// export function Dropdown({
//   children,
//   isOpen: controlledIsOpen,
//   onOpenChange: controlledOnOpenChange,
//   align = "start",
//   sideOffset = 8,
//   className,
// }: DropdownProps) {
//   const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false)
//   const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen
//   const onOpenChange = controlledOnOpenChange || setUncontrolledIsOpen

//   const triggerRef = useRef<HTMLButtonElement>(null)
//   const menuRef = useRef<HTMLDivElement>(null)

//   const childrenArray = React.Children.toArray(children)
//   const trigger = childrenArray[0] as React.ReactElement<DropdownTriggerProps>
//   const menu = childrenArray[1] as React.ReactElement<DropdownMenuProps>

//   const closeMenu = useCallback(() => {
//     onOpenChange(false)
//     triggerRef.current?.focus() // Return focus to the trigger
//   }, [onOpenChange])

//   // Handle click outside
//   useEffect(() => {
//     if (!isOpen) return

//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node) &&
//         triggerRef.current &&
//         !triggerRef.current.contains(event.target as Node)
//       ) {
//         closeMenu()
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [isOpen, closeMenu])

//   // Handle keyboard navigation
//   useEffect(() => {
//     if (!isOpen) return

//     const handleKeyDown = (event: KeyboardEvent) => {
//       const menuItems = Array.from(
//         menuRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') || [],
//       ) as HTMLElement[]
//       if (menuItems.length === 0) return

//       const currentIndex = menuItems.findIndex((item) => item === document.activeElement)

//       switch (event.key) {
//         case "ArrowDown":
//           event.preventDefault()
//           const nextIndex = (currentIndex + 1) % menuItems.length
//           menuItems[nextIndex]?.focus()
//           break
//         case "ArrowUp":
//           event.preventDefault()
//           const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length
//           menuItems[prevIndex]?.focus()
//           break
//         case "Escape":
//           event.preventDefault()
//           closeMenu()
//           break
//         case "Enter":
//         case " ":
//           if (document.activeElement && document.activeElement.getAttribute("role") === "menuitem") {
//             event.preventDefault()
//             ;(document.activeElement as HTMLElement).click()
//           }
//           break
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown)
//     return () => document.removeEventListener("keydown", handleKeyDown)
//   }, [isOpen, closeMenu])

//   // Focus the first item when menu opens
//   useEffect(() => {
//     if (isOpen && menuRef.current) {
//       const firstFocusableItem = menuRef.current.querySelector(
//         '[role="menuitem"]:not([aria-disabled="true"])',
//       ) as HTMLElement
//       firstFocusableItem?.focus()
//     }
//   }, [isOpen])

//   return (
//     <div className={cn("relative inline-block text-left", className)}>
//       {React.cloneElement(trigger, {
//         ref: triggerRef,
//         onClick: () => onOpenChange(!isOpen),
//         "aria-haspopup": "menu",
//         "aria-expanded": isOpen,
//       })}

//       {isOpen && (
//         <div
//           ref={menuRef}
//           role="menu"
//           aria-orientation="vertical"
//           className={cn(
//             "absolute z-50 mt-2 w-48 rounded-lg bg-white shadow-md border border-gray-200 focus:outline-none",
//             alignClasses[align],
//             `top-[calc(100% + ${sideOffset}px)]`, // Apply sideOffset
//             "animate-in fade-in-0 zoom-in-95 duration-200 ease-out", // Simple animation
//             menu.props.className,
//           )}
//         >
//           <div className="p-1.5">
//             {React.Children.map(menu.props.children, (child) => {
//               if (React.isValidElement(child) && child.type === DropdownMenuItem) {
//                 return React.cloneElement(child, {
//                   onSelect: () => {
//                     child.props.onSelect?.()
//                     closeMenu()
//                   },
//                 })
//               }
//               return child
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export function DropdownTrigger({ children, ...props }: DropdownTriggerProps) {
//   return <Button {...props}>{children}</Button>
// }

// export function DropdownMenu({ children }: DropdownMenuProps) {
//   return <>{children}</> // This component is just a wrapper for children, its props are used by the parent Dropdown
// }

// export function DropdownMenuItem({ children, onSelect, disabled, className }: DropdownMenuItemProps) {
//   const itemRef = useRef<HTMLDivElement>(null)

//   const handleSelect = useCallback(() => {
//     if (!disabled && onSelect) {
//       onSelect()
//     }
//   }, [disabled, onSelect])

//   const handleKeyDown = useCallback(
//     (event: React.KeyboardEvent) => {
//       if (event.key === "Enter" || event.key === " ") {
//         event.preventDefault()
//         handleSelect()
//       }
//     },
//     [handleSelect],
//   )

//   return (
//     <div
//       ref={itemRef}
//       role="menuitem"
//       tabIndex={disabled ? -1 : 0} // Make non-disabled items focusable
//       onClick={handleSelect}
//       onKeyDown={handleKeyDown}
//       aria-disabled={disabled}
//       className={cn(
//         "block px-4 py-1 text-sm cursor-pointer transition-colors duration-150 ease-out",
//         disabled
//           ? "text-gray-400 cursor-not-allowed"
//           : "text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
//         className,
//       )}
//     >
//       {children}
//     </div>
//   )
// }

// export function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps) {
//   return <div className={cn("-mx-1 my-1 h-px bg-gray-200", className)} role="separator" />
// }
