"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Globe } from 'lucide-react'
import { PromotionalBanner } from './promotional_banner'
import { Button } from '../ui/button'
import { useCart } from '@/src/hooks/use-cart'

const navigationItems = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState('en') // 'en' for English, 'ar' for Arabic
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const { items } = useCart()


  const toggleLanguage = (lang: string) => {
    setLanguage(lang)
    setIsLanguageMenuOpen(false)
    // Here you would implement actual language switching logic
  }

  return (
    <header className="relative">
      <PromotionalBanner />
      
      {/* Main Navigation */}
      <nav className="bg-[#0d1321] border-b border-neutral-mid/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
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

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  Sansegal
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
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

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <div 
                  className="text-white hover:bg-neutral-mid/10 flex items-center p-2 cursor-pointer rounded-full"
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                >
                  <Globe className="h-5 w-5 mr-1" />
                  <span className="text-xs font-medium">{language.toUpperCase()}</span>
                  {/* {language === 'en' ? 
                    <span className="ml-1 text-xs">🇬🇧</span> : 
                    <span className="ml-1 text-xs">🇪🇬</span>
                  } */}
                </div>

                {/* Language Dropdown */}
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-sm z-50">
                    <div className="py-1">
                      <button
                        className={`${language === 'en' ? 'bg-neutral-light/50' : ''} cursor-pointer flex items-center w-full px-4 py-2 text-sm text-left text-primary hover:bg-neutral-light`}
                        onClick={() => toggleLanguage('en')}
                      >
                        <span className="mr-2">🇬🇧</span> English
                      </button>
                      <button
                        className={`${language === 'ar' ? 'bg-neutral-light/50' : ''} cursor-pointer flex items-center w-full px-4 py-2 text-sm text-left text-primary hover:bg-neutral-light`}
                        onClick={() => toggleLanguage('ar')}
                      >
                        <span className="mr-2">🇪🇬</span> العربية
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link href={'/cart'}>
              <div className="p-2 cursor-pointer rounded-full text-white hover:bg-neutral-mid/10 relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Shopping bag</span>
                {/* Cart count badge */}
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {items.length}
                </span>
              </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
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
