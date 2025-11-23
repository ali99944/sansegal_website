export interface Testimonial {
    id: number
    name: string
    location: string | null
    review: string
    product: {
      id: number | null
      name: string
      isActive: boolean
    }
}