export interface FaqCategory {
    id: number
    name: string
    position: number
}


export interface FAQ {
    id: number
    question: string
    answer: string
    position: string

    faq_category_id: number
}