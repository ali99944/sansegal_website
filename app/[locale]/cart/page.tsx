import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'
import React from 'react'
import CartPage from './view'
import { LocaleProps } from '@/src/types/i18n'
import { getDictionary } from '@/src/i18n/dictionaries'


export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('cart')
}


async function Page({ params }: LocaleProps) {
  const dictionary = await getDictionary((await params).locale)

  return (
    <CartPage dictionary={dictionary}/>
  )
}

export default Page