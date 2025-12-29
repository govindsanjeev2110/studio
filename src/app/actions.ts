'use server';

import { z } from 'zod';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { suggestMarketingStrategies } from '@/ai/flows/suggest-marketing-strategies';
import { tailorPromotionalContent } from '@/ai/flows/tailor-promotional-content';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check your input.',
      isSuccess: false,
    };
  }

  // In a real application, you would process the data, e.g., send an email or save to a database.
  console.log('Contact form submitted:', validatedFields.data);

  return {
    message: `Thank you, ${validatedFields.data.name}! Your message has been received.`,
    isSuccess: true,
  };
}

const marketingFormSchema = z.object({
    productName: z.string().min(1, 'Product name is required'),
    productType: z.enum(['fish', 'horticulture']),
    productDetails: z.string().min(1, 'Product details are required'),
    targetAudience: z.string().min(1, 'Target audience is required'),
    keywords: z.string().optional(),
    marketingGoals: z.string().optional(),
  });

export async function generateMarketingContent(prevState: any, formData: FormData) {
    const validatedFields = marketingFormSchema.safeParse({
        productName: formData.get('productName'),
        productType: formData.get('productType'),
        productDetails: formData.get('productDetails'),
        targetAudience: formData.get('targetAudience'),
        keywords: formData.get('keywords'),
        marketingGoals: formData.get('marketingGoals'),
    });

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Error: Please check your input.',
          data: null,
        };
    }
    
    try {
        const { productName, productDetails, targetAudience } = validatedFields.data;

        // For this app, we'll combine the results of two AI flows.
        const descriptionResult = await generateProductDescription({
          ...validatedFields.data,
          keywords: validatedFields.data.keywords || '',
        });

        const strategiesResult = await suggestMarketingStrategies({
            productName,
            productDescription: descriptionResult.productDescription,
            targetAudience,
            marketingGoals: validatedFields.data.marketingGoals || 'Increase sales and brand awareness.',
        });

        return {
            message: 'Successfully generated marketing content!',
            data: {
                description: descriptionResult.productDescription,
                strategies: strategiesResult.suggestedStrategies,
                rationale: strategiesResult.rationale,
            },
            errors: null,
        };
    } catch (error) {
        console.error(error);
        return {
            message: 'An unexpected error occurred while generating content.',
            data: null,
            errors: null,
        };
    }
}
