'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating tailored promotional content.
 *
 * The flow takes product details and target audience information as input and uses AI to create
 * engaging and relevant marketing materials.
 *
 * @exports tailorPromotionalContent - The main function to trigger the flow.
 * @exports TailorPromotionalContentInput - The input type for the tailorPromotionalContent function.
 * @exports TailorPromotionalContentOutput - The output type for the tailorPromotionalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorPromotionalContentInputSchema = z.object({
  productName: z.string().describe('The name of the product to promote.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  targetAudience: z.string().describe('Description of the target audience for the promotion.'),
  marketingGoals: z.string().describe('The marketing goals for the product promotion.'),
});

export type TailorPromotionalContentInput = z.infer<typeof TailorPromotionalContentInputSchema>;

const TailorPromotionalContentOutputSchema = z.object({
  promotionalContent: z.string().describe('The generated promotional content.'),
  suggestedStrategies: z.string().describe('Suggested marketing strategies to maximize sales.'),
});

export type TailorPromotionalContentOutput = z.infer<typeof TailorPromotionalContentOutputSchema>;

export async function tailorPromotionalContent(input: TailorPromotionalContentInput): Promise<TailorPromotionalContentOutput> {
  return tailorPromotionalContentFlow(input);
}

const tailorPromotionalContentPrompt = ai.definePrompt({
  name: 'tailorPromotionalContentPrompt',
  input: {schema: TailorPromotionalContentInputSchema},
  output: {schema: TailorPromotionalContentOutputSchema},
  prompt: `You are an AI marketing assistant specializing in creating engaging promotional content.
  Based on the product details, target audience, and marketing goals, generate tailored promotional content and suggest effective marketing strategies.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Target Audience: {{{targetAudience}}}
  Marketing Goals: {{{marketingGoals}}}

  Generate promotional content that is suitable for the target audience and helps achieve the marketing goals. Also, provide a few suggested marketing strategies to maximize sales.
`,
});

const tailorPromotionalContentFlow = ai.defineFlow(
  {
    name: 'tailorPromotionalContentFlow',
    inputSchema: TailorPromotionalContentInputSchema,
    outputSchema: TailorPromotionalContentOutputSchema,
  },
  async input => {
    const {output} = await tailorPromotionalContentPrompt(input);
    return output!;
  }
);
