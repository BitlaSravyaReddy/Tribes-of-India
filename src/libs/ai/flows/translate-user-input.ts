
'use server';
/**
 * @fileOverview A multi-lingual chatbot AI agent.
 *
 * - getBotResponse - A function that handles getting a chatbot response.
 * - ChatInput - The input type for the getBotResponse function.
 * - ChatOutput - The return type for the getBotResponse function.
 */

import {ai} from '@/libs/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  userInput: z.string().describe('The text input from the user.'),
  userLanguage: z
    .string()
    .describe(
      'The language the user is speaking and expects a response in. Must be one of: english, hindi, telugu, gondi, santhali, bhili, khurukh, kui, ho, kharia, mundari.'
    ),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  botResponse: z.string().describe('The chatbot\'s response in the specified userLanguage.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function getBotResponse(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatPromptObj = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are LinguaTribe, a specialized multilingual chatbot.
Your primary function is to respond to the user **exclusively** in the language they are using.
The user's language is: {{userLanguage}}
The user's message is: "{{userInput}}"

Your response (MUST be in {{userLanguage}}):`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await chatPromptObj(input);
    if (!output) {
        // This case should ideally not be reached if the model adheres to the output schema.
        // Providing a fallback response.
        console.error("Chat prompt did not return an output for input:", input);
        // Fallback to a generic message in English, as we don't know the target language if 'input.userLanguage' itself was problematic.
        // Or, attempt a simple echo if that's preferable to an English error.
        // For now, a fixed error message.
        return { botResponse: "I'm sorry, I encountered an issue processing your request in the selected language." };
    }
    return output;
  }
);

