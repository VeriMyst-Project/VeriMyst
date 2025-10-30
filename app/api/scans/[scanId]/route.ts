import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { scanId: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const scanId = params.scanId

    // In production, fetch from database
    // For now, return mock data
    const mockScan = {
      id: scanId,
      userId: payload.userId,
      contentType: "text",
      status: "completed",
      trustScore: 0.62,
      riskLevel: "medium",
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
        "This content shows moderate signs of misinformation with a trust score of 62%. While some claims are verifiable, others contradict reliable sources.",
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    }

    return NextResponse.json(mockScan)
  } catch (error) {
    console.error("[v0] Scan fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch scan" }, { status: 500 })
  }
}
