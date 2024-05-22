import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20)
    .min(1)
    .trim()
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(20)
    .min(1)
    .refine((value) => /^[a-zA-Z]*$/.test(value)),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const studentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(["Male", "Female"]),
  dateOfBirth: z.string().optional(),
  email: z.string().min(1).email(),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
