import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(50, {
      message: "First name must be no more than 50 characters long.",
    }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .max(50, { message: "Last name must be no more than 50 characters long." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, {
      message: "Password must be no more than 100 characters long.",
    }),

  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must be at least 6 characters long." })
    .max(100, {
      message: "Confirm password must be no more than 100 characters long.",
    }),
});
formSchema.superRefine(({ password, confirmPassword }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords must match.",
      path: ["confirmPassword"],
    });
  }
});

// Email validation
const emailSchema = z.string().email({ message: "Invalid email address." });

// Combined schema
export const completeSchema = formSchema.extend({
  email: emailSchema,
});
