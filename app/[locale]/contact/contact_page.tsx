"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Dialog from "@/components/ui/dialog"
import { MapPin, Phone, Mail, Clock, Send, Check, Facebook, Instagram, Twitter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useContactForm } from "@/src/hooks/use-contact-form"
import { useNotifications } from "@/src/hooks/use-notification"
import { getApiError } from "@/lib/error_handler"
import { useSettings } from "@/src/hooks/use-settings"
import { FaTiktok } from "react-icons/fa6"
import { TranslatedViewProps } from "@/src/types/i18n"

export default function ContactPage({ dictionary }: TranslatedViewProps) {
  const [formData, setFormData] = useState({ full_name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const contactFormAction = useContactForm()
  const { notify } = useNotifications()

  const contactDictionary = dictionary.contact
  
  const { data: settings } = useSettings()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await contactFormAction.mutateAsync(formData, {
      onSuccess: () => {
        setFormData({ full_name: "", email: "", subject: "", message: "" })
        setIsSubmitting(false)
        setShowSuccessDialog(true)
      },
      onError: (error) => {
        notify.error(getApiError(error).message)
        setIsSubmitting(false)
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <section className="section-padding bg-primary text-white py-20">
        <div className="container-luxury text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">{contactDictionary.hero.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">{contactDictionary.hero.subtitle}</p>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto px-4 py-12">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="h-fit">
                <h2 className="font-serif text-2xl font-semibold text-primary mb-6">{contactDictionary.form.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-primary mb-2">{contactDictionary.form.fullName}</label>
                      <Input id="full_name" name="full_name" type="text" required value={formData.full_name} onChange={handleChange} className="w-full" placeholder={contactDictionary.form.fullNamePlaceholder} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">{contactDictionary.form.email}</label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full" placeholder={contactDictionary.form.emailPlaceholder} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">{contactDictionary.form.subject}</label>
                    <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} className="w-full" placeholder={contactDictionary.form.subjectPlaceholder} />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">{contactDictionary.form.message}</label>
                    <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={6} className="w-full resize-none" placeholder={contactDictionary.form.messagePlaceholder} />
                  </div>
                  <Button type="submit" disabled={isSubmitting} size={'md'} className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                    {isSubmitting ? (
                      <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />{contactDictionary.form.sendingButton}</>
                    ) : (
                      <><Send className="h-4 w-4 mx-2" />{contactDictionary.form.sendButton}</>
                    )}
                  </Button>
                </form>
              </Card>

              <Card>
                <h2 className="font-serif text-2xl font-semibold text-primary mb-6">{contactDictionary.social.title}</h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {settings?.social.facebook_url && <a href={settings.social.facebook_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer"><div className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors"><Facebook className="h-6 w-6" /></div><span className="mt-2 text-sm font-medium text-primary">{contactDictionary.social.facebook}</span></a>}
                  {settings?.social.instagram_url && <a href={settings.social.instagram_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer"><div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-4 rounded-full hover:from-purple-700 hover:to-pink-600 transition-colors"><Instagram className="h-6 w-6" /></div><span className="mt-2 text-sm font-medium text-primary">{contactDictionary.social.instagram}</span></a>}
                  {settings?.social.twitter_url && <a href={settings.social.twitter_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer"><div className="bg-blue-400 text-white p-4 rounded-full hover:bg-blue-500 transition-colors"><Twitter className="h-6 w-6" /></div><span className="mt-2 text-sm font-medium text-primary">{contactDictionary.social.twitter}</span></a>}
                  {settings?.social.tiktok_url && <a href={settings.social.tiktok_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer"><div className="bg-gray-800 text-white p-4 rounded-full hover:bg-gray-900 transition-colors"><FaTiktok className="h-6 w-6" /></div><span className="mt-2 text-sm font-medium text-primary">{contactDictionary.social.tiktok}</span></a>}
                </div>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <h2 className="font-serif text-2xl font-semibold text-primary mb-6">{contactDictionary.info.title}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg"><MapPin className="h-5 w-5 text-accent" /></div>
                    <div><h3 className="font-semibold text-primary mb-1">{contactDictionary.info.addressTitle}</h3><p className="text-neutral-mid">{settings?.contact.address_line_1}</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg"><Phone className="h-5 w-5 text-accent" /></div>
                    <div><h3 className="font-semibold text-primary mb-1">{contactDictionary.info.phoneTitle}</h3><p className="text-neutral-mid">{settings?.contact.phone_number}</p><p className="text-neutral-mid">{settings?.contact.whatsapp_number}</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg"><Mail className="h-5 w-5 text-accent" /></div>
                    <div><h3 className="font-semibold text-primary mb-1">{contactDictionary.info.emailTitle}</h3><p className="text-neutral-mid">{settings?.contact.public_email}</p><p className="text-neutral-mid">{settings?.general.support_email}</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg"><Clock className="h-5 w-5 text-accent" /></div>
                    <div><h3 className="font-semibold text-primary mb-1">{contactDictionary.info.hoursTitle}</h3><div className="text-neutral-mid space-y-1"><p>{settings?.contact.working_hours}</p></div></div>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="font-serif text-2xl font-semibold text-primary mb-6">{contactDictionary.service.title}</h2>
                <div className="space-y-4">
                  <div><h3 className="font-semibold text-primary mb-2">{contactDictionary.service.helpTitle}</h3><p className="text-neutral-mid mb-4">{contactDictionary.service.helpDescription}</p></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Dialog isOpen={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} size="sm">
        <div className="text-center py-4 px-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4"><Check className="h-8 w-8 text-green-600" /></div>
          <h3 className="font-serif text-xl font-semibold text-primary mb-2">{contactDictionary.successDialog.title}</h3>
          <p className="text-neutral-mid mb-6">{contactDictionary.successDialog.description}</p>
          <Button onClick={() => setShowSuccessDialog(false)} size={'md'} className="bg-primary hover:bg-primary/90 text-white px-6">{contactDictionary.successDialog.closeButton}</Button>
        </div>
      </Dialog>
    </div>
  )
}