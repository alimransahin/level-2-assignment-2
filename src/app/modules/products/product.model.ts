import { Schema, model } from "mongoose";
import {
  TBattery,
  TCamera,
  TDimensions,
  TDisplay,
  TInventory,
  TManufacturer,
  TProduct,
  TSpecifications,
  ProductModel,
} from "./product.interface";

// Define schemas for nested objects
const DimensionsSchema = new Schema<TDimensions>({
  length: { type: Number },
  width: { type: Number },
  height: { type: Number },
});
const DisplaySchema = new Schema<TDisplay>({
  type: { type: String },
  size: { type: String },
  resolution: { type: String },
  aspectRatio: { type: String },
  pixelDensity: { type: String },
  screenToBodyRatio: { type: String },
  protection: { type: String },
  brightness: { type: String },
  notch: { type: String },
});
const CameraSchema = new Schema<TCamera>({
  mainCamera: { type: String },
  frontCamera: { type: String },
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
    type: Boolean,
    required: true,
  },
});

const SpecificationsSchema = new Schema<TSpecifications>({
  operatingSystem: { type: String, required: true },
  userInterface: { type: String, required: true },
  cpu: { type: String, required: true },
  cpuCores: { type: Number, required: true },
  display: { type: DisplaySchema },
  camera: { type: CameraSchema, required: true },
  battery: { type: BatterySchema, required: true },
  features: { type: [String], required: true },
});

// Define the main schema for the phone
const ManufacturerSchema = new Schema<TManufacturer>({
  name: { type: String },
  contact: { type: String },
});
const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, message: "must be a number", required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: [
    {
      type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  inventory: { type: InventorySchema, required: true },
  manufacturer: { type: ManufacturerSchema },
  dimensions: { type: DimensionsSchema },
  weight: { type: Number },
  images: { type: String },
  specifications: { type: SpecificationsSchema },
  releaseDate: String,
  isDeleted: { type: Boolean, required: true, default: false },
});

ProductSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
ProductSchema.statics.isProductExists = async function (name: string) {
  const existingProduct = await Product.findOne({ name });
  return existingProduct;
};
// Create and export the model
export const Product = model<TProduct, ProductModel>("Product", ProductSchema);
