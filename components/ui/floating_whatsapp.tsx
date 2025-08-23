"use client"

import { useSettings } from "@/src/hooks/use-settings"
import { TranslatedViewProps } from "@/src/types/i18n"
import { FaWhatsapp } from "react-icons/fa6"

export function FloatingWhatsApp({ dictionary }: TranslatedViewProps) {
  const { data: settings, isFetching: isSettingsLoading } = useSettings()

  // Extract the specific dictionary part for this component
  const whatsAppDictionary = dictionary.components.floatingWhatsApp

  // Get the WhatsApp number from the settings
  const phoneNumber = settings?.contact.whatsapp_number

  // Render nothing if the number isn't set in the control panel or if settings are still loading
  if (isSettingsLoading || !phoneNumber) {
    return null
  }

  // Sanitize the phone number (remove +, spaces, etc.) and encode the message for the URL
  const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(whatsAppDictionary.message)
  const whatsappUrl = `https://wa.me/${sanitizedPhoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsAppDictionary.ariaLabel}
      className="group fixed bottom-6 end-6 z-50 flex items-center justify-center"
    >
      {/* Tooltip that appears on hover */}
      <div className="absolute end-16 whitespace-nowrap rounded-md bg-black/80 px-3 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:end-20">
        {whatsAppDictionary.ariaLabel}
        <div className="absolute end-[-4px] top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-black/80" />
      </div>

      {/* Main Floating Button */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:bg-[#128C7E]">
        <FaWhatsapp className="h-8 w-8" />
      </div>
    </a>
  )
}