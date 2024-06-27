import { Schema, model, Model } from "mongoose";

export type TVariants = { type: string; value: string }[];
export type TInventory = {
  quantity: number;
  inStock: boolean;
};
export type TManufacturer = { name?: string; contact?: string };
export type TDimensions = { length?: number; width?: number; height?: number };
export type TDisplay = {
  type?: string;
  size?: string;
  resolution?: string;
  aspectRatio?: string;
  pixelDensity?: string;
  screenToBodyRatio?: string;
  protection?: string;
  brightness?: string;
  notch?: string;
};
export type TCamera = {
  mainCamera?: string;
  frontCamera?: string;
};
export type TBattery = {
  type?: string;
  charging?: string;
};
export type TSpecifications = {
  operatingSystem?: string;
  userInterface?: string;
  cpu?: string;
  cpuCores?: number;
  display?: TDisplay;
  camera?: TCamera;
  battery?: TBattery;
  features?: string[];
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants; // Note that TVariants is already an array type
  inventory: TInventory;
  manufacturer?: TManufacturer;
  dimensions?: TDimensions;
  weight?: number;
  images?: string;
  specifications?: TSpecifications;
  releaseDate?: string;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(name: string): Promise<TProduct | null>;
}

const productSchema = new Schema<TProduct, ProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: [{ type: Object, required: true }],
  inventory: {
    quantity: { type: Number, required: true },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  manufacturer: {
    name: { type: String },
    contact: { type: String },
  },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  weight: { type: Number },
  images: { type: String },
  specifications: {
    operatingSystem: { type: String },
    userInterface: { type: String },
    cpu: { type: String },
    cpuCores: { type: Number },
    display: { type: Object },
    camera: { type: Object },
    battery: { type: Object },
    features: [{ type: String }],
  },
  releaseDate: { type: String },
  isDeleted: { type: Boolean, required: true },
});

const Product = model<TProduct, ProductModel>("Product", productSchema);

export default Product;
