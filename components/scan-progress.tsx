"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"

interface ScanProgressProps {
  status: "pending" | "processing" | "completed" | "failed"
  progress?: number
  message?: string
}

export function ScanProgress({ status, progress = 0, message }: ScanProgressProps) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    if (status === "processing" && progress < 100) {
      const timer = setTimeout(() => {
        setDisplayProgress(Math.min(progress + Math.random() * 15, 95))
      }, 500)
      return () => clearTimeout(timer)
    } else if (status === "completed") {
      setDisplayProgress(100)
    }
  }, [status, progress])

  const statusConfig = {
    pending: { icon: Loader2, color: "text-muted-foreground", label: "Initializing scan..." },
    processing: { icon: Loader2, color: "text-primary", label: message || "Analyzing content..." },
    completed: { icon: CheckCircle2, color: "text-green-500", label: "Scan complete" },
    failed: { icon: AlertCircle, color: "text-destructive", label: "Scan failed" },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center gap-4 mb-4">
        <Icon className={`w-6 h-6 ${config.color} ${status === "processing" ? "animate-spin" : ""}`} />
        <div>
          <h3 className="font-semibold">{config.label}</h3>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{Math.round(displayProgress)}%</p>
    </Card>
  )
}
