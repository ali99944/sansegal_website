"use client"

import { useGetQuery } from "./queries-actions"
import type { Product } from "../types/product"

export function useProducts() {
  return useGetQuery<Product[]>({
    key: ["products"],
    url: "products",
  })
}

export function useProduct(product_id: number | undefined | null) {
  return useGetQuery<Product>({
    key: ["products", product_id],
    url: `products/${product_id}`,
  })
}