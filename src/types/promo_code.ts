export interface PromoCode {
    id: number
    code: string
    type: "percentage" | "fixed"
    value: number
    max_uses?: number | null
    uses: number
    expires_at?: string | null
    is_active: boolean
    created_at: string
}