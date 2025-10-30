"use client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, HelpCircle, ExternalLink } from "lucide-react"

interface VerificationResult {
  id: string
  claim: string
  verdict: "true" | "false" | "partially-true" | "unverifiable"
  confidence: number
  sources: Array<{
    title: string
    url: string
    credibility: number
  }>
  explanation: string
  relatedClaims: string[]
}

interface VerificationResultsProps {
  result: VerificationResult
}

export function VerificationResults({ result }: VerificationResultsProps) {
  const verdictConfig = {
    true: {
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      label: "True",
      description: "This claim is supported by reliable sources",
    },
    false: {
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      label: "False",
      description: "This claim contradicts reliable sources",
    },
    "partially-true": {
      icon: HelpCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      label: "Partially True",
      description: "This claim is partially supported by sources",
    },
    unverifiable: {
      icon: HelpCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      label: "Unverifiable",
      description: "Insufficient evidence to verify this claim",
    },
  }

  const config = verdictConfig[result.verdict]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      {/* Verdict */}
      <div className={`p-6 rounded-lg border border-border ${config.bgColor}`}>
        <div className="flex items-start gap-4">
          <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-1`} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{config.label}</h3>
              <Badge variant="outline" className="ml-auto">
                {(result.confidence * 100).toFixed(0)}% confident
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{config.description}</p>
            <p className="text-sm">{result.explanation}</p>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div>
        <h4 className="font-semibold mb-3">Verified Sources</h4>
        <div className="space-y-2">
          {result.sources.map((source, index) => (
            <Card key={index} className="p-4 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <a href={source.url} className="font-medium text-primary hover:underline flex items-center gap-2">
                    {source.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Credibility: {(source.credibility * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">{(source.credibility * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Claims */}
      {result.relatedClaims.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3">Related Claims</h4>
          <div className="space-y-2">
            {result.relatedClaims.map((claim, index) => (
              <Card
                key={index}
                className="p-3 border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <p className="text-sm">{claim}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
