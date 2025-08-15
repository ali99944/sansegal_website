// Interface for a single product variant
export interface ProductVariant {
  id: number;
  color: string;
  image: string;
}

// Interface for the main product data
export interface Product {
  id: number;
  name: {
    en: string
    ar: string
  }
  description: {
    en: string
    ar: string
  }
  image: string;
  price: number;
  discount?: number;
  discount_type?: "percentage" | "fixed";
  stock: number;
  status: "active" | "draft";
  specifications: Record<string, string>; // Key-value pairs
  variants: ProductVariant[];
  created_at: string;
}
