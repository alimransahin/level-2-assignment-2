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
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});
const DisplaySchema = new Schema<TDisplay>({
  type: { type: String, required: true },
  size: { type: String, required: true },
  resolution: { type: String, required: true },
  aspectRatio: { type: String, required: true },
  pixelDensity: { type: String, required: true },
  screenToBodyRatio: { type: String, required: true },
  protection: { type: String, required: true },
  brightness: { type: String, required: true },
  notch: { type: String, required: true },
});
const CameraSchema = new Schema<TCamera>({
  mainCamera: { type: String, required: true },
  frontCamera: { type: String, required: true },
});
const BatterySchema = new Schema<TBattery>({
  type: { type: String, required: true },
  charging: { type: String, required: true },
});
const InventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
});
const PriceSchema = new Schema<TPrice>({
  official: { type: Number, message: "must be a number", required: true },
  unofficial: Number,
});
const SpecificationsSchema = new Schema<TSpecifications>({
  operatingSystem: { type: String, required: true },
  userInterface: { type: String, required: true },
  cpu: { type: String, required: true },
  cpuCores: { type: Number, required: true },
  display: { type: DisplaySchema, required: true },
  camera: { type: CameraSchema, required: true },
  battery: { type: BatterySchema, required: true },
  features: { type: [String], required: true },
});

// Define the main schema for the phone
const ManufacturerSchema = new Schema<TManufacturer>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
});
const ProductSchema = new Schema<TProduct>({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: PriceSchema, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: [
    {
      type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  inventory: { type: InventorySchema, required: true },
  manufacturer: { type: ManufacturerSchema, required: true },
  dimensions: { type: DimensionsSchema, required: true },
  weight: { type: Number, required: true },
  images: { type: String },
  specifications: { type: SpecificationsSchema, required: true },
  releaseDate: String,
  isDeleted: { type: Boolean, required: true, default: false },
});

ProductSchema.statics.isProductExists = async function (id: string) {
  const existingProduct = await Product.findOne({ id });
  return existingProduct;
};

// Create and export the model
export const Product = model<TProduct, ProductModel>("Product", ProductSchema);
