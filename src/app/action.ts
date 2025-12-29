"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error: Please check your input.",
      isSuccess: false,
    };
  }

  // In a real application, you would process the data, e.g., send an email or save to a database.
  console.log("Contact form submitted:", validatedFields.data);

  return {
    message: `Thank you, ${validatedFields.data.name}! Your message has been received.`,
    isSuccess: true,
    errors: null,
  };
}

const marketingFormSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productType: z.enum(["fish", "horticulture"]),
  productDetails: z.string().min(1, "Product details are required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  keywords: z.string().optional(),
  marketingGoals: z.string().optional(),
});
