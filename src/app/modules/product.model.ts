import { Schema, model } from "mongoose";
import {
  TBattery,
  TCamera,
  TDimensions,
  TDisplay,
  TInventory,
  TManufacturer,
  TProduct,
  TPrice,
  TSpecifications,
  ProductModel,
} from "./products/product.interface";

// Define schemas for nested objects
const DimensionsSchema = new Schema<TDimensions>({
  length: Number,
  width: Number,
  height: Number,
});
const DisplaySchema = new Schema<TDisplay>({
  type: String,
  size: String,
  resolution: String,
  aspectRatio: String,
  pixelDensity: String,
  screenToBodyRatio: String,
  protection: String,
  brightness: String,
  notch: String,
});
const CameraSchema = new Schema<TCamera>({
  mainCamera: String,
  frontCamera: String,
});
const BatterySchema = new Schema<TBattery>({
  type: String,
  charging: String,
});
const InventorySchema = new Schema<TInventory>({
  quantity: Number,
  inStock: Boolean,
});
const PriceSchema = new Schema<TPrice>({
  official: Number,
  unofficial: Number,
});
const SpecificationsSchema = new Schema<TSpecifications>({
  operatingSystem: String,
  userInterface: String,
  cpu: String,
  cpuCores: Number,
  display: DisplaySchema,
  camera: CameraSchema,
  battery: BatterySchema,
  features: [String],
});

// Define the main schema for the phone
const ManufacturerSchema = new Schema<TManufacturer>({
  name: String,
  contact: String,
});
const ProductSchema = new Schema<TProduct>({
  name: String,
  description: String,
  price: PriceSchema,
  category: String,
  tags: [String],
  variants: [{ type: String, value: String }],
  inventory: InventorySchema,
  manufacturer: ManufacturerSchema,
  dimensions: DimensionsSchema,
  weight: Number,
  images: String,
  specifications: SpecificationsSchema,
  releaseDate: Date,
  isDeleted: Boolean,
});

ProductSchema.statics.isProductExists = async function (id: string) {
  const existingProduct = await Product.findOne({ id });
  return existingProduct;
};

// Create and export the model
export const Product = model<TProduct, ProductModel>("Product", ProductSchema);
