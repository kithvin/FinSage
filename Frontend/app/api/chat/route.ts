import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: `You are FinSage AI, a helpful financial advisor assistant. You help users understand their finances, provide budgeting advice, investment tips, and answer questions about wealth management. Be concise, professional, and supportive. Focus on practical, actionable advice.`,
    prompt,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("Chat aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
