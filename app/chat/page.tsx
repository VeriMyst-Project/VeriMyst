"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Send, Loader2, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

type Language = "en" | "hi" | "gu"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  language: Language
}

const translations = {
  en: {
    title: "AI Chat Assistant",
    subtitle: "Ask questions about misinformation and fact-checking",
    placeholder: "Ask me anything about misinformation...",
    send: "Send",
    language: "Language",
    english: "English",
    hindi: "Hindi",
    gujarati: "Gujarati",
    backToDashboard: "Back to Dashboard",
  },
  hi: {
    title: "एआई चैट सहायक",
    subtitle: "गलत सूचना और तथ्य-जांच के बारे में प्रश्न पूछें",
    placeholder: "मुझसे गलत सूचना के बारे में कुछ भी पूछें...",
    send: "भेजें",
    language: "भाषा",
    english: "अंग्रेजी",
    hindi: "हिंदी",
    gujarati: "ગુજરાતી",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
  },
  gu: {
    title: "AI ચેટ સહાયક",
    subtitle: "ખોટી માહિતી અને તથ્ય-તપાસ વિશે પ્રશ્નો પૂછો",
    placeholder: "મને ખોટી માહિતી વિશે કંઈ પણ પૂછો...",
    send: "મોકલો",
    language: "ભાષા",
    english: "અંગ્રેજી",
    hindi: "હિંદી",
    gujarati: "ગુજરાતી",
    backToDashboard: "ડેશબોર્ડ પર પાછા ફરો",
  },
}

export default function ChatPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("en")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const t = translations[language]

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

  useEffect(() => scrollToBottom(), [messages])

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
    setMessages([])
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      language,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, language, history: messages }),
      })

      const data = await res.json()
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "No response received.",
        language,
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.error(err)
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "❌ Failed to get a response. Please try again later.",
        language,
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-black/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">VeriMyst</span>
          </div>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            {t.backToDashboard}
          </Button>
        </div>
      </header>

      {/* Chat */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">{t.language}:</span>
          <div className="flex gap-2">
            {(["en", "hi", "gu"] as Language[]).map((lang) => (
              <Button
                key={lang}
                variant={language === lang ? "default" : "outline"}
                size="sm"
                onClick={() => handleLanguageChange(lang)}
              >
                {lang === "en" ? t.english : lang === "hi" ? t.hindi : t.gujarati}
              </Button>
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-gray-400 mb-6">{t.subtitle}</p>

        <Card className="border border-gray-800 bg-gray-900 h-96 overflow-y-auto p-6 flex flex-col">
          <div className="flex-1 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        <div className="flex gap-2 mt-4">
          <Input
            placeholder={t.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={loading}
            className="bg-gray-800 border-gray-700 text-gray-100"
          />
          <Button onClick={handleSendMessage} disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </main>
    </div>
  )
}
