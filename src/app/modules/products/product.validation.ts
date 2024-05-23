import { z } from "zod";

// Define Zod Validation schemas for nested objects
const dimensionsValidationSchema = z.object({
  length: z
    .number({
      required_error: "Length is a required field and must be a number.",
    })
    .min(0, "Length must be a non-negative number."),
  width: z
    .number({
      required_error: "Width is a required field and must be a number.",
    })
    .min(0, "Width must be a non-negative number."),
  height: z
    .number({
      required_error: "Height is a required field and must be a number.",
    })
    .min(0, "Height must be a non-negative number."),
});

const displayValidationSchema = z.object({
  type: z.string({ required_error: "Display type is a required field." }),
  size: z.string({ required_error: "Display size is a required field." }),
  resolution: z.string({
    required_error: "Display resolution is a required field.",
  }),
  aspectRatio: z.string({
    required_error: "Aspect ratio is a required field.",
  }),
  pixelDensity: z.string({
    required_error: "Pixel density is a required field.",
  }),
  screenToBodyRatio: z.string({
    required_error: "Screen-to-body ratio is a required field.",
  }),
  protection: z.string({
    required_error: "Screen protection is a required field.",
  }),
  brightness: z.string({ required_error: "Brightness is a required field." }),
  notch: z.string({ required_error: "Notch information is a required field." }),
});

const cameraValidationSchema = z.object({
  mainCamera: z.string({ required_error: "Main camera details are required." }),
  frontCamera: z.string({
    required_error: "Front camera details are required.",
  }),
});

const batteryValidationSchema = z.object({
  type: z.string({ required_error: "Battery type is a required field." }),
  charging: z.string({ required_error: "Charging details are required." }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number({
      required_error: "Quantity is a required field and must be a number.",
    })
    .int("Quantity must be an integer.")
    .nonnegative("Quantity must be a non-negative number."),
  inStock: z.enum(["In Stock", "Out of Stock"], {
    required_error: "Stock status is a required field.",
  }),
});

const priceValidationSchema = z.object({
  official: z
    .number({
      required_error:
        "Official price is a required field and must be a number.",
    })
    .min(0, "Official price must be a non-negative number."),
  unofficial: z
    .number({ invalid_type_error: "Unofficial price must be a number." })
    .optional(),
});

const specificationsValidationSchema = z.object({
  operatingSystem: z.string({
    required_error: "Operating system details are required.",
  }),
  userInterface: z.string({
    required_error: "User interface details are required.",
  }),
  cpu: z.string({ required_error: "CPU details are required." }),
  cpuCores: z
    .number({
      required_error:
        "Number of CPU cores is a required field and must be a number.",
    })
    .int("CPU cores must be an integer."),
  display: displayValidationSchema,
  camera: cameraValidationSchema,
  battery: batteryValidationSchema,
  features: z.array(z.string(), {
    required_error: "At least one feature is required.",
  }),
});

const manufacturerValidationSchema = z.object({
  name: z.string({ required_error: "Manufacturer name is a required field." }),
  contact: z.string({
    required_error: "Manufacturer contact details are required.",
  }),
});

// Define the main Validation schema for the product
const productValidationSchema = z.object({
  id: z.string({ required_error: "Product ID is a required field." }),
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
  manufacturer: manufacturerValidationSchema,
  dimensions: dimensionsValidationSchema,
  weight: z
    .number({
      required_error:
        "Product weight is a required field and must be a number.",
    })
    .min(0, "Weight must be a non-negative number."),
  images: z
    .string({ required_error: "Product images are required." })
    .optional(),
  specifications: specificationsValidationSchema,
  releaseDate: z
    .string({ required_error: "Release date is a required field." })
    .optional(),
  isDeleted: z
    .boolean({ required_error: "Deleted status is required." })
    .default(false),
});

export default productValidationSchema;
