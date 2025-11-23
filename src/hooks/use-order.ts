"use client"

import { useMutationAction } from "./queries-actions"
import { CreateOrderPayload, Order, TrackOrderPayload } from "../types/order"

export function useTrackOrder() {
  return useMutationAction<TrackOrderPayload>({
    key: ["track-order"],
    url: `track-order`,
    method: 'post'
  })
}

export function useCreateOrder() {
  return useMutationAction<Order, CreateOrderPayload>({
    key: ["orders"],
    url: `orders`,
    method: 'post'
  })
}