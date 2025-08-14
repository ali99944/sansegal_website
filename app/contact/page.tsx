import { Metadata } from "next"
import ContactPage from "./contact_page"

export const metadata = (): Metadata => {
    return {
        title: "contact us"
    } as Metadata
}

function Page() {
  return (
    <ContactPage />
  )
}

export default Page