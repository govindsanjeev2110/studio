'use server';

/**
 * @fileOverview An AI agent to suggest marketing strategies for products.
 *
 * - suggestMarketingStrategies - A function that provides marketing strategy suggestions.
 * - SuggestMarketingStrategiesInput - The input type for the suggestMarketingStrategies function.
 * - SuggestMarketingStrategiesOutput - The return type for the suggestMarketingStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMarketingStrategiesInputSchema = z.object({
  productName: z.string().describe('The name of the product to market.'),
  productDescription: z.string().describe('A detailed description of the product, including its benefits and target audience.'),
  targetAudience: z.string().describe('The intended target audience for the product.'),
  marketingGoals: z.string().describe('The specific marketing goals, such as increasing sales, brand awareness, etc.'),
});
export type SuggestMarketingStrategiesInput = z.infer<typeof SuggestMarketingStrategiesInputSchema>;

const SuggestMarketingStrategiesOutputSchema = z.object({
  suggestedStrategies: z.array(z.string()).describe('A list of suggested marketing strategies tailored to the product and target audience.'),
  rationale: z.string().describe('The AI rationale for suggesting each strategy.'),
});
export type SuggestMarketingStrategiesOutput = z.infer<typeof SuggestMarketingStrategiesOutputSchema>;

export async function suggestMarketingStrategies(input: SuggestMarketingStrategiesInput): Promise<SuggestMarketingStrategiesOutput> {
  return suggestMarketingStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMarketingStrategiesPrompt',
  input: {schema: SuggestMarketingStrategiesInputSchema},
  output: {schema: SuggestMarketingStrategiesOutputSchema},
  prompt: `You are an expert marketing consultant specializing in developing effective strategies for promoting products to specific target audiences.

  Based on the following product information, target audience, and marketing goals, suggest a list of marketing strategies and explain the rationale behind each suggestion.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Target Audience: {{{targetAudience}}}
  Marketing Goals: {{{marketingGoals}}}

  Provide the output as a list of suggested strategies and a rationale for each. Focus on innovative and practical strategies that can be implemented effectively.
  `,
});

const suggestMarketingStrategiesFlow = ai.defineFlow(
  {
    name: 'suggestMarketingStrategiesFlow',
    inputSchema: SuggestMarketingStrategiesInputSchema,
    outputSchema: SuggestMarketingStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
