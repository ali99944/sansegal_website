import React from 'react'
import CheckoutPage from './view'
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo_fetcher'

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('checkout')
}

function Page() {
  return (
    <CheckoutPage />
  )
}

export default Page