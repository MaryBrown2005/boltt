import { streamText as _streamText, type CoreMessage } from 'ai';
import { getModel } from './model';

export type Messages = CoreMessage[];

export interface StreamingOptions {
  toolChoice?: 'none' | 'auto';
  onFinish?: (result: { text: string; finishReason: string }) => void | Promise<void>;
}

export function streamText(messages: Messages, env: Env, options: StreamingOptions = {}) {
  return _streamText({
    model: getModel(),
    messages,
    maxTokens: 8000,
    temperature: 0.7,
    onFinish: async ({ text, finishReason }) => {
      if (options.onFinish) {
        await options.onFinish({ text, finishReason });
      }
    },
  });
}