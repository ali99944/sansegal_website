import React from 'react'
import ProductDetailPage from './view'
import { Metadata } from 'next'
import axiosHttp from '@/lib/axios_client'
import { Product } from '@/src/types/product'
import { AppLocale } from '@/src/types/i18n'
import { getDictionary } from '@/src/i18n/dictionaries'

type Props = {
  params: Promise<{ id: string, locale: AppLocale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await axiosHttp.get(`products/${(await params).id}`)
  const product: Product = response.data
   
  return {
    title: product.name.en,
    description: product.description.en,

    keywords: [
      product.name.en,
      product.name.ar,
      product.description.en,
      product.description.ar,
      ...product.specifications?.map(spec => {
        return spec.value
      }),
    ],

    openGraph: {
      title: product.name.en,
      description: product.description.en,
      siteName: "sansegal",
      images: [
        {
          url: product.image,
          width: 630,
          height: 630,
          alt: product.name.en
        }
      ],
      type: 'website'
    }
  }
}

export default async function Page({ params }: Props) {
  const response = await axiosHttp.get(`products/${(await params).id}`)
  const product: Product = response.data

  const related_product_response = await axiosHttp.get(`products/${product.id}/related`)
  const related_products = related_product_response.data

  const dictionary = await getDictionary((await params).locale)

  return (
    <ProductDetailPage dictionary={dictionary} product={product} related_products={related_products} />
  )
}