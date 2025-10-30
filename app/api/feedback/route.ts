import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { scanId, feedbackType, comment } = await request.json()

    if (!scanId || !feedbackType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, store feedback in database
    const feedback = {
      id: crypto.randomUUID(),
      scanId,
      userId: payload.userId,
      feedbackType, // agree, disagree, unsure
      comment,
      createdAt: new Date().toISOString(),
    }

    console.log("[v0] Feedback recorded:", feedback)

    return NextResponse.json(feedback, { status: 201 })
  } catch (error) {
    console.error("[v0] Feedback error:", error)
    return NextResponse.json({ error: "Failed to record feedback" }, { status: 500 })
  }
}
