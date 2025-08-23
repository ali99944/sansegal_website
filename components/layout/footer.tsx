'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react'
import { usePolicies } from '@/src/hooks/use-policy'
import { useSettings } from '@/src/hooks/use-settings'
import { FaTiktok } from 'react-icons/fa6'
import { TranslatedViewProps } from '@/src/types/i18n'

export function Footer({ dictionary }: TranslatedViewProps) {
  const { data: policies, isFetching: is_policies_loading } = usePolicies()
  const { data: settings, isFetching: is_settings_loading } = useSettings()
  
  const footerDictionary = dictionary.layout.footer

  const footerSections = [
    {
      title: footerDictionary.linksTitle,
      links: [
        { name: footerDictionary.allProducts, href: '/shop' },
        { name: footerDictionary.aboutUs, href: '/about' },
        { name: footerDictionary.contactUs, href: '/contact' },
        { name: footerDictionary.trackOrder, href: '/track-order' },
      ],
    },
    {
      title: footerDictionary.supportTitle,
      links: [
        { name: footerDictionary.contactUs, href: '/contact' },
        { name: footerDictionary.shippingReturns, href: '/returns' },
        { name: footerDictionary.faq, href: '/faq' },
      ],
    },
  ]

  const socialLinks = [
    { name: 'Instagram', href: settings?.social.instagram_url, icon: Instagram },
    { name: 'Facebook', href: settings?.social.facebook_url, icon: Facebook },
    { name: 'Twitter', href: settings?.social.twitter_url, icon: Twitter },
    { name: 'Tiktok', href: settings?.social.tiktok_url, icon: FaTiktok },
    { name: 'Email', href: `mailto:${settings?.contact.public_email}`, icon: Mail },
  ]

  const skeletonClass = "animate-pulse bg-white/20 rounded-md"

  return (
    <footer className="bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="flex justify-center md:justify-start">
            {is_settings_loading ? (
              <div className={`${skeletonClass} h-52 w-52`}></div>
            ) : (
              <img src="/assets/images/logo.jpg" alt="logo" className="h-52" />
            )}
          </div>
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-3xl font-bold text-highlight tracking-tight">
                Sansegal
              </span>
            </Link>
            {is_settings_loading ? (
              <div className="space-y-2">
                <div className={`${skeletonClass} h-4 w-full`}></div>
                <div className={`${skeletonClass} h-4 w-5/6`}></div>
                <div className={`${skeletonClass} h-4 w-4/6`}></div>
              </div>
            ) : (
              <p className="text-neutral-mid mb-6 leading-relaxed">
                {footerDictionary.brandDescription}
              </p>
            )}
            <div className="flex space-x-4 mt-6">
              {is_settings_loading ? (
                <>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`${skeletonClass} h-5 w-5`}></div>
                  ))}
                </>
              ) : (
                socialLinks.map((social) => (
                  social.href && (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-neutral-mid hover:text-highlight transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  )
                ))
              )}
            </div>
          </div>

          {is_settings_loading ? (
            <>
              {[1, 2].map((section) => (
                <div key={section} className="space-y-4">
                  <div className={`${skeletonClass} h-6 w-24 mb-4`}></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((link) => (
                      <div key={link} className={`${skeletonClass} h-4 w-32`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-serif text-lg font-semibold mb-4 text-highlight">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-neutral-mid hover:underline underline-offset-2 hover:text-neutral-mid/80 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-neutral-mid/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-mid text-sm mb-4 md:mb-0">
            {is_settings_loading ? (
              <div className={`${skeletonClass} h-4 w-64`}></div>
            ) : (
              settings?.general.copyright_text?.replace('{year}', new Date().getFullYear().toString())
            )}
          </div>
          <div className="flex space-x-6 text-sm">
            {is_policies_loading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`${skeletonClass} h-4 w-20`}></div>
                ))}
              </>
            ) : (
              policies?.map(policy => (
                <Link key={policy.id} href={`/policies/${policy.slug}`} className="text-neutral-mid hover:text-white transition-colors">
                  {policy.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}