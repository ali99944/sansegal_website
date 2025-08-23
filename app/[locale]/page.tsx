import { constructMetadata } from "@/lib/seo_fetcher";
import { Metadata } from "next";
import LandingHome from "./landing";
import { getDictionary } from "@/src/i18n/dictionaries";
import { LocaleProps } from "@/src/types/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return await constructMetadata('home')
}

async function Page({ params }: LocaleProps) {  
  const dictionary = await getDictionary((await params).locale)

  console.log((await params).locale);
  

  return (
    <LandingHome dictionary={dictionary} />
  )
}

export default Page