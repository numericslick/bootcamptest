"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import Nav from "@/app/_components/Nav"
import { axiosPost } from "@/lib/axios"
import { IChatMessage } from "@/interfaces/interfaces"

export default function ChatPage() {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const nextMessages: IChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ]
    setMessages(nextMessages)
    setInput("")
    setError(null)
    setLoading(true)

    try {
      const response = await axiosPost<
        { messages: IChatMessage[] },
        { reply: string }
      >("chat", { messages: nextMessages })
      const reply = response.data?.reply ?? ""
      setMessages([...nextMessages, { role: "assistant", content: reply }])
    } catch {
      setError("Couldn't reach the assistant. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Nav />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Ask about Daftra<span className="text-teal-600">POS</span>
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Questions about Doctors, Patients, and Appointments in this app.
        </p>

        <div className="mt-6 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-black/[.08] bg-zinc-50/50 p-4 dark:border-white/[.1] dark:bg-white/[.03]">
          {messages.length === 0 && (
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Say hello — ask how doctor status works, how appointments link
              patients to doctors, or anything else about this app.
            </p>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl bg-white px-4 py-2 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500">
                Thinking…
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            disabled={loading}
            className="flex-1 rounded-full border border-black/[.08] bg-white px-4 py-2 text-sm outline-none focus:border-teal-600 dark:border-white/[.1] dark:bg-black"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  )
}
