import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Users, Globe, Heart } from 'lucide-react'
import { Card } from "@/components/ui/card"
import Link from "next/link"

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    titleAr: "جودة فائقة",
    description: "We source only the finest materials and employ master craftsmen to ensure every piece meets our exacting standards.",
  },
  {
    icon: Users,
    title: "Artisan Heritage",
    titleAr: "تراث الحرفيين",
    description: "Our techniques are passed down through generations, preserving traditional craftsmanship in every stitch.",
  },
  {
    icon: Globe,
    title: "Sustainable Practices",
    titleAr: "ممارسات مستدامة",
    description: "We're committed to ethical sourcing and environmentally responsible production methods.",
  },
  {
    icon: Heart,
    title: "Customer Dedication",
    titleAr: "تفاني للعملاء",
    description: "Your satisfaction is our priority. We build lasting relationships through exceptional service and quality.",
  },
]


export default function AboutPage() {
  return (
    <div className="bg-neutral-light pb-12">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary flex items-center justify-center overflow-hidden">


        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl md:text-2xl text-neutral-light/90 max-w-2xl mx-auto leading-relaxed">
            Crafting timeless elegance through generations of artisan expertise
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding  max-w-7xl mx-auto py-12 px-4">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-semibold text-primary mb-6 tracking-tight">
                Sansegal
              </h2>
              <p className="text-lg text-neutral-mid mb-6 leading-relaxed">
                Founded in 2010, Sansegal emerged from a simple yet profound belief: that true luxury lies not in
                ostentation, but in the quiet confidence of impeccable craftsmanship. Our journey began in a small
                workshop where master artisans dedicated their lives to perfecting the ancient art of leather working.
              </p>
              <p className="text-lg text-neutral-mid mb-6 leading-relaxed">
                Today, we continue this tradition, creating bags that are more than accessories—they are companions for
                life&apos;s most important moments. Each piece tells a story of dedication, skill, and an unwavering
                commitment to excellence.
              </p>
              <p className="text-lg text-neutral-mid mb-8 leading-relaxed">
                From our workshop to your wardrobe, every Sansegal creation embodies our core values: timeless design,
                superior materials, and the human touch that makes each piece unique.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/assets/images/logo.jpg"
                alt="Sansegal workshop"
                width={600}
                height={500}
                // className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-neutral-light py-12 max-w-7xl mx-auto px-4">
        <div className="container-luxury">
          {/* <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-semibold text-primary mb-4 tracking-tight">Our Values</h2>
            <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make and every product we create
            </p>
          </div> */}

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
          <h2 className="font-serif text-4xl font-semibold mb-6 text-text-primary tracking-tight">
            Experience Sansegal Quality
          </h2>
          <p className="text-lg mb-8 text-text-primary/90 max-w-2xl mx-auto leading-relaxed">
            Discover the difference that true craftsmanship makes. Each piece is a testament to our commitment to
            excellence and your discerning taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/'}>
              <Button size="lg" >
                Shop Collection
              </Button>
            </Link>
            <Link href={'/contact'}>
              <Button
                variant="outline"
                size="lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
