import { Clock, Truck, RefreshCw, CheckCircle } from "lucide-react"

const benefits = [
  {
    icon: CheckCircle,
    title: "تسوق بكل ثقة",
    titleEn: "Shop with Confidence",
    description: "ضمانا التجارية أصلية %100",
    descriptionEn: "100% Original Guarantee",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: RefreshCw,
    title: "الإرجاع والاستبدال",
    titleEn: "Returns & Exchange",
    description: "قابلة للإرجاع خلال 14 يوما",
    descriptionEn: "14 Days Return Policy",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Truck,
    title: "الشحن مجانا",
    titleEn: "Free Shipping",
    description: "على كافة الطلبات",
    descriptionEn: "On All Orders",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Clock,
    title: "مركز المساعدة",
    titleEn: "Customer Support",
    description: "اتصل بنا يوميا من الساعة 10:00 صباحا",
    descriptionEn: "Contact us daily from 10:00 AM",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export function WhyChooseUsBanner() {
  return (
    <section className="bg-red-600 py-4">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center justify-center text-center text-white">
              <div className="flex items-center space-x-3 space-x-reverse">
                <benefit.icon className="h-6 w-6 flex-shrink-0" />
                <div className="text-right">
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-xs opacity-90">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const whyChooseUsCards = [
  {
    title: "ضد البرد",
    titleEn: "Cold Protection",
    description: "منتجاتنا ضد البرد وضمان مدى الحياة",
    descriptionEn: "Our products protect against cold with lifetime warranty",
    gradient: "from-blue-900 to-blue-700",
  },
  {
    title: "ضد التقشير",
    titleEn: "Anti-Peeling",
    description: "منتجاتنا ضد التقشير وضمان مدى الحياة",
    descriptionEn: "Our products are anti-peeling with lifetime warranty",
    gradient: "from-gray-900 to-gray-700",
  },
  {
    title: "لجميع المحافظات",
    titleEn: "All Provinces",
    description: "اشتري أي منتج واحصل على شحن مجاني",
    descriptionEn: "Buy any product and get free shipping",
    gradient: "from-slate-900 to-slate-700",
  },
]

export function WhyChooseUsCards() {
  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-semibold text-primary mb-4 tracking-tight">لماذا تختارنا؟</h2>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            نحن نقدم أفضل المنتجات الجلدية بجودة عالية وضمان مدى الحياة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChooseUsCards.map((card, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${card.gradient} text-white overflow-hidden group hover:scale-105 transition-transform duration-300`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
              </div>

              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold mb-4 text-right">{card.title}</h3>
                <p className="text-white/90 text-right leading-relaxed mb-4">{card.description}</p>
                <div className="text-right">
                  <span className="text-sm text-white/70">{card.titleEn}</span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
