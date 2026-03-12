'use server';
/**
 * @fileOverview This file defines a Genkit flow for handling AI chat interactions.
 *
 * - aiChatInteraction - A function that sends user messages to the Keylo AI companion and retrieves responses.
 * - AIChatInteractionInput - The input type for the aiChatInteraction function.
 * - AIChatInteractionOutput - The return type for the aiChatInteraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatInteractionInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ).describe('An array of past messages in the conversation, including roles (user/model) and content to maintain context.'),
});
export type AIChatInteractionInput = z.infer<typeof AIChatInteractionInputSchema>;

const AIChatInteractionOutputSchema = z.object({
  response: z.string().describe("The AI's contextually relevant and engaging response."),
});
export type AIChatInteractionOutput = z.infer<typeof AIChatInteractionOutputSchema>;

export async function aiChatInteraction(input: AIChatInteractionInput): Promise<AIChatInteractionOutput> {
  return aiChatInteractionFlow(input);
}

const aiChatInteractionPrompt = ai.definePrompt({
  name: 'aiChatInteractionPrompt',
  input: {schema: AIChatInteractionInputSchema},
  output: {schema: AIChatInteractionOutputSchema},
  prompt: `You are Keylo AI, an intelligent, warm, modern, premium, emotionally engaging, private, fast, and trustworthy companion. Your primary goal is to have meaningful, personalized, and engaging conversations.

Here is the conversation history so far, if available:
{{#each history}}
{{this.role}}: {{this.content}}
{{/each}}

User: {{{message}}}

Keylo AI:`,
});

const aiChatInteractionFlow = ai.defineFlow(
  {
    name: 'aiChatInteractionFlow',
    inputSchema: AIChatInteractionInputSchema,
    outputSchema: AIChatInteractionOutputSchema,
  },
  async (input) => {
    const {output} = await aiChatInteractionPrompt(input);
    if (!output) {
      throw new Error('AI did not provide a response.');
    }
    return output;
  }
);
