import { z } from "zod";

const addressSchema = z.object({
  street: z.string().refine((val) => val.trim() !== "", {
    message: "Street is required",
  }),
  city: z.string().refine((val) => val.trim() !== "", {
    message: "City is required",
  }),
  country: z.string().refine((val) => val.trim() !== "", {
    message: "Country is required",
  }),
});

export const uservalditaionSchema = z.object({
  userId: z.number(),
  username: z.string().refine((val) => val.trim() !== "", {
    message: "Username is required",
  }),
  password: z.string().refine((val) => val.trim() !== "", {
    message: "Password is required",
  }),
  fullName: z.object({
    firstName: z.string().refine((val) => val.trim() !== "", {
      message: "First name is required",
    }),
    lastName: z.string().refine((val) => val.trim() !== "", {
      message: "Last name is required",
    }),
  }),
  age: z.number().refine((val) => val > 0, {
    message: "Age must be greater than 0",
  }),
  email: z
    .string()
    .email()
    .refine((val) => val.trim() !== "", {
      message: "Email is required",
    }),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: addressSchema,
});
export const orderValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

export default uservalditaionSchema;
