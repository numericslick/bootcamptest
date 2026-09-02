// chat api route - sends conversation to OpenAI grounded in the app's domain

import { NextRequest, NextResponse } from "next/server";
import { getOpenAI, CHAT_SYSTEM_PROMPT } from "@/lib/openai";
import { IChatMessage } from "@/interfaces/interfaces";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = body?.messages as IChatMessage[] | undefined;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({
        status: 400,
        message: "messages is required",
      });
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: CHAT_SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ status: 200, data: { reply } });
  } catch (error) {
    console.error("Failed to get chat completion:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to get a reply from the assistant",
    });
  }
}
