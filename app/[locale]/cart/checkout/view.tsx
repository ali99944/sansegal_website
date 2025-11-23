"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, ShoppingBag, Mail, ArrowLeft, Copy, Check, Gift } from "lucide-react"
import { CustomerInfo } from "@/src/types/checkout"
import { useCart } from "@/src/hooks/use-cart"
import { useCreateOrder } from "@/src/hooks/use-order"
import { Card } from "@/components/ui/card"
import { useSettings } from "@/src/hooks/use-settings"
import { usePromoCode } from "@/src/hooks/use-promo-code"
import { PromoCode } from "@/src/types/promo_code"
import { useNotifications } from "@/src/hooks/use-notification"
import { getApiError } from "@/lib/error_handler"
import { useLocalization } from "@/src/hooks/use-localization"
import { TranslatedViewProps } from "@/src/types/i18n"

export default function CheckoutPage({ dictionary }: TranslatedViewProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "", lastName: "", email: "", phone: "", secondaryPhone: "",
    address: "", secondaryAddress: "", city: "", specialMark: "",
  })
  
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const egyptianCities = [
    "Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Aswan", "Asyut", "Ismailia",
    "Faiyum", "Zagazig", "Damietta", "Mansoura", "Tanta", "Sohag", "Hurghada", "Shibin El Kom", "Beni Suef",
    "Qena", "Minya", "Damanhur", "El Mahalla El Kubra", "Kafr El Sheikh", "Arish", "Mallawi", "Bilbais",
    "Marsa Matruh", "Idfu", "Mit Ghamr", "Kafr El Dawwar", "Qalyub", "Desouk", "Abu Kabir", "Girga", "Akhmim",
    "El Tor", "Abnub", "El Balyana", "Banha", "Dishna", "Qalyubia", "Siwa Oasis", "New Cairo",
    "6th of October City", "10th of Ramadan City", "El Gouna", "Sheikh Zuweid", "Sharm El Sheikh",
    "Dahab", "Nuweiba", "Saint Catherine"
  ]

  const [isCompleted, setIsCompleted] = useState(false)
  const [orderCode, setOrderCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedOrderCode, setCopiedOrderCode] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null)

  const { items: cartItems } = useCart()
  const { locale } = useLocalization()
  const checkoutDictionary = dictionary.checkout
  const currency = checkoutDictionary.currency

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const promoDiscount = useMemo(() => {
    if (!appliedPromo?.value) return 0
    return appliedPromo.type === 'fixed' ? appliedPromo.value : (appliedPromo.value / 100) * subtotal
  }, [appliedPromo, subtotal])

  const { data: settings } = useSettings()
  const shipping = settings?.store.delivery_fee ?? 0
  const total = subtotal - promoDiscount + shipping

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const redeemCodeAction = usePromoCode()
  const { notify } = useNotifications()

  const applyPromoCode = async () => {
    await redeemCodeAction.mutateAsync({ code: promoCode }, {
      onSuccess: (data) => setAppliedPromo(data),
      onError: (error) => notify.error(getApiError(error).message),
    })
  }

  const createOrderAction = useCreateOrder()

  const handleCompleteOrder = async () => {
    const requiredFields: (keyof CustomerInfo)[] = ["firstName", "lastName", "email", "phone", "address", "city"]
    const missingFields = requiredFields.filter((field) => !customerInfo[field].trim())

    if (missingFields.length > 0) {
      alert(checkoutDictionary.validation.fillRequiredFields)
      return
    }

    setIsLoading(true)
    await createOrderAction.mutateAsync({
      first_name: customerInfo.firstName,
      last_name: customerInfo.lastName,
      address: customerInfo.address,
      city: customerInfo.city,
      email: customerInfo.email,
      phone: customerInfo.phone,
      secondary_address: customerInfo.secondaryAddress,
      secondary_phone: customerInfo.secondaryPhone,
      special_mark: customerInfo.specialMark,
      promo_code: appliedPromo?.code ?? null
    }, {
      onError: () => setIsLoading(false),
      onSuccess: (order) => {
        setIsLoading(false)
        setOrderCode(order.order_code)
        setIsCompleted(true)
      },
    })
  }

  const copyOrderCode = async () => {
    try {
      await navigator.clipboard.writeText(orderCode)
      setCopiedOrderCode(true)
      setTimeout(() => setCopiedOrderCode(false), 2000)
    } catch (err) {
      console.error("Failed to copy order code:", err)
    }
  }

  // --- SUCCESS VIEW ---
  if (isCompleted) {
    return (
      <div className="bg-neutral-light min-h-screen mx-auto flex justify-center py-12 px-4">
        <section className="section-padding">
          <div className="container-luxury max-w-2xl">
            <div className="bg-white rounded-lg p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="h-12 w-12 text-green-600" /></div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">{checkoutDictionary.success.title}</h1>
              <p className="text-neutral-mid text-lg mb-8">{checkoutDictionary.success.description}</p>
              <div className="bg-neutral-light rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-primary mb-3">{checkoutDictionary.success.orderCode}</h2>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-2xl font-mono font-bold text-primary bg-white px-4 rounded border">{orderCode}</code>
                  <Button variant="outline" size="sm" onClick={copyOrderCode} className="flex items-center gap-2 bg-transparent">
                    {copiedOrderCode ? <><Check className="h-4 w-4" />{checkoutDictionary.success.copied}</> : <><Copy className="h-4 w-4" />{checkoutDictionary.success.copy}</>}
                  </Button>
                </div>
              </div>
              <div className="bg-highlight/10 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-black"><Mail className="h-5 w-5" /><span className="font-medium">{checkoutDictionary.success.emailConfirmation}</span></div>
              </div>
              <div className="text-left bg-neutral-light rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-primary mb-4">{checkoutDictionary.success.summaryTitle}</h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div><span className="font-medium">{item.product.name[locale]}</span><span className="text-neutral-mid mx-2">x{item.quantity}</span></div>
                      <span className="font-medium">{(item.product.price * item.quantity).toFixed(2)} {currency}</span>
                    </div>
                  ))}
                  {appliedPromo && <div className="flex justify-between text-green-600"><span>{checkoutDictionary.summary.promoDiscount} ({appliedPromo.code})</span><span>-{promoDiscount.toFixed(2)} {currency}</span></div>}
                  <div className="border-t border-neutral-mid/20 pt-3">
                    <div className="flex justify-between font-bold text-primary"><span>{checkoutDictionary.summary.total}</span><span>{total.toFixed(2)} {currency}</span></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => (window.location.href = "/track-order")} className="flex items-center gap-2"><ShoppingBag className="h-4 w-4" />{checkoutDictionary.success.trackYourOrder}</Button>
                <Button onClick={() => (window.location.href = "/")} className="bg-primary hover:bg-primary/90 text-white">{checkoutDictionary.success.continueShopping}</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // --- MAIN CHECKOUT VIEW ---
  return (
    <div className="bg-neutral-light min-h-screen">
      <section className="bg-white border-b border-neutral-mid/20 px-4">
        <div className="container-luxury py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => window.history.back()} className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" />{checkoutDictionary.header.backToCart}</Button>
            <div className="h-6 w-px bg-neutral-mid/20" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">{checkoutDictionary.header.title}</h1>
          </div>
        </div>
      </section>

      <section className="section-padding flex justify-center py-12 px-4">
        <div className="container-luxury w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6"><div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div><h2 className="font-serif text-xl font-semibold text-primary">{checkoutDictionary.form.contactInfo}</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.firstName}</label><Input value={customerInfo.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} placeholder={checkoutDictionary.form.firstNamePlaceholder} required /></div>
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.lastName}</label><Input value={customerInfo.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} placeholder={checkoutDictionary.form.lastNamePlaceholder} required /></div>
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.email}</label><Input type="email" value={customerInfo.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder={checkoutDictionary.form.emailPlaceholder} required /></div>
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.phone}</label><Input type="tel" value={customerInfo.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder={checkoutDictionary.form.phonePlaceholder} required /></div>
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.secondaryPhone}</label><Input type="tel" value={customerInfo.secondaryPhone} onChange={(e) => handleInputChange("secondaryPhone", e.target.value)} placeholder={checkoutDictionary.form.secondaryPhonePlaceholder} /></div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6"><div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div><h2 className="font-serif text-xl font-semibold text-primary">{checkoutDictionary.form.shippingAddress}</h2></div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.streetAddress}</label><Input value={customerInfo.address} onChange={(e) => handleInputChange("address", e.target.value)} placeholder={checkoutDictionary.form.streetAddressPlaceholder} required /></div>
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.secondaryStreetAddress}</label><Input value={customerInfo.secondaryAddress} onChange={(e) => handleInputChange("secondaryAddress", e.target.value)} placeholder={checkoutDictionary.form.secondaryStreetAddressPlaceholder} /></div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.city}</label>
                    <Input value={customerInfo.city} onChange={(e) => handleInputChange("city", e.target.value)} placeholder={checkoutDictionary.form.cityPlaceholder} required onFocus={() => setShowCityDropdown(true)} onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)} />
                    {showCityDropdown && <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-mid/20 rounded-md shadow-lg max-h-60 overflow-auto">{egyptianCities.filter(city => city.toLowerCase().includes(customerInfo.city.toLowerCase())).map((city, index) => (<div key={index} className="px-4 py-2 hover:bg-neutral-light cursor-pointer" onMouseDown={() => {handleInputChange("city", city); setShowCityDropdown(false);}}>{city}</div>))}</div>}
                  </div>
                  <div><label className="block text-sm font-medium text-primary mb-2">{checkoutDictionary.form.specialMark}</label><Input value={customerInfo.specialMark} onChange={(e) => handleInputChange("specialMark", e.target.value)} placeholder={checkoutDictionary.form.specialMarkPlaceholder} /><p className="text-xs text-neutral-mid mt-1">{checkoutDictionary.form.specialMarkHelp}</p></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="h-fit">
                <div className="flex items-center gap-3 mb-6"><div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div><h2 className="font-serif text-xl font-semibold text-primary">{checkoutDictionary.promo.title}</h2></div>
                <div className="space-y-4">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Input placeholder={checkoutDictionary.promo.placeholder} value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="flex-1" />
                    {appliedPromo ? <Button onClick={() => { setAppliedPromo(null); setPromoCode(''); }} variant="destructive" size={'sm'} className="!py-4.5 font-semibold">{checkoutDictionary.promo.clear}</Button> : <Button onClick={applyPromoCode} variant="secondary" size={'sm'} className="!py-4.5 font-semibold">{checkoutDictionary.promo.apply}</Button>}
                  </div>
                  {appliedPromo && <div className="mt-2 flex items-center text-green-600 text-sm"><Gift className="h-4 w-4 mx-1" />{checkoutDictionary.promo.applied.replace('{code}', appliedPromo.code).replace('{value}', appliedPromo.type === 'fixed' ? `${appliedPromo.value} ${currency}` : `${appliedPromo.value}%`)}</div>}
                </div>
              </Card>

              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="font-serif text-xl font-semibold text-primary mb-6">{checkoutDictionary.summary.title}</h2>
                  <div className="space-y-4 mb-6">{cartItems.map((item) => (<div key={item.id} className="flex items-start gap-4"><div className="w-16 h-16 bg-neutral-light rounded-lg overflow-hidden flex-shrink-0"><Image src={item.product.image || "/placeholder.svg"} alt={item.product.name[locale]} width={64} height={64} className="w-full h-full object-contain" /></div><div className="flex-1 min-w-0"><h3 className="font-medium text-primary text-sm">{item.product.name[locale]}</h3><div className="flex items-center justify-between mt-2"><span className="text-xs text-neutral-mid">{checkoutDictionary.summary.quantity} {item.quantity}</span><div className="text-right"><span className="font-medium text-primary">{(item.product.price * item.quantity).toFixed(2)} {currency}</span></div></div></div></div>))}</div>
                  <div className="border-t border-neutral-mid/20 pt-4 space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-neutral-mid">{checkoutDictionary.summary.subtotal}</span><span className="font-medium">{subtotal.toFixed(2)} {currency}</span></div>
                    {appliedPromo && <div className="flex justify-between text-sm text-green-600"><span>{checkoutDictionary.summary.promoDiscount}</span><span>-{promoDiscount.toFixed(2)} {currency}</span></div>}
                    <div className="flex justify-between text-sm"><span className="text-neutral-mid">{checkoutDictionary.summary.shipping}</span><span className="font-medium">{shipping.toFixed(2)} {currency}</span></div>
                    <div className="border-t border-neutral-mid/20 pt-3">
                      <div className="flex justify-between"><span className="font-semibold text-primary">{checkoutDictionary.summary.total}</span><span className="font-bold text-primary text-lg">{total.toFixed(2)} {currency}</span></div>
                    </div>
                  </div>
                  <Button size="lg" className="w-full mt-6 bg-primary hover:bg-primary/90 text-white" onClick={handleCompleteOrder} disabled={isLoading}>
                    {isLoading ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{checkoutDictionary.actions.processing}</div> : <><ShoppingBag className="h-5 w-5 mx-2" />{checkoutDictionary.actions.completeOrder.replace('{total}', total.toFixed(2)).replace('{currency}', currency)}</>}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}