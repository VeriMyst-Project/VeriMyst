"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrustScoreGauge } from "@/components/trust-score-gauge"
import { ExplainChain } from "@/components/explain-chain"
import { DetectionResults } from "@/components/detection-results"
import { CrowdValidation } from "@/components/crowd-validation"
import { ProvenanceTracker } from "@/components/provenance-tracker"
import { ArrowLeft, Download, Share2 } from "lucide-react"

export default function ScanResultsPage() {
  const params = useParams()
  const scanId = params.scanId as string

  // Mock data - in production, fetch from API
  const mockResult = {
    id: scanId,
    contentType: "text",
    trustScore: 0.62,
    riskLevel: "medium",
    timestamp: new Date().toISOString(),
    detections: [
      {
        type: "Misinformation",
        detected: true,
        confidence: 0.78,
        description: "Content contains claims contradicted by reliable sources",
      },
      {
        type: "Deepfake Detection",
        detected: false,
        confidence: 0.05,
        description: "No synthetic media detected",
      },
      {
        type: "Manipulated Media",
        detected: true,
        confidence: 0.65,
        description: "Image shows signs of digital manipulation",
      },
      {
        type: "Bias Detection",
        detected: true,
        confidence: 0.72,
        description: "Content exhibits strong political bias",
      },
    ],
    explainChain: [
      {
        title: "Claim Verification",
        description: "Cross-referenced with fact-checking databases",
        confidence: 0.85,
        evidence: [
          "Claim contradicts WHO guidelines from 2024",
          "Similar false claims debunked by Snopes",
          "Source has history of misinformation",
        ],
      },
      {
        title: "Source Analysis",
        description: "Evaluated source credibility and history",
        confidence: 0.72,
        evidence: [
          "Domain registered 3 months ago",
          "No established editorial standards",
          "Multiple fact-check violations",
        ],
      },
      {
        title: "Linguistic Analysis",
        description: "Analyzed language patterns and rhetoric",
        confidence: 0.68,
        evidence: [
          "Excessive use of emotional language",
          "Sensationalized headlines",
          "Lack of nuance in argumentation",
        ],
      },
    ],
    conclusion:
      "This content shows moderate signs of misinformation with a trust score of 62%. While some claims are verifiable, others contradict reliable sources. The source has limited credibility history. We recommend further verification before sharing.",
    crowdValidation: {
      agree: 234,
      disagree: 45,
      unsure: 89,
    },
    provenance: [
      {
        sourceUrl: "https://example-news.com/article/123",
        firstSeen: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastSeen: new Date().toISOString(),
        spreadCount: 1247,
        platforms: ["Twitter", "Facebook", "Reddit", "TikTok"],
      },
      {
        sourceUrl: "https://social-media-account.com/post/456",
        firstSeen: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        lastSeen: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        spreadCount: 892,
        platforms: ["Instagram", "WhatsApp", "Telegram"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust Score Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Card className="p-8 border border-border flex flex-col items-center">
              <TrustScoreGauge score={mockResult.trustScore} size="lg" />
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Risk Level</p>
                <div
                  className={`inline-block px-4 py-2 rounded-full font-semibold ${
                    mockResult.riskLevel === "low"
                      ? "bg-green-500/10 text-green-500"
                      : mockResult.riskLevel === "medium"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {mockResult.riskLevel.charAt(0).toUpperCase() + mockResult.riskLevel.slice(1)}
                </div>
              </div>
            </Card>
          </div>

          {/* Detection Results */}
          <div className="lg:col-span-2">
            <DetectionResults results={mockResult.detections} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <CrowdValidation scanId={scanId} currentValidation={mockResult.crowdValidation} />
          <ProvenanceTracker data={mockResult.provenance} />
        </div>

        {/* Explainability Chain */}
        <Card className="p-8 border border-border mb-8">
          <ExplainChain steps={mockResult.explainChain} conclusion={mockResult.conclusion} />
        </Card>

        {/* Metadata */}
        <Card className="p-6 border border-border">
          <h3 className="font-semibold mb-4">Scan Details</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Scan ID</p>
              <p className="font-mono text-sm">{scanId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Content Type</p>
              <p className="capitalize">{mockResult.contentType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Scanned At</p>
              <p>{new Date(mockResult.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
