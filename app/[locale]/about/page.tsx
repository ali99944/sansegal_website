import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import AboutPage from './view'

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('about')
}

function Page() {
  return (
    <AboutPage />
  )
}

export default Page