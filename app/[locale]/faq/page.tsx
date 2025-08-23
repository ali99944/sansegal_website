import React from 'react'
import FAQPage from './view'
import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import { LocaleProps } from '@/src/types/i18n'
import { getDictionary } from '@/src/i18n/dictionaries'

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('faq')
}

async function Page({ params }: LocaleProps) {
  const dictionary = await getDictionary((await params).locale)

  return (
    <FAQPage dictionary={dictionary}/>
  )
}

export default Page