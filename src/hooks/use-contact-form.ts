"use client"

import { useMutationAction } from "./queries-actions"

interface ContactFormPayload {
    full_name: string
    email: string
    subject: string
    message: string
}

interface ContactFormResponse {
    message: string
}

export function useContactForm() {
  return useMutationAction<ContactFormResponse, ContactFormPayload>({
    method: 'post',
    key: ["contact-messages"],
    url: "contact-messages",
  })
}