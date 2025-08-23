import { Metadata } from "next"
import ContactPage from "./contact_page"
import { constructMetadata } from "@/lib/seo_fetcher"
import { LocaleProps } from "@/src/types/i18n"
import { getDictionary } from "@/src/i18n/dictionaries"

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('contact')
}

async function Page({ params }: LocaleProps) {
  const dictionary = await getDictionary((await params).locale)

  return (
    <ContactPage dictionary={dictionary} />
  )
}

export default Page