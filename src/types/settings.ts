export interface GeneralSettings {
  app_name: string
  app_url: string
  logo_url?: string
  favicon_url?: string
  support_email: string
  maintenance_mode: boolean
  maintenance_message?: string
  copyright_text?: string
}

export interface ContactSettings {
  public_email: string
  phone_number?: string
  whatsapp_number?: string
  address_line_1?: string
  google_maps_url?: string
  working_hours?: string
}

export interface SocialSettings {
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  pinterest_url?: string
  tiktok_url?: string
}

export interface StoreSettings {
  enable_promo_codes: boolean
  delivery_fee: number
}

export interface AppSettings {
  general: GeneralSettings
  contact: ContactSettings
  social: SocialSettings
  store: StoreSettings
}