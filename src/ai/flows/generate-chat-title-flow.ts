'use server';
/**
 * @fileOverview A Genkit flow for generating concise and relevant titles for chat conversations.
 *
 * - generateChatTitle - A function that handles the chat title generation process.
 * - GenerateChatTitleInput - The input type for the generateChatTitle function.
 * - GenerateChatTitleOutput - The return type for the generateChatTitle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateChatTitleInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The full history of a chat conversation.'),
});
export type GenerateChatTitleInput = z.infer<typeof GenerateChatTitleInputSchema>;

const GenerateChatTitleOutputSchema = z.object({
  title: z.string().describe('A concise and relevant title for the chat conversation, under 10 words.'),
});
export type GenerateChatTitleOutput = z.infer<typeof GenerateChatTitleOutputSchema>;

export async function generateChatTitle(
  input: GenerateChatTitleInput
): Promise<GenerateChatTitleOutput> {
  return generateChatTitleFlow(input);
}

const generateChatTitlePrompt = ai.definePrompt({
  name: 'generateChatTitlePrompt',
  input: { schema: GenerateChatTitleInputSchema },
  output: { schema: GenerateChatTitleOutputSchema },
  prompt: `Generate a concise and relevant title (under 10 words) for the following chat conversation.

Conversation:
{{{conversationHistory}}}

Title:`,
});

const generateChatTitleFlow = ai.defineFlow(
  {
    name: 'generateChatTitleFlow',
    inputSchema: GenerateChatTitleInputSchema,
    outputSchema: GenerateChatTitleOutputSchema,
  },
  async (input) => {
    const { output } = await generateChatTitlePrompt(input);
    if (!output) {
      throw new Error('Failed to generate chat title.');
    }
    return output;
  }
);
