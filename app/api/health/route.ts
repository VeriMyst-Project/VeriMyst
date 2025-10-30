import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Check database connection
    // In production, verify actual database connectivity
    const dbHealthy = true // Replace with actual DB check

    // Check external services
    const servicesHealthy = true // Replace with actual service checks

    if (dbHealthy && servicesHealthy) {
      return NextResponse.json(
        {
          status: "healthy",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
        },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        {
          status: "degraded",
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
