import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(1, "Name is required"), 
  surname: z.string().min(1, "Surname is required"), 
});

export type signUpSchema = z.infer<typeof signUpSchema>;