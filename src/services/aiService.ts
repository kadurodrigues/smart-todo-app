import OpenAI from 'openai';

export interface OpenAIChatResponse {
  choices: {
    index: number;
    message: {
      role: "system" | "user" | "assistant";
      content: string;
    };
    finish_reason: string;
  }[];
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export const getAiTaskSuggestions = async (previousTasks: any) => {
  try {
    const { choices } = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: `Suggest a new task based on these previous tasks: ${previousTasks}` }
      ],
      max_tokens: 50
    })
    return choices
  } catch (error) {
    throw new Error(`API Error: ${error}`);
  }
}