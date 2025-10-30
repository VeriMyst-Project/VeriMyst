"use client"
import { Card } from "@/components/ui/card"
import { Globe, TrendingUp, Clock } from "lucide-react"

interface ProvenanceData {
  sourceUrl: string
  firstSeen: string
  lastSeen: string
  spreadCount: number
  platforms: string[]
}

interface ProvenanceTrackerProps {
  data: ProvenanceData[]
}

export function ProvenanceTracker({ data }: ProvenanceTrackerProps) {
  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Provenance & Spread Tracking</h3>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-medium text-sm break-all">{item.sourceUrl}</p>
                <p className="text-xs text-muted-foreground mt-1">Original source</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">First Seen</p>
                </div>
                <p className="text-sm font-medium">{new Date(item.firstSeen).toLocaleDateString()}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Last Seen</p>
                </div>
                <p className="text-sm font-medium">{new Date(item.lastSeen).toLocaleDateString()}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Spread Count</p>
                </div>
                <p className="text-sm font-medium">{item.spreadCount}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Detected on platforms:</p>
              <div className="flex flex-wrap gap-2">
                {item.platforms.map((platform, i) => (
                  <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <p className="text-sm text-muted-foreground">
          Provenance tracking helps identify the origin and spread of content across platforms. This information is
          crucial for understanding misinformation campaigns and their reach.
        </p>
      </div>
    </Card>
  )
}
