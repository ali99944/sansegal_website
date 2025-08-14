import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react'

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

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Email', href: 'mailto:hello@sansegal.com', icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-3xl font-bold text-highlight tracking-tight">
                Sansegal
              </span>
            </Link>
            <p className="text-neutral-mid mb-6 leading-relaxed">
              Timeless elegance meets handcrafted quality. Each piece tells a story of artisan dedication and premium materials.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-neutral-mid hover:text-highlight transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
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
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-mid/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-mid text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Sansegal. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-neutral-mid hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-mid hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-neutral-mid hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
