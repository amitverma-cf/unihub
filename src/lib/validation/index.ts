import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "Too Short Name" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const SigninFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const ResetPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ProfileFormSchema = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string(),
});
