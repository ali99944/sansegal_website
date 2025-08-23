import { Dictionary } from "./dictionary"

export type LocaleParams = {
    params: Promise<{
        locale: AppLocale
    }>
}

export type TranslatedViewProps = {
    dictionary: Dictionary
}

export type AppLocale = 'ar' | 'en'