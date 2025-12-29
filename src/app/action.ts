"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z
    .string()
    .length(10, { message: "Mobile number must be 10 digits." })
    .optional()
    .or(z.literal("")),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    mobile: formData.get("mobile"),
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

  // --- Start of Telegram Integration ---
  const { name, email, message, mobile } = validatedFields.data;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram bot token or chat ID is not configured.");
    return {
      message: "Server configuration error: Could not send message.",
      isSuccess: false,
      errors: null,
    };
  }

  // The message is stripped of HTML tags for plain text display in Telegram.
  const plainTextMessage = message.replace(/<[^>]*>?/gm, "");

  let telegramMessage = `
New Contact Form Submission:
---------------------------
Name: ${name}
Email: ${email}
`;

  if (mobile) {
    telegramMessage += `Mobile: +91 ${mobile}\n`;
  }

  telegramMessage += `---------------------------
Message:
${plainTextMessage}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result.description);
      return {
        message: "There was an error sending your message via Telegram.",
        isSuccess: false,
        errors: null,
      };
    }
  } catch (error) {
    console.error("Failed to send message to Telegram:", error);
    return {
      message: "An unexpected network error occurred.",
      isSuccess: false,
      errors: null,
    };
  }
  // --- End of Telegram Integration ---

  console.log(
    "Contact form submitted and sent to Telegram:",
    validatedFields.data
  );

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
