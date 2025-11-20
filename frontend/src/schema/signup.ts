import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long !" })
    .max(20, { message: "Username must be at most 20 characters long !" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores !",
    }),

  email: z.string().email({ message: "Invalid email address !" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long !" })
    .max(20, { message: "Password must be less than 20 characters !" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter !",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter !",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number !" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character !",
    }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
