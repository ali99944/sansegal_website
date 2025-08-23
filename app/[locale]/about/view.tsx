"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Users, Globe, Heart } from 'lucide-react'
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { TranslatedViewProps } from "@/src/types/i18n"

export default function AboutPage({ dictionary }: TranslatedViewProps) {
  const aboutDictionary = dictionary.about

  // Reconstruct the values array by combining dictionary data with icons
  const values = [
    { icon: Award, ...aboutDictionary.values[0] },
    { icon: Users, ...aboutDictionary.values[1] },
    { icon: Globe, ...aboutDictionary.values[2] },
    { icon: Heart, ...aboutDictionary.values[3] },
  ]

  return (
    <div className="bg-neutral-light pb-12">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {aboutDictionary.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-light/90 max-w-2xl mx-auto leading-relaxed">
            {aboutDictionary.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding max-w-7xl mx-auto py-12 px-4">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-primary mb-6 tracking-tight">
                {aboutDictionary.story.title}
              </h2>
              <p className="text-lg text-neutral-mid mb-6 leading-relaxed">
                {aboutDictionary.story.paragraph1}
              </p>
              <p className="text-lg text-neutral-mid mb-6 leading-relaxed">
                {aboutDictionary.story.paragraph2}
              </p>
              <p className="text-lg text-neutral-mid mb-8 leading-relaxed">
                {aboutDictionary.story.paragraph3}
              </p>
            </div>
            <div className="relative">
              <Image
                src="/assets/images/logo.jpg"
                alt="Sansegal workshop"
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-neutral-light py-12 max-w-7xl mx-auto px-4">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <value.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-neutral-mid leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Card className="section-padding bg-white text-white max-w-7xl mx-auto p-8 rounded-xl ">
        <div className="container-luxury text-center">
          <h2 className="font-serif text-4xl font-semibold mb-6 text-primary tracking-tight">
            {aboutDictionary.cta.title}
          </h2>
          <p className="text-lg mb-8 text-primary/90 max-w-2xl mx-auto leading-relaxed">
            {aboutDictionary.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/'}>
              <Button size="lg">
                {aboutDictionary.cta.buttonShop}
              </Button>
            </Link>
            <Link href={'/contact'}>
              <Button variant="outline" size="lg">
                {aboutDictionary.cta.buttonContact}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}