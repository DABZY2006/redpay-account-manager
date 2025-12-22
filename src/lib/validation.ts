import { z } from "zod";

// Name validation - alphanumeric with spaces, reasonable length
export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes");

// Email validation
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters");

// Phone validation - Nigerian format
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .regex(
    /^(\+234|0)[789]\d{9}$/,
    "Please enter a valid Nigerian phone number (e.g., +2348012345678 or 08012345678)"
  );

// Password validation - minimum security requirements
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Account number validation - Nigerian bank account (10 digits)
export const accountNumberSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "Account number must be exactly 10 digits");

// Amount validation - positive number with reasonable limits
export const amountSchema = z
  .number()
  .positive("Amount must be greater than 0")
  .max(10000000, "Amount exceeds maximum limit");

// Create account form schema
export const createAccountSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: passwordSchema,
  country: z.string().min(1, "Please select a country"),
});

// Withdraw form schema
export const withdrawSchema = z.object({
  accountNumber: accountNumberSchema,
  accountName: nameSchema,
  bank: z.string().min(1, "Please select a bank"),
  amount: amountSchema,
  rpc: z.string().min(1, "RPC code is required"),
});

// Broadcast form schema
export const broadcastSchema = z.object({
  phone: phoneSchema,
  amount: amountSchema,
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
export type WithdrawFormData = z.infer<typeof withdrawSchema>;
export type BroadcastFormData = z.infer<typeof broadcastSchema>;
