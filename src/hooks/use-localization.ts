"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { AppLocale } from "../types/i18n";
import AppConstants from "../constants/app_constants";

export function useLocalization() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [locale, setLocale] = useState<AppLocale>(currentLocale as AppLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setLocale(currentLocale as AppLocale);
    }
  }, [currentLocale, locale]);

  function changeLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) return;

    // Split current path and remove the first segment (locale)
    const segments = pathname.split("/").filter(Boolean); // remove empty parts
    segments[0] = nextLocale;

    const newPath = `${AppConstants.store_url}/${segments.join("/")}`;

    router.replace(newPath);
    router.refresh();
    setLocale(nextLocale);
  }

  return {
    locale,
    changeLocale,
  };
}
