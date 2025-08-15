"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Dialog from "@/components/ui/dialog"
import { MapPin, Phone, Mail, Clock, Send, Check, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useContactForm } from "@/src/hooks/use-contact-form"
import { useNotifications } from "@/src/hooks/use-notification"
import { getApiError } from "@/lib/error_handler"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const contactFormAction = useContactForm()
  const { notify } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await contactFormAction.mutateAsync(formData, {
      onSuccess() {
        setFormData({ full_name: "", email: "", subject: "", message: "" })
        setIsSubmitting(false)
        setShowSuccessDialog(true)
      },

      onError(error) {
        console.log(error);
        notify.error(
          getApiError(error).message
        )
        setIsSubmitting(false)
      },
    })
  }

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="section-padding bg-primary text-white py-20">
        <div className="container-luxury text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding max-w-7xl mx-auto px-4 py-12">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <div className="space-y-6">
            <Card className="h-fit">
              <h2 className="font-serif text-2xl font-semibold text-primary mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-primary mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size={'md'}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>

                          {/* Social Media */}
                          <Card>
                <h2 className="font-serif text-2xl font-semibold text-primary mb-6">Connect With Us</h2>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors">
                      <Facebook className="h-6 w-6" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-primary">Facebook</span>
                  </a>
                  
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-4 rounded-full hover:from-purple-700 hover:to-pink-600 transition-colors">
                      <Instagram className="h-6 w-6" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-primary">Instagram</span>
                  </a>
                  
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                    <div className="bg-blue-400 text-white p-4 rounded-full hover:bg-blue-500 transition-colors">
                      <Twitter className="h-6 w-6" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-primary">Twitter</span>
                  </a>
                  
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                    <div className="bg-blue-700 text-white p-4 rounded-full hover:bg-blue-800 transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-primary">LinkedIn</span>
                  </a>
                </div>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Store Information */}
              <Card>
                <h2 className="font-serif text-2xl font-semibold text-primary mb-6">Visit Our Store</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Address</h3>
                      <p className="text-neutral-mid">
                        123 Luxury Avenue
                        <br />
                        Fashion District
                        <br />
                        Cairo, Egypt 11511
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Phone</h3>
                      <p className="text-neutral-mid">+20 2 1234 5678</p>
                      <p className="text-neutral-mid">+20 100 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Email</h3>
                      <p className="text-neutral-mid">info@sansegal.com</p>
                      <p className="text-neutral-mid">support@sansegal.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Store Hours</h3>
                      <div className="text-neutral-mid space-y-1">
                        <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                        <p>Saturday: 10:00 AM - 6:00 PM</p>
                        <p>Sunday: 12:00 PM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Additional Information */}
              <Card>
                <h2 className="font-serif text-2xl font-semibold text-primary mb-6">Customer Service</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Need Help?</h3>
                    <p className="text-neutral-mid mb-4">
                      Our customer service team is here to assist you with any questions about our products, orders, or
                      services.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-neutral-light rounded-lg">
                      <div className="font-semibold text-primary">Response Time</div>
                      <div className="text-sm text-neutral-mid">Within 24 hours</div>
                    </div>
                    <div className="text-center p-4 bg-neutral-light rounded-lg">
                      <div className="font-semibold text-primary">Languages</div>
                      <div className="text-sm text-neutral-mid">English & Arabic</div>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog isOpen={showSuccessDialog} onClose={closeSuccessDialog} size="sm">
        <div className="text-center py-4 px-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-primary mb-2">Message Sent Successfully!</h3>
          <p className="text-neutral-mid mb-6">
            Thank you for reaching out to us. We&apos;ve received your message and will get back to you within 24 hours.
          </p>
          <Button 
            onClick={closeSuccessDialog} 
            size={'md'}
            className="bg-primary hover:bg-primary/90 text-white px-6"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
