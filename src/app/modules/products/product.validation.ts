import { z } from "zod";

// Define Zod Validation schemas for nested objects
const dimensionsValidationSchema = z.object({
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const displayValidationSchema = z.object({
  type: z.string().optional(),
  size: z.string().optional(),
  resolution: z.string().optional(),
  aspectRatio: z.string().optional(),
  pixelDensity: z.string().optional(),
  screenToBodyRatio: z.string().optional(),
  protection: z.string().optional(),
  brightness: z.string().optional(),
  notch: z.string().optional(),
});

const cameraValidationSchema = z.object({
  mainCamera: z.string().optional(),
  frontCamera: z.string().optional(),
});

const batteryValidationSchema = z.object({
  type: z.string().optional(),
  charging: z.string().optional(),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number({
      required_error: "Quantity is a required field and must be a number.",
    })
    .int("Quantity must be an integer.")
    .nonnegative("Quantity must be a non-negative number."),
  inStock: z.boolean({
    required_error: "Stock status is a required field.",
  }),
});

const priceValidationSchema = z
  .number({
    required_error: "Price is a required field and must be a number.",
  })
  .min(0, "Price must be a non-negative number.");

const specificationsValidationSchema = z.object({
  operatingSystem: z.string().optional(),
  userInterface: z.string().optional(),
  cpu: z.string().optional(),
  cpuCores: z.number().optional(),
  display: displayValidationSchema,
  camera: cameraValidationSchema,
  battery: batteryValidationSchema,
  features: z.array(z.string()).optional(),
});

const manufacturerValidationSchema = z.object({
  name: z.string().optional(),
  contact: z.string().optional(),
});

// Define the main Validation schema for the product
const productValidationSchema = z.object({
  name: z.string({ required_error: "Product name is a required field." }),
  description: z.string({
    required_error: "Product description is a required field.",
  }),
  price: priceValidationSchema,
  category: z.string({
    required_error: "Product category is a required field.",
  }),
  tags: z.array(z.string(), {
    required_error: "At least one tag is required.",
  }),
  variants: z.array(
    z.object({
      type: z.string({ required_error: "Variant type is a required field." }),
      value: z.string({ required_error: "Variant value is a required field." }),
    }),
    { required_error: "At least one variant is required." }
  ),
  inventory: inventoryValidationSchema,
  manufacturer: manufacturerValidationSchema.optional(),
  dimensions: dimensionsValidationSchema.optional(),
  weight: z.number().optional(),
  images: z
    .string({ required_error: "Product images are required." })
    .optional(),
  specifications: specificationsValidationSchema.optional(),
  releaseDate: z
    .string({ required_error: "Release date is a required field." })
    .optional(),
  isDeleted: z
    .boolean({ required_error: "Deleted status is required." })
    .default(false),
});

export default productValidationSchema;
