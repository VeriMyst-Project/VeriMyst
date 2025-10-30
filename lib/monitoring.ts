// Monitoring and observability utilities

export function logEvent(level: "info" | "warn" | "error", message: string, data?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    message,
    data,
    environment: process.env.NODE_ENV,
  }

  // In production, send to logging service (Datadog, New Relic, etc.)
  if (level === "error") {
    console.error(`[${timestamp}] ERROR:`, message, data)
  } else if (level === "warn") {
    console.warn(`[${timestamp}] WARN:`, message, data)
  } else {
    console.log(`[${timestamp}] INFO:`, message, data)
  }
}

export function trackMetric(name: string, value: number, tags?: Record<string, string>) {
  // In production, send to metrics service (Prometheus, CloudWatch, etc.)
  console.log("[v0] Metric:", { name, value, tags })
}

export function trackError(error: Error, context?: Record<string, unknown>) {
  // In production, send to error tracking service (Sentry, Rollbar, etc.)
  console.error("[v0] Error tracked:", {
    message: error.message,
    stack: error.stack,
    context,
  })
}
