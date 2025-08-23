import { Metadata } from "next"
import ContactPage from "./contact_page"
import { constructMetadata } from "@/lib/seo_fetcher"

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('contact')
}

function Page() {
  return (
    <ContactPage />
  )
}

export default Page