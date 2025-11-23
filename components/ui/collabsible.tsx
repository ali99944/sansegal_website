'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, ChevronRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Collapsible Context to manage active item
interface CollapsibleContextType {
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  disabled: boolean
  variant: CollapsibleItemProps['variant']
  toggleIcon: {
    open: LucideIcon
    closed: LucideIcon
  }
}

const CollapsibleContext = React.createContext<CollapsibleContextType | undefined>(undefined)

const useCollapsibleContext = () => {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error('Collapsible components must be used within a <Collapsible> container.')
  }
  return context
}

// Collapsible Root Component
interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The value of the currently open collapsible item.
   * Use this with `onValueChange` for a controlled component.
   */
  value?: string
  /**
   * The default value of the open collapsible item when the component is uncontrolled.
   */
  defaultValue?: string
  /**
   * Event handler called when the open item changes.
   */
  onValueChange?: (value: string | undefined) => void
  /**
   * If true, all collapsible items within this group will be disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * The default variant for all collapsible items within this group.
   * @default "default"
   */
  variant?: CollapsibleItemProps['variant']
  /**
   * Custom icons for the toggle indicator.
   */
  toggleIcons?: {
    open?: LucideIcon
    closed?: LucideIcon
  }
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled = false,
      variant = 'default',
      toggleIcons,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)
    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback(
      (newValue: string | undefined) => {
        if (controlledValue === undefined) {
          setUncontrolledValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [controlledValue, onValueChange],
    )

    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange: handleValueChange,
        disabled,
        variant,
        toggleIcon: {
          open: toggleIcons?.open || ChevronDown,
          closed: toggleIcons?.closed || ChevronRight,
        },
      }),
      [value, handleValueChange, disabled, variant, toggleIcons],
    )

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  },
)
Collapsible.displayName = 'Collapsible'

// Collapsible Item Component
const collapsibleItemVariants = cva(
  'group border-b last:border-b-0 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        ghost: 'border-transparent',
        bordered: 'border border-gray-200 rounded-md mb-2 last:mb-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface CollapsibleItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof collapsibleItemVariants> {
  /**
   * A unique value for the collapsible item. This is used to identify the active item.
   */
  value: string
  /**
   * If true, the collapsible item will be disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * An optional icon to display next to the title.
   */
  icon?: LucideIcon
  /**
   * Custom icons for the toggle indicator, overriding the parent Collapsible's icons.
   */
  toggleIcons?: {
    open?: LucideIcon
    closed?: LucideIcon
  }
}

const CollapsibleItem = React.forwardRef<HTMLDivElement, CollapsibleItemProps>(
  ({ className, title, children, value: itemValue, disabled: itemDisabled, icon: ItemIcon, toggleIcons, variant, ...props }, ref) => {
    const { value, onValueChange, disabled: contextDisabled, variant: contextVariant, toggleIcon: contextToggleIcons } = useCollapsibleContext()
    const isDisabled = itemDisabled || contextDisabled
    const isActive = value === itemValue
    const currentVariant = variant || contextVariant
    const OpenIcon = toggleIcons?.open || contextToggleIcons.open
    const ClosedIcon = toggleIcons?.closed || contextToggleIcons.closed

    const handleToggle = React.useCallback(() => {
      if (!isDisabled) {
        onValueChange(isActive ? undefined : itemValue)
      }
    }, [isActive, itemValue, onValueChange, isDisabled])

    const headerClasses = cn(
      'flex items-center justify-between py-4 px-4 cursor-pointer transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
      ...[
        currentVariant === 'default' && !isActive ? 'bg-white ' : '',
        currentVariant === 'default' && isActive ? 'bg-white' : '',
        currentVariant === 'ghost' ? 'bg-transparent hover:bg-white' : '',
        currentVariant === 'bordered' && !isActive ? 'bg-white ' : '',
        currentVariant === 'bordered' && isActive ? 'bg-white': '',
        isDisabled ? 'opacity-50 cursor-not-allowed': '',
      ],
    )

    const contentClasses = cn(
      'grid transition-[grid-template-rows] duration-300 ease-in-out',
      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
    )

    return (
      <div
        ref={ref}
        className={cn(collapsibleItemVariants({ variant: currentVariant }), className)}
        data-state={isActive ? 'open' : 'closed'}
        data-disabled={isDisabled}
        {...props}
      >
        <button
          type="button"
          className={headerClasses}
          onClick={handleToggle}
          disabled={isDisabled}
          aria-expanded={isActive}
          aria-controls={`collapsible-content-${itemValue}`}
          id={`collapsible-trigger-${itemValue}`}
        >
          <div className='flex items-center gap-4'>
            <span className="ml-auto transition-transform duration-300">
            {isActive ? <OpenIcon className="h-4 w-4 text-gray-500" /> : <ClosedIcon className="h-4 w-4 text-gray-500" />}
          </span>
          <div className="flex items-center gap-3 text-base font-medium text-gray-800">
            {ItemIcon && <ItemIcon className="h-4 w-4 text-gray-500" />}
            {title ?? 'Collapsible Title'}
          </div>
          </div>
        </button>
        <div
          id={`collapsible-content-${itemValue}`}
          role="region"
          aria-labelledby={`collapsible-trigger-${itemValue}`}
          className={contentClasses}
        >
          <div className="overflow-hidden">
            <div className="pb-4 px-4 text-sm text-gray-700">
              {React.isValidElement(children) && 'content' in (children.props as ['content']) ? (children.props as { content: string }).content as React.ReactNode : children}
            </div>
          </div>
        </div>
      </div>
    )
  },
)
CollapsibleItem.displayName = 'CollapsibleItem'

// Helper components for structure
interface CollapsibleTriggerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
}

const CollapsibleTrigger = ({ title, ...props }: CollapsibleTriggerProps) => {
  return <div {...props}>{title}</div>
}
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

interface CollapsibleContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode
}

const CollapsibleContent = ({ content, ...props }: CollapsibleContentProps) => {
  return <div {...props}>{content}</div>
}
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleItem, CollapsibleTrigger, CollapsibleContent }

