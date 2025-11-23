"use client"
import { useGetQuery } from "./queries-actions"
import type { Policy } from "../types/policy"

export function usePolicies() {
  return useGetQuery<Policy[]>({ key: ["policies"], url: "policies" })
}

export function usePolicy(key: string) {
    return useGetQuery<Policy>({ 
        key: ["policies", key], 
        url: `policies/by-slug/${key}`, 
        options: { enabled: !!key } 
    })
}
