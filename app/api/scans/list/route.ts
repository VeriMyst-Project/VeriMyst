import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // In production, fetch from database with pagination
    const mockScans = [
      {
        id: "scan-1",
        contentType: "text",
        fileName: "article.txt",
        status: "completed",
        trustScore: 0.78,
        riskLevel: "low",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "scan-2",
        contentType: "image",
        fileName: "image.jpg",
        status: "completed",
        trustScore: 0.45,
        riskLevel: "high",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "scan-3",
        contentType: "video",
        fileName: "video.mp4",
        status: "processing",
        trustScore: null,
        riskLevel: null,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
    ]

    return NextResponse.json({ scans: mockScans, total: mockScans.length })
  } catch (error) {
    console.error("[v0] Scans list error:", error)
    return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 })
  }
}
