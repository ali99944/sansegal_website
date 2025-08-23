import React from 'react'
import TrackOrderPage from './view'
import { constructMetadata } from '@/lib/seo_fetcher'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('track-order')
}

function Page() {
  return (
    <TrackOrderPage />
  )
}

export default Page