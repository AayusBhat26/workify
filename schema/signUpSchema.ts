import {z} from "zod";

export const signUpSchema = z.object({
    email: z.string().email("Valid email required"), 
    password: z.string().min(6, "Password must be at least 6 characters"), 
    useranme: z.string().min(3, "Username must be at least 3 characters"),
});
export type signUpSchema = z.infer<typeof signUpSchema>;