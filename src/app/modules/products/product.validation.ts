import { z } from "zod";

// Define Zod Validation schemas for nested objects
const dimensionsValidationSchema = z.object({
  length: z.number({ required_error: "Length is required" }),
  width: z.number({ required_error: "Width is required" }),
  height: z.number({ required_error: "Height is required" }),
});

const displayValidationSchema = z.object({
  type: z.string({ required_error: "Display type is required" }),
  size: z.string({ required_error: "Display size is required" }),
  resolution: z.string({ required_error: "Display resolution is required" }),
  aspectRatio: z.string({ required_error: "Aspect ratio is required" }),
  pixelDensity: z.string({ required_error: "Pixel density is required" }),
  screenToBodyRatio: z.string({
    required_error: "Screen-to-body ratio is required",
  }),
  protection: z.string({ required_error: "Protection is required" }),
  brightness: z.string({ required_error: "Brightness is required" }),
  notch: z.string({ required_error: "Notch is required" }),
});

const cameraValidationSchema = z.object({
  mainCamera: z.string({ required_error: "Main camera is required" }),
  frontCamera: z.string({ required_error: "Front camera is required" }),
});

const batteryValidationSchema = z.object({
  type: z.string({ required_error: "Battery type is required" }),
  charging: z.string({ required_error: "Charging details are required" }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number({
      required_error: "Quantity is required",
    })
    .int()
    .nonnegative(),
  inStock: z.enum(["In Stock", "Out of Stock"]),
});

const priceValidationSchema = z.object({
  official: z.number({ required_error: "Official price is required" }),
  unofficial: z.number().optional(),
});

const specificationsValidationSchema = z.object({
  operatingSystem: z.string({ required_error: "Operating system is required" }),
  userInterface: z.string({ required_error: "User interface is required" }),
  cpu: z.string({ required_error: "CPU is required" }),
  cpuCores: z.number({ required_error: "CPU cores count is required" }),
  display: displayValidationSchema,
  camera: cameraValidationSchema,
  battery: batteryValidationSchema,
  features: z.array(z.string(), { required_error: "Features are required" }),
});

const manufacturerValidationSchema = z.object({
  name: z.string({ required_error: "Manufacturer name is required" }),
  contact: z.string({ required_error: "Manufacturer contact is required" }),
});

// Define the main Validation schema for the product
const productValidationSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
  name: z.string({ required_error: "Name is required" }),
  description: z.string({ required_error: "Description is required" }),
  price: priceValidationSchema,
  category: z.string({ required_error: "Category is required" }),
  tags: z.array(z.string(), { required_error: "Tags are required" }),
  variants: z.array(
    z.object({
      type: z.string({ required_error: "Variant type is required" }),
      value: z.string({ required_error: "Variant value is required" }),
    }),
    { required_error: "Variants are required" }
  ),
  inventory: inventoryValidationSchema,
  manufacturer: manufacturerValidationSchema,
  dimensions: dimensionsValidationSchema,
  weight: z.number({ required_error: "Weight is required" }),
  images: z.string(),
  specifications: specificationsValidationSchema,
  releaseDate: z.string({ required_error: "Release date is required" }),
  isDeleted: z.boolean().default(false),
});

export default productValidationSchema;
