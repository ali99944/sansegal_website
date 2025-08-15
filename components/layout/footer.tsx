'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react'
import { usePolicies } from '@/src/hooks/use-policy'
import { useSettings } from '@/src/hooks/use-settings'
import { FaTiktok } from 'react-icons/fa6'

const footerSections = [
  {
    title: 'Links',
    links: [
      { name: 'All Products', href: '/shop' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Track Order', href: '/track-order' },
    ],
  },

  {
    title: 'Support',
    links: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping & Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
]



export function Footer() {

  const { data: policies, isFetching: is_policies_loading } = usePolicies()
  const { data:settings, isFetching: is_settings_loading } = useSettings()

  const socialLinks = [
    { name: 'Instagram', href: settings?.social.instagram_url, icon: Instagram },
    { name: 'Facebook', href: settings?.social.facebook_url, icon: Facebook },
    { name: 'Twitter', href: settings?.social.twitter_url, icon: Twitter },
    { name: 'Tiktok', href: settings?.social.tiktok_url, icon: FaTiktok },
    { name: 'Email', href: 'mailto:hello@sansegal.com', icon: Mail },
  ]

  // Skeleton loading animation class
  const skeletonClass = "animate-pulse bg-gray-700 rounded-md"

  return (
    <footer className="bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
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
                Timeless elegance meets handcrafted quality. Each piece tells a story of artisan dedication and premium materials.
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
                  <Link
                    key={social.name}
                    href={social.href ?? ''}
                    className="text-neutral-mid hover:text-highlight transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Footer Links */}
          {is_settings_loading ? (
            // Skeleton for footer sections
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

        {/* Bottom Footer */}
        <div className="border-t border-neutral-mid/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-mid text-sm mb-4 md:mb-0">
            {is_settings_loading ? (
              <div className={`${skeletonClass} h-4 w-64`}></div>
            ) : (
              settings?.general.copyright_text
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
                <Link key={policy.id} href="/privacy" className="text-neutral-mid hover:text-white transition-colors">
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
