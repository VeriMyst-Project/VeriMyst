"use client"
import { useEffect, useState } from "react"

interface TrustScoreGaugeProps {
  score: number // 0 to 1
  size?: "sm" | "md" | "lg"
}

export function TrustScoreGauge({ score, size = "md" }: TrustScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setDisplayScore(score), 100)
    return () => clearTimeout(timer)
  }, [score])

  const sizeConfig = {
    sm: { radius: 40, fontSize: "text-lg" },
    md: { radius: 60, fontSize: "text-3xl" },
    lg: { radius: 80, fontSize: "text-4xl" },
  }

  const config = sizeConfig[size]
  const circumference = 2 * Math.PI * config.radius
  const offset = circumference - (displayScore / 1) * circumference

  const getColor = (score: number) => {
    if (score >= 0.7) return "#22c55e" // green
    if (score >= 0.5) return "#eab308" // yellow
    if (score >= 0.3) return "#f97316" // orange
    return "#ef4444" // red
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-fit">
        <svg width={config.radius * 2 + 20} height={config.radius * 2 + 20} className="transform -rotate-90">
          <circle
            cx={config.radius + 10}
            cy={config.radius + 10}
            r={config.radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
          />
          <circle
            cx={config.radius + 10}
            cy={config.radius + 10}
            r={config.radius}
            fill="none"
            stroke={getColor(displayScore)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className={`font-bold ${config.fontSize}`}>{(displayScore * 100).toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">Trust Score</p>
          </div>
        </div>
      </div>
    </div>
  )
}
