import { Schema, model, Model } from "mongoose";

// Define your types
export type TPrice = {
  official: number;
  unofficial?: number;
};
export type TVariants = { type: string; value: string }[];
export type TInventory = {
  quantity: number;
  inStock: "In Stock" | "Out of Stock";
};
export type TManufacturer = { name: string; contact: string };
export type TDimensions = { length: number; width: number; height: number };
export type TDisplay = {
  type: string;
  size: string;
  resolution: string;
  aspectRatio: string;
  pixelDensity: string;
  screenToBodyRatio: string;
  protection: string;
  brightness: string;
  notch: string;
};
export type TCamera = {
  mainCamera: string;
  frontCamera: string;
};
export type TBattery = {
  type: string;
  charging: string;
};
export type TSpecifications = {
  operatingSystem: string;
  userInterface: string;
  cpu: string;
  cpuCores: number;
  display: TDisplay;
  camera: TCamera;
  battery: TBattery;
  features: string[];
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: TPrice;
  category: string;
  tags: string[];
  variants: TVariants; // Note that TVariants is already an array type
  inventory: TInventory;
  manufacturer: TManufacturer;
  dimensions: TDimensions;
  weight: number;
  images?: string;
  specifications: TSpecifications;
  releaseDate?: string;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct | null>;
}

// Example usage
const productVariants: TVariants = [
  { type: "Color", value: "Red" },
  { type: "Size", value: "Medium" },
];

// Example Schema (simplified)
const productSchema = new Schema<TProduct, ProductModel>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    official: { type: Number, required: true },
    unofficial: Number,
  },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: [{ type: Object, required: true }], // Simplified for demonstration
  inventory: {
    quantity: { type: Number, required: true },
    inStock: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      required: true,
    },
  },
  manufacturer: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
  },
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  weight: { type: Number, required: true },
  images: { type: String },
  specifications: {
    operatingSystem: { type: String, required: true },
    userInterface: { type: String, required: true },
    cpu: { type: String, required: true },
    cpuCores: { type: Number, required: true },
    display: { type: Object, required: true },
    camera: { type: Object, required: true },
    battery: { type: Object, required: true },
    features: [{ type: String, required: true }],
  },
  releaseDate: { type: String },
  isDeleted: { type: Boolean, required: true },
});

const Product = model<TProduct, ProductModel>("Product", productSchema);

export default Product;
