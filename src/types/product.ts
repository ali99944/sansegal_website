// Interface for a single product variant
export interface ProductVariant {
  id: number;
  color: string;
  image: string;
}

export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductSpecification {
  id: number;
  key: string;
  value: string;
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
  images: ProductImage[]
  price: number;
  discount?: number;
  discount_type?: "percentage" | "fixed";
  stock: number;
  status: "active" | "draft";
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  created_at: string;
}
