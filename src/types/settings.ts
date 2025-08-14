export interface Settings {
    general: {
        application_name: string
        application_url: string
        site_logo: string
        site_favicon: string
        maintenance_mode: boolean
        enable_registration: boolean
        enable_newsletter_subscription: boolean
        copyrights: string
    }
    contact: {
        primary_phone: string
        secondary_phone: string
        support_email: string
        street_address: string
        city: string
        state: string
        zip_code: string
        country: string
        google_map_url: string | null
        working_days: string
        opening_time: string
        closing_time: string
    }
    social: {
        facebook: string
        twitter: string
        instagram: string
        youtube: string
        linkedin: string
    }
    localization: {
        default_locale: string
        default_timezone: string
        enable_switcher: boolean
    }
    payment: {
        cod_enabled: boolean
        default_fee: number
        free_shipping_threshold: {
            enabled: boolean
            amount: number
        }
        allow_partial_payment: boolean
    }
    delivery: {
        cod_enabled: boolean
        default_fee: number
        free_shipping_threshold: number
    }
    notification: {
        admin_order_notification_email: string
        customer_order_confirmation_email: boolean
        abandoned_cart_email_enabled: boolean
        enable_sms_notifications: boolean
        sms_provider: string
        sms_order_updates_enabled: boolean
        enable_web_push_notifications: boolean
        push_notification_provider: string
    }
    discount: {
        enable_coupons: boolean
        enable_flash_sales: boolean
        flash_sale_notification: "email"
    }
}
