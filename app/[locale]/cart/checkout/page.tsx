import React from 'react'
import CheckoutPage from './view'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo_fetcher'
import { LocaleProps } from '@/src/types/i18n'
import { getDictionary } from '@/src/i18n/dictionaries'

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('checkout')
}

async function Page({ params }: LocaleProps) {
  const dictionary = await getDictionary((await params).locale)

  return (
    <CheckoutPage dictionary={dictionary} />
  )
}

export default Page