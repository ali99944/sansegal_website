"use client"
import { PromoCode } from "../types/promo_code"
import { useGetQuery, useMutationAction } from "./queries-actions"

export function usePromoCodes() {
  return useGetQuery<PromoCode[]>({ key: ["promo-codes"], url: "promo-codes" })
}

interface ApplyPromoCodePayload {
  code: string
}

export function usePromoCode() {
  return useMutationAction<PromoCode, ApplyPromoCodePayload>({
    method: 'post',
    url: `promo-codes/redeem-code`,
    key: ["promo-codes", 'redeem']
  })
}