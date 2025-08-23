import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import CartPage from './view'


export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('cart')
}


function Page() {
  return (
    <CartPage />
  )
}

export default Page