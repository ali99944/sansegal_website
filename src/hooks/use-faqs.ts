import { FAQ, FaqCategory } from "../types/faq";
import { useGetQuery } from "./queries-actions";

export function useFaqCategories() {
    return useGetQuery<FaqCategory[]>({
      key: ["faq-categories"],
      url: "faq-categories",
    })
}

export function useFaqs() {
    return useGetQuery<FAQ[]>({
      key: ["faqs"],
      url: "faqs",
    })
}