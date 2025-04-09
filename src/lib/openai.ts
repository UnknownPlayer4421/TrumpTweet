import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getOpenAiResponse(message: string) {
  const response = await openai.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: "Read X posts from key stakeholders and provide a sentiment on whether its good or bad for the trade market.\n\nReponses will be short, whether its positive, neutral or negative. No more than 6 words.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: message,
          },
        ],
      },
    ],
    text: {
      format: {
        type: "text",
      },
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 20,
    top_p: 1,
    store: true,
  });

  return response.output_text;
}
