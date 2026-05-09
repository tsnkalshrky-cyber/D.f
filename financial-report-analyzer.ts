'use server';
/**
 * @fileOverview This file implements a Genkit flow for analyzing financial reports.
 * It provides AI-generated summaries and actionable insights on debt movement and currency distribution.
 *
 * - analyzeFinancialReport - A function that triggers the financial report analysis.
 * - FinancialReportInput - The input type for the analyzeFinancialReport function.
 * - FinancialReportOutput - The return type for the analyzeFinancialReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CurrencyBalanceSchema = z.object({
  currency: z.string().describe('The currency code (e.g., "YER", "SAR", "USD").'),
  totalCredit: z.number().describe('Total credit amount in this currency.'),
  totalDebit: z.number().describe('Total debit amount in this currency.'),
  netBalance: z.number().describe('Net balance (credit - debit) in this currency.'),
});

const MonthlyDebtMovementSchema = z.object({
  month: z.string().describe('Month of the data (e.g., "January").'),
  year: z.number().describe('Year of the data (e.g., 2023).'),
  totalCredit: z.number().describe('Total credit transactions for the month.'),
  totalDebit: z.number().describe('Total debit transactions for the month.'),
  netChange: z.number().describe('Net change in financial position for the month (credit - debit).'),
});

const FinancialReportInputSchema = z.object({
  businessName: z.string().describe('The name of the business for which the report is generated.'),
  currencyBalances: z.array(CurrencyBalanceSchema).describe('Current financial balances broken down by currency.'),
  monthlyDebtMovements: z.array(MonthlyDebtMovementSchema).describe('Historical monthly data showing debt movement trends.'),
  additionalReportContext: z.string().optional().describe('Any additional textual context or observations from the financial report.'),
});
export type FinancialReportInput = z.infer<typeof FinancialReportInputSchema>;

const FinancialReportOutputSchema = z.object({
  executiveSummary: z.string().describe('A concise executive summary of the overall financial status.'),
  debtTrendsAnalysis: z.string().describe('Analysis of key trends observed in debt movement over the reported periods.'),
  currencyDistributionAnalysis: z.string().describe('Analysis of how financial assets/liabilities are distributed across different currencies.'),
  actionableRecommendations: z.string().describe('Specific, data-driven recommendations to improve financial health or address identified issues.'),
  keyMetrics: z.object({
    overallNetBalance: z.number().describe('The total net balance across all currencies (assuming a unified base currency or for comparative purposes).'),
    mostVolatileCurrency: z.string().optional().describe('The currency that experienced the most significant fluctuations.'),
    monthWithHighestDebtIncrease: z.string().optional().describe('The month (and year) with the highest increase in net debit.'),
  }).describe('Key quantitative metrics extracted or derived from the report data.'),
});
export type FinancialReportOutput = z.infer<typeof FinancialReportOutputSchema>;

export async function analyzeFinancialReport(input: FinancialReportInput): Promise<FinancialReportOutput> {
  return financialReportAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialReportAnalyzerPrompt',
  input: { schema: FinancialReportInputSchema },
  output: { schema: FinancialReportOutputSchema },
  prompt: `You are an expert financial analyst. Your task is to analyze the provided financial report data for the business "{{{businessName}}}" and generate a comprehensive summary, identify key trends, and provide actionable recommendations.

Focus on:
1.  **Executive Summary**: A high-level overview of the financial status.
2.  **Debt Trends Analysis**: Analyze the 'monthlyDebtMovements' to identify patterns, periods of significant increase or decrease in debt, and overall trajectory.
3.  **Currency Distribution Analysis**: Analyze 'currencyBalances' to understand the distribution of funds across different currencies and any implications.
4.  **Actionable Recommendations**: Based on your analysis, provide concrete and practical recommendations for the business owner to improve financial health.

Financial Data:
Business Name: {{{businessName}}}

Current Currency Balances:
{{#each currencyBalances}}
- Currency: {{{currency}}}, Total Credit: {{{totalCredit}}}, Total Debit: {{{totalDebit}}}, Net Balance: {{{netBalance}}}
{{/each}}

Monthly Debt Movements:
{{#each monthlyDebtMovements}}
- Month: {{{month}}} {{{year}}}, Total Credit: {{{totalCredit}}}, Total Debit: {{{totalDebit}}}, Net Change: {{{netChange}}}
{{/each}}

{{#if additionalReportContext}}
Additional Report Context: {{{additionalReportContext}}}
{{/if}}

Please provide your analysis in the specified JSON format. Ensure all sections are detailed and insightful.
`,
});

const financialReportAnalyzerFlow = ai.defineFlow(
  {
    name: 'financialReportAnalyzerFlow',
    inputSchema: FinancialReportInputSchema,
    outputSchema: FinancialReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
