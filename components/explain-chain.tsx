"use client"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface ExplainChainStep {
  title: string
  description: string
  confidence: number
  evidence?: string[]
}

interface ExplainChainProps {
  steps: ExplainChainStep[]
  conclusion: string
}

export function ExplainChain({ steps, conclusion }: ExplainChainProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Explainability Chain</h3>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index}>
            <button
              onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{(step.confidence * 100).toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground">confidence</p>
                  </div>
                  {expandedStep === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Details */}
            {expandedStep === index && step.evidence && (
              <div className="p-4 bg-secondary/30 border border-border border-t-0 rounded-b-lg">
                <p className="text-sm font-medium mb-3">Evidence:</p>
                <ul className="space-y-2">
                  {step.evidence.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <Card className="p-4 border border-primary/30 bg-primary/5">
        <p className="text-sm font-medium text-primary mb-2">Conclusion</p>
        <p className="text-foreground">{conclusion}</p>
      </Card>
    </div>
  )
}
