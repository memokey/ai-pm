import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY, // Your OpenAI key
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        const fastAPIResponse = await fetch('http://127.0.0.1:8080/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message, history }),
        });

        // Check if the FastAPI call was successful
        if (!fastAPIResponse.ok) {
            throw new Error(`Failed to call FastAPI. Status: ${fastAPIResponse.status}`);
        }

        // Get the response from FastAPI
        const fastAPIResponseBody = await fastAPIResponse.json()

        // Respond with the response from FastAPI
        return NextResponse.json(fastAPIResponseBody);
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json({ name, status, headers, message }, { status });
        } else {
            throw error;
        }
    }
}