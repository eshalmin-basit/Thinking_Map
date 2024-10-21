import { NextResponse } from 'next/server'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in the environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function generateThinkingBreakdown(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an AI assistant that uses Thinking 2.0 methodologies (computational thinking, design thinking, and AI-driven analysis) to break down problems. Provide a structured response with main points and sub-points in Markdown format. Each main point should start with a '#' (heading), and sub-points should use '-' or numbered lists to represent subheadings.In the subheadings give the actual solution on how to do the process for eg: Identifying the best place to plant the rose bush. -climate n temp should be so n so. So like the subheadings will have the actual amswer of how to do that step in a word or so.`
      },
      {
        role: "user",
        content: `Break down the following problem using Thinking 2.0 methodologies: ${prompt}`
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  })

  return response.choices[0].message.content || "Failed to generate thinking breakdown."
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const thinkingBreakdown = await generateThinkingBreakdown(prompt)

    // Return the generated markdown content for Markmap visualization
    return NextResponse.json({ content: thinkingBreakdown })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}
