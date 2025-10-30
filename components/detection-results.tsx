"use client"
import { Card } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

interface DetectionResult {
  type: string
  detected: boolean
  confidence: number
  description: string
}

interface DetectionResultsProps {
  results: DetectionResult[]
}

export function DetectionResults({ results }: DetectionResultsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Detection Results</h3>

      <div className="grid gap-3">
        {results.map((result, index) => (
          <Card key={index} className="p-4 border border-border">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {result.detected ? (
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{result.type}</p>
                  <span className={`text-sm font-semibold ${result.detected ? "text-destructive" : "text-green-500"}`}>
                    {result.detected ? "Detected" : "Not Detected"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-1.5">
                    <div
                      className={`h-full rounded-full transition-all ${
                        result.confidence >= 0.7
                          ? "bg-destructive"
                          : result.confidence >= 0.5
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground w-12 text-right">
                    {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
