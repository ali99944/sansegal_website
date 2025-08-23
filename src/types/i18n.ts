import { Dictionary } from "./dictionary"

export type LocaleProps = {
    params: Promise<{
        locale: AppLocale
    }>
}

export type TranslatedViewProps = {
    dictionary: Dictionary
}

export type AppLocale = 'ar' | 'en'