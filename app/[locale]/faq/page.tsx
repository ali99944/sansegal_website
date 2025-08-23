import React from 'react'
import FAQPage from './view'
import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('faq')
}

function Page() {
  return (
    <FAQPage />
  )
}

export default Page