"use client"

import { useGetQuery } from "./queries-actions"
import type { AppSettings } from "../types/settings"

export function useSettings() {
  return useGetQuery<AppSettings>({
    key: ["settings"],
    url: "settings",
  })
}