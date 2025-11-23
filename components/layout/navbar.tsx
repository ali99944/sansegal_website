'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Globe } from 'lucide-react'
import { PromotionalBanner } from './promotional_banner'
import { Button } from '../ui/button'
import { useCart } from '@/src/hooks/use-cart'
import { useLocalization } from '@/src/hooks/use-localization'
import { AppLocale, TranslatedViewProps } from '@/src/types/i18n'
// import AppConstants from '@/src/constants/app_constants'

export function Navbar({ dictionary }: TranslatedViewProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const { items } = useCart()
  const { changeLocale, locale } = useLocalization()

  const navDictionary = dictionary.layout.navbar

  const navigationItems = [
    { name: navDictionary.about, href: '/about' },
    { name: navDictionary.contact, href: '/contact' },
    { name: navDictionary.trackOrder, href: '/track-order' },
    { name: navDictionary.faq, href: '/faq' },
  ]

  const toggleLanguage = (lang: string) => {
    changeLocale(lang as AppLocale)
    setIsLanguageMenuOpen(false)
  }

  return (
    <header className="relative">
      <PromotionalBanner />
      
      <nav className="bg-[#0d1321] border-b border-neutral-mid/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-neutral-mid/10"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  Sansegal
                </span>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline gap-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-secondary transition-colors duration-200 px-3 py-2 text-sm font-medium tracking-wide"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="relative">
                <div 
                  className="text-white hover:bg-neutral-mid/10 flex items-center gap-2 p-2 cursor-pointer rounded-full"
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                >
                  <Globe className="h-5 w-5 mr-1" />
                  <span className="text-xs font-medium">{locale.toUpperCase()}</span>
                </div>

                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-sm z-50">
                    <div className="py-1">
                      <button
                        className={`${locale === 'en' ? 'bg-neutral-light/50' : ''} cursor-pointer flex items-center w-full px-4 py-2 text-sm text-left text-primary hover:bg-neutral-light`}
                        onClick={() => toggleLanguage('en')}
                      >
                        <span className="mr-2">🇬🇧</span> {navDictionary.english}
                      </button>
                      <button
                        className={`${locale === 'ar' ? 'bg-neutral-light/50' : ''} cursor-pointer flex items-center w-full px-4 py-2 text-sm text-left text-primary hover:bg-neutral-light`}
                        onClick={() => toggleLanguage('ar')}
                      >
                        <span className="mr-2">🇪🇬</span> {navDictionary.arabic}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link href={'/cart'}>
                <div className="p-2 cursor-pointer rounded-full text-white hover:bg-neutral-mid/10 relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="sr-only">{navDictionary.shoppingBag}</span>
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {items.length}
                  </span>
                </div>
              </Link>

              {/* <Link
                href={AppConstants.control_panel_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 cursor-pointer rounded-full text-white hover:bg-neutral-mid/10"
              >
                <Users2 className="h-5 w-5" />
                <span className="text-sm">{navDictionary.admin}</span>
              </Link> */}
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-neutral-light border-t border-neutral-mid/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-secondary hover:bg-neutral-mid/10 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}