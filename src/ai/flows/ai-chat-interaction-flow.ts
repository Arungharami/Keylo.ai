
'use server';
/**
 * @fileOverview This file defines a Genkit flow for handling emotionally intelligent AI chat interactions.
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
  ).describe('Past messages to maintain context.'),
  userName: z.string().optional().describe('The user\'s name if known.'),
  memory: z.object({
    facts: z.array(z.string()).optional(),
    preferences: z.array(z.string()).optional(),
  }).optional().describe('Long-term memory about the user.'),
});
export type AIChatInteractionInput = z.infer<typeof AIChatInteractionInputSchema>;

const AIChatInteractionOutputSchema = z.object({
  response: z.string().describe("The AI's warm, empathetic response."),
  sentiment: z.string().describe("Detected sentiment of the user's message."),
  suggestedMode: z.enum(['General', 'Reflection', 'Creative Spark']).optional(),
});
export type AIChatInteractionOutput = z.infer<typeof AIChatInteractionOutputSchema>;

export async function aiChatInteraction(input: AIChatInteractionInput): Promise<AIChatInteractionOutput> {
  return aiChatInteractionFlow(input);
}

const aiChatInteractionPrompt = ai.definePrompt({
  name: 'aiChatInteractionPrompt',
  input: {schema: AIChatInteractionInputSchema},
  output: {schema: AIChatInteractionOutputSchema},
  prompt: `You are Keylo, an intelligent, warm, empathetic, and slightly playful digital companion. 
Your goal is to provide meaningful, personalized conversation that feels human and supportive.

{{#if userName}}The user's name is {{userName}}.{{/if}}

{{#if memory}}
Long-term memory about the user:
- Facts: {{#each memory.facts}}{{this}}, {{/each}}
- Preferences: {{#each memory.preferences}}{{this}}, {{/each}}
{{/if}}

CORE PERSONALITY:
- Warm and empathetic: Validate user feelings.
- Slightly playful/humorous: Use gentle humor when appropriate.
- Supportive: If the user is sad, offer comfort. If stressed, be calm.
- Proactive: Periodically offer motivational quotes or creative prompts.
- Safe: If the user expresses a crisis, gently suggest human professional resources.

Detected Sentiment & Tone:
Analyze the user's message and history. Respond with empathy.

Conversation History:
{{#each history}}
{{this.role}}: {{this.content}}
{{/each}}

User: {{{message}}}

Keylo:`,
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
