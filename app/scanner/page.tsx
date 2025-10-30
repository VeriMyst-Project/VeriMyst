"use client"
import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ScanUpload } from "@/components/scan-upload"
import { ScanProgress } from "@/components/scan-progress"
import { Shield, History } from "lucide-react"

export default function ScannerPage() {
  const [scanStatus, setScanStatus] = useState<"idle" | "pending" | "processing" | "completed" | "failed">("idle")
  const [scanProgress, setScanProgress] = useState(0)
  const [scanMessage, setScanMessage] = useState("")
  const [recentScans, setRecentScans] = useState([
    {
      id: "1",
      content: "Article about climate change",
      type: "text",
      trustScore: 0.78,
      riskLevel: "low",
      date: "2 hours ago",
    },
    {
      id: "2",
      content: "Image of political event",
      type: "image",
      trustScore: 0.45,
      riskLevel: "high",
      date: "5 hours ago",
    },
  ])

  const handleUpload = async (file: File, contentType: string) => {
    setScanStatus("pending")
    setScanProgress(0)
    setScanMessage("Preparing scan...")

    // Simulate scan progression
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 20
      })
    }, 1000)

    // Simulate scan completion
    setTimeout(() => {
      clearInterval(progressInterval)
      setScanStatus("completed")
      setScanProgress(100)
      setScanMessage("Analysis complete")

      // Add to recent scans
      setRecentScans([
        {
          id: Date.now().toString(),
          content: file.name,
          type: contentType,
          trustScore: Math.random() * 0.5 + 0.5,
          riskLevel: Math.random() > 0.5 ? "low" : "medium",
          date: "just now",
        },
        ...recentScans.slice(0, 4),
      ])

      setTimeout(() => setScanStatus("idle"), 2000)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">VeriMyst</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Public Scanner</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scan Interface */}
          <div className="lg:col-span-2">
            <Card className="p-8 border border-border">
              <h1 className="text-3xl font-bold mb-2">Scan Content</h1>
              <p className="text-muted-foreground mb-8">
                Upload or paste content to analyze for misinformation, deepfakes, and manipulated media
              </p>

              {scanStatus === "idle" ? (
                <ScanUpload onUpload={handleUpload} />
              ) : (
                <ScanProgress status={scanStatus} progress={scanProgress} message={scanMessage} />
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-4">Scanner Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Scans</p>
                  <p className="text-2xl font-bold">{recentScans.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Trust Score</p>
                  <p className="text-2xl font-bold">
                    {((recentScans.reduce((sum, s) => sum + s.trustScore, 0) / recentScans.length) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="p-6 border border-border bg-primary/5">
              <h3 className="font-semibold mb-2">About VeriMyst</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Free, open-source misinformation detection powered by advanced AI models.
              </p>
              <Link href="#" className="text-primary text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </Card>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <History className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Recent Scans</h2>
          </div>

          <div className="grid gap-4">
            {recentScans.map((scan) => (
              <Card
                key={scan.id}
                className="p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{scan.content}</p>
                    <p className="text-sm text-muted-foreground">{scan.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Trust Score</p>
                      <p className="text-lg font-semibold">{(scan.trustScore * 100).toFixed(0)}%</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        scan.riskLevel === "low"
                          ? "bg-green-500/10 text-green-500"
                          : scan.riskLevel === "medium"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {scan.riskLevel}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
