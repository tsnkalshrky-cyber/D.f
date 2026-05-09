'use server';
/**
 * @fileOverview An AI agent that extracts key transaction details from a receipt image.
 *
 * - suggestReceiptTransaction - A function that processes a receipt image and suggests transaction details.
 * - ReceiptTransactionSuggesterInput - The input type for the suggestReceiptTransaction function.
 * - ReceiptTransactionSuggesterOutput - The return type for the suggestReceiptTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReceiptTransactionSuggesterInputSchema = z.object({
  receiptImage: z
    .string()
    .describe(
      "A photo of a paper receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ReceiptTransactionSuggesterInput = z.infer<
  typeof ReceiptTransactionSuggesterInputSchema
>;

const ReceiptTransactionSuggesterOutputSchema = z.object({
  vendor: z.string().describe('The name of the vendor from the receipt.'),
  amount: z
    .number()
    .describe(
      'The total transaction amount from the receipt, parsed as a number.'
    ),
  currency: z
    .string()
    .describe('The currency of the transaction (e.g., "USD", "SAR", "YER").'),
  date: z
    .string()
    .describe('The date of the transaction from the receipt in YYYY-MM-DD format.'),
  category: z
    .string()
    .describe('A suggested category for the transaction (e.g., "Groceries", "Dining", "Office Supplies", "Transportation").'),
});
export type ReceiptTransactionSuggesterOutput = z.infer<
  typeof ReceiptTransactionSuggesterOutputSchema
>;

export async function suggestReceiptTransaction(
  input: ReceiptTransactionSuggesterInput
): Promise<ReceiptTransactionSuggesterOutput> {
  return receiptTransactionSuggesterFlow(input);
}

const receiptTransactionSuggesterPrompt = ai.definePrompt({
  name: 'receiptTransactionSuggesterPrompt',
  input: {schema: ReceiptTransactionSuggesterInputSchema},
  output: {schema: ReceiptTransactionSuggesterOutputSchema},
  model: 'googleai/gemini-2.5-flash-image', // Using a multi-modal model for image input
  prompt: `You are an AI assistant specialized in extracting financial transaction details from receipt images.
Your task is to accurately parse the provided receipt image and extract the following information:
- The name of the vendor.
- The total transaction amount. Ensure this is a numeric value.
- The currency of the transaction.
- The date of the transaction in YYYY-MM-DD format.
- A suitable category for the transaction.

Here is the receipt image:
{{media url=receiptImage}}

Please provide the extracted information in a JSON object that strictly adheres to the provided output schema.`,
});

const receiptTransactionSuggesterFlow = ai.defineFlow(
  {
    name: 'receiptTransactionSuggesterFlow',
    inputSchema: ReceiptTransactionSuggesterInputSchema,
    outputSchema: ReceiptTransactionSuggesterOutputSchema,
  },
  async (input) => {
    const {output} = await receiptTransactionSuggesterPrompt(input);
    if (!output) {
      throw new Error('Failed to extract transaction details from receipt.');
    }
    return output;
  }
);
