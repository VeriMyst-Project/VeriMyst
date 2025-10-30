"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, ArrowLeft, Zap, TrendingUp, CheckCircle2 } from "lucide-react"
import { ClaimVerifier } from "@/components/claim-verifier"
import { VerificationResults } from "@/components/verification-results"

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

export default function VerifyPage() {
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "completed">("idle")
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(null)
  const [verificationHistory, setVerificationHistory] = useState<VerificationResult[]>([
    {
      id: "1",
      claim: "The Earth is flat",
      verdict: "false",
      confidence: 0.99,
      sources: [
        { title: "NASA - Earth Shape", url: "#", credibility: 0.99 },
        { title: "Scientific American", url: "#", credibility: 0.95 },
      ],
      explanation:
        "Extensive scientific evidence confirms Earth is an oblate spheroid. Satellite imagery, physics, and observations from space all confirm this.",
      relatedClaims: ["Moon landing hoax", "NASA conspiracy"],
    },
    {
      id: "2",
      claim: "Vaccines contain microchips",
      verdict: "false",
      confidence: 0.98,
      sources: [
        { title: "WHO - Vaccine Safety", url: "#", credibility: 0.99 },
        { title: "CDC Fact Check", url: "#", credibility: 0.98 },
      ],
      explanation:
        "No credible evidence supports this claim. Vaccine contents are publicly documented and independently verified.",
      relatedClaims: ["5G causes COVID", "Bill Gates population control"],
    },
  ])

  const handleVerifyClaim = async (claim: string) => {
    setVerificationStatus("verifying")

    // Simulate verification process
    setTimeout(() => {
      const newResult: VerificationResult = {
        id: Date.now().toString(),
        claim,
        verdict: Math.random() > 0.5 ? "false" : "partially-true",
        confidence: 0.7 + Math.random() * 0.25,
        sources: [
          { title: "Fact-Check Database", url: "#", credibility: 0.92 },
          { title: "News Archive", url: "#", credibility: 0.88 },
          { title: "Academic Source", url: "#", credibility: 0.95 },
        ],
        explanation: `This claim has been analyzed against multiple reliable sources. The evidence suggests this statement is ${
          Math.random() > 0.5 ? "false" : "partially true"
        }. Further investigation recommended.`,
        relatedClaims: ["Related claim 1", "Related claim 2"],
      }

      setCurrentResult(newResult)
      setVerificationHistory([newResult, ...verificationHistory.slice(0, 4)])
      setVerificationStatus("completed")
    }, 3000)
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
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Verification Interface */}
          <div className="lg:col-span-2">
            <Card className="p-8 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <h1 className="text-3xl font-bold">Quick Verify</h1>
              </div>
              <p className="text-muted-foreground mb-8">
                Enter a claim or statement to verify it against reliable sources and get credibility scores
              </p>

              {verificationStatus === "idle" || verificationStatus === "completed" ? (
                <ClaimVerifier onVerify={handleVerifyClaim} isLoading={false} />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="font-semibold">Verifying claim...</p>
                      <p className="text-sm text-muted-foreground mt-1">Checking against reliable sources</p>
                    </div>
                  </div>
                </div>
              )}

              {currentResult && verificationStatus === "completed" && (
                <div className="mt-8 pt-8 border-t border-border">
                  <VerificationResults result={currentResult} />
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-4">Verification Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Claims Verified</p>
                  <p className="text-2xl font-bold">{verificationHistory.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  <p className="text-2xl font-bold">94.2%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
              </div>
            </Card>

            {/* How It Works */}
            <Card className="p-6 border border-border bg-primary/5">
              <h3 className="font-semibold mb-3">How It Works</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <p className="text-muted-foreground">Enter a claim to verify</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <p className="text-muted-foreground">AI analyzes against sources</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <p className="text-muted-foreground">Get verdict with evidence</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Verifications */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Recent Verifications</h2>
          </div>

          <div className="grid gap-4">
            {verificationHistory.map((result) => (
              <Card key={result.id} className="p-4 border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium mb-2">{result.claim}</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-muted-foreground">{result.sources.length} sources verified</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                        result.verdict === "false"
                          ? "bg-red-500/10 text-red-500"
                          : result.verdict === "true"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {result.verdict === "false" ? "False" : result.verdict === "true" ? "True" : "Partially True"}
                    </div>
                    <p className="text-sm font-semibold">{(result.confidence * 100).toFixed(0)}% confident</p>
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
