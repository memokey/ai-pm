import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import prompt_content from "@/data/Prompts/subTaskPrompt"

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY, // Your OpenAI key
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        let { messages } = await req.json();
        if (messages.length === 1) {
            messages = [{ role: "system", content: prompt_content }, ...messages];
        }
        // Ask OpenAI for a streaming chat completion given the prompt
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            stream: false,
            messages,
        });

        const output =
        response.choices[0]?.message;

        // Respond with the response from FastAPI
        return NextResponse.json({output});
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json({ name, status, headers, message }, { status });
        } else {
            throw error;
        }
    }
}