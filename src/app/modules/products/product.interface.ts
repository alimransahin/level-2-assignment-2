import { Model } from "mongoose";

export type TPrice = {
  official: number;
  unofficial?: number;
};
export type TVariants = { type: string; value: string }[];
export type TInventory = { quantity: number; inStock: boolean };
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
  name: string;
  description: string;
  price: TPrice;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
  manufacturer: TManufacturer;
  dimensions: TDimensions;
  weight: number;
  images: string;
  specifications: TSpecifications;
  releaseDate: string;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct | null>;
}
