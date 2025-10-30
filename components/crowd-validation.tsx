"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react"

interface CrowdValidationProps {
  scanId: string
  currentValidation?: {
    agree: number
    disagree: number
    unsure: number
  }
  userFeedback?: string
}

export function CrowdValidation({ scanId, currentValidation, userFeedback }: CrowdValidationProps) {
  const [feedback, setFeedback] = useState<string | null>(userFeedback || null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comment, setComment] = useState("")

  const total = (currentValidation?.agree || 0) + (currentValidation?.disagree || 0) + (currentValidation?.unsure || 0)
  const agreePercent = total > 0 ? ((currentValidation?.agree || 0) / total) * 100 : 0
  const disagreePercent = total > 0 ? ((currentValidation?.disagree || 0) / total) * 100 : 0
  const unsurePercent = total > 0 ? ((currentValidation?.unsure || 0) / total) * 100 : 0

  const handleSubmitFeedback = async (type: string) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scanId,
          feedbackType: type,
          comment: comment || undefined,
        }),
      })

      if (response.ok) {
        setFeedback(type)
        setComment("")
      }
    } catch (error) {
      console.error("[v0] Feedback submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Community Validation</h3>
      </div>

      {/* Validation Stats */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Agree with result</span>
            <span className="text-sm text-muted-foreground">{currentValidation?.agree || 0} votes</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-green-500 h-full rounded-full transition-all" style={{ width: `${agreePercent}%` }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Disagree with result</span>
            <span className="text-sm text-muted-foreground">{currentValidation?.disagree || 0} votes</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${disagreePercent}%` }} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Unsure</span>
            <span className="text-sm text-muted-foreground">{currentValidation?.unsure || 0} votes</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-yellow-500 h-full rounded-full transition-all" style={{ width: `${unsurePercent}%` }} />
          </div>
        </div>
      </div>

      {/* User Feedback */}
      <div className="space-y-4">
        <p className="text-sm font-medium">What do you think?</p>

        <textarea
          placeholder="Share your thoughts (optional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-20 p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          disabled={isSubmitting}
        />

        <div className="flex gap-3">
          <Button
            variant={feedback === "agree" ? "default" : "outline"}
            className={feedback === "agree" ? "bg-green-500 hover:bg-green-600" : ""}
            onClick={() => handleSubmitFeedback("agree")}
            disabled={isSubmitting}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Agree
          </Button>
          <Button
            variant={feedback === "disagree" ? "default" : "outline"}
            className={feedback === "disagree" ? "bg-red-500 hover:bg-red-600" : ""}
            onClick={() => handleSubmitFeedback("disagree")}
            disabled={isSubmitting}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            Disagree
          </Button>
          <Button
            variant={feedback === "unsure" ? "default" : "outline"}
            className={feedback === "unsure" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            onClick={() => handleSubmitFeedback("unsure")}
            disabled={isSubmitting}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Unsure
          </Button>
        </div>

        {feedback && (
          <p className="text-sm text-green-500">
            Thank you for your feedback! It helps improve our detection accuracy.
          </p>
        )}
      </div>
    </Card>
  )
}
