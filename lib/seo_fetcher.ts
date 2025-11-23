'use server'

import { Seo } from "@/src/types/seo"
import { Metadata } from "next"
import axiosHttp from "./axios_client"

const defaultSeo: Seo = {
    id: 0,
    key: "",
    title: "",
    description: "",
    keywords: "",
    canonical_url: "",
    og_title: "",
    og_description: "",
    og_image: "",
    og_type: ""
}

type SeoKey = 'home' | 'about' | 'contact' | 'cart' | 'checkout' | 'faq' | 'track-order'

export const getSeoData = async (page_key: SeoKey): Promise<Seo> => {
    try {
        const res = await axiosHttp.get(`seo/by-key/${page_key}`)
        return res.data as Seo
    } catch (error) {
        console.error(error)
        return defaultSeo
    }
}


export const constructMetadata = async (page_key: SeoKey): Promise<Metadata> => {
    const seo = await getSeoData(page_key)
    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        openGraph: {
            title: seo.og_title,
            description: seo.og_description,
            images: [
                {
                    url: seo.og_image,
                },
            ]
        }
    }
}
