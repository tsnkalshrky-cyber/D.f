'use server';
/**
 * @fileOverview A Genkit flow for generating personalized reminder messages for overdue balances.
 *
 * - generateSmartReminder - A function that generates a reminder message.
 * - SmartReminderInput - The input type for the generateSmartReminder function.
 * - SmartReminderOutput - The return type for the generateSmartReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReminderInputSchema = z.object({
  customerName: z.string().describe('The name of the customer to whom the reminder is addressed.'),
  amountDue: z.number().describe('The overdue balance amount.'),
  currency: z.string().describe('The currency of the overdue amount (e.g., "Yemeni Rial", "US Dollar").'),
  dueDate: z.string().optional().describe('The original due date of the balance, if available.'),
  businessName: z.string().describe('The name of the business sending the reminder.'),
  contactInfo: z.string().describe('Business contact information (e.g., phone number, WhatsApp link) for the customer to reply.'),
});
export type SmartReminderInput = z.infer<typeof SmartReminderInputSchema>;

const SmartReminderOutputSchema = z.object({
  reminderMessage: z.string().describe('The generated personalized reminder message for WhatsApp or SMS.'),
});
export type SmartReminderOutput = z.infer<typeof SmartReminderOutputSchema>;

const smartReminderPrompt = ai.definePrompt({
  name: 'smartReminderPrompt',
  input: {schema: SmartReminderInputSchema},
  output: {schema: SmartReminderOutputSchema},
  prompt: `You are a helpful assistant specialized in drafting polite, concise, and effective reminder messages for overdue payments.

The message should be suitable for WhatsApp or SMS, and should:
- Be personalized for the customer.
- Clearly state the overdue amount and currency.
- If a due date is provided, politely reference the original due date.
- Politely request the customer to settle the balance or contact the business.
- Be signed off with the business name and provide contact information.

Generate the reminder message based on the following details:

Customer Name: {{{customerName}}}
Amount Due: {{{amountDue}}} {{{currency}}}
Business Name: {{{businessName}}}
Contact Info: {{{contactInfo}}}
{{#if dueDate}}Original Due Date: {{{dueDate}}}{{/if}}

Reminder Message:`,
});

const smartReminderGeneratorFlow = ai.defineFlow(
  {
    name: 'smartReminderGeneratorFlow',
    inputSchema: SmartReminderInputSchema,
    outputSchema: SmartReminderOutputSchema,
  },
  async input => {
    const {output} = await smartReminderPrompt(input);
    return output!;
  }
);

export async function generateSmartReminder(input: SmartReminderInput): Promise<SmartReminderOutput> {
  return smartReminderGeneratorFlow(input);
}
