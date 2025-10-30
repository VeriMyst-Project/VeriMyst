"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  compact?: boolean
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange, compact = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = translations[currentLanguage]

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: t.common.english },
    { code: "hi", label: t.common.hindi },
    { code: "gu", label: t.common.gujarati },
  ]

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => onLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? "" : "bg-transparent"}
          >
            {lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-2 bg-transparent">
        <Globe className="w-4 h-4" />
        {currentLanguage.toUpperCase()}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors ${
                currentLanguage === lang.code ? "bg-primary/20 font-semibold" : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
