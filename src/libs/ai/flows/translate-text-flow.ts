
'use server';
/**
 * @fileOverview A text translation AI agent.
 *
 * - translateText - A function that handles text translation.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/libs/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  textToTranslate: z.string().describe('The text to be translated.'),
  sourceLanguage: z
    .string()
    .describe(
      'The source language of the text. Must be one of: english, hindi, telugu, gondi, santhali, bhili, khurukh, kui, ho, kharia, mundari.'
    ),
  targetLanguage: z
    .string()
    .describe(
      'The target language for translation. Must be one of: english, hindi, telugu, gondi, santhali, bhili, khurukh, kui, ho, kharia, mundari.'
    ),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in the target language.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const translationPrompt = ai.definePrompt({
  name: 'translationPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `Translate the following text from {{sourceLanguage}} to {{targetLanguage}}.
Provide only the translated text.

Text to translate: "{{textToTranslate}}"

Translated text in {{targetLanguage}}:`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async input => {
    const {output} = await translationPrompt(input);
    if (!output) {
      // Fallback or error handling if prompt returns no output
      // For now, we'll assume output is always there based on schema, but real-world might need more robust handling
      console.error("Translation prompt did not return an output.", input);
      return { translatedText: input.textToTranslate }; // Fallback to original text
    }
    return output;
  }
);
