"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, ArrowLeft, BarChart3, TrendingUp, Users, Zap } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface TimeSeriesData {
  date: string
  scans: number
  verifications: number
  detections: number
}

interface CategoryData {
  name: string
  value: number
  percentage: number
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  // Mock data for time series
  const timeSeriesData: TimeSeriesData[] = [
    { date: "Jan 1", scans: 240, verifications: 120, detections: 89 },
    { date: "Jan 8", scans: 380, verifications: 200, detections: 145 },
    { date: "Jan 15", scans: 520, verifications: 280, detections: 198 },
    { date: "Jan 22", scans: 680, verifications: 350, detections: 267 },
    { date: "Jan 29", scans: 890, verifications: 420, detections: 312 },
    { date: "Feb 5", scans: 1200, verifications: 580, detections: 398 },
    { date: "Feb 12", scans: 1450, verifications: 720, detections: 487 },
  ]

  // Mock data for misinformation types
  const misinformationTypes: CategoryData[] = [
    { name: "False Claims", value: 35, percentage: 35 },
    { name: "Manipulated Media", value: 28, percentage: 28 },
    { name: "Deepfakes", value: 18, percentage: 18 },
    { name: "Misleading Context", value: 12, percentage: 12 },
    { name: "Other", value: 7, percentage: 7 },
  ]

  // Mock data for detection accuracy
  const accuracyData = [
    { category: "Text", accuracy: 94.2 },
    { category: "Images", accuracy: 89.7 },
    { category: "Audio", accuracy: 87.3 },
    { category: "Video", accuracy: 91.5 },
    { category: "Overall", accuracy: 90.7 },
  ]

  // Mock data for user engagement
  const engagementData = [
    { day: "Mon", users: 240, scans: 320, verifications: 180 },
    { day: "Tue", users: 280, scans: 380, verifications: 220 },
    { day: "Wed", users: 320, scans: 420, verifications: 260 },
    { day: "Thu", users: 350, scans: 480, verifications: 290 },
    { day: "Fri", users: 420, scans: 580, verifications: 350 },
    { day: "Sat", users: 380, scans: 520, verifications: 310 },
    { day: "Sun", users: 290, scans: 380, verifications: 240 },
  ]

  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

  // Key metrics
  const metrics = [
    {
      label: "Total Scans",
      value: "12.4K",
      change: "+23.5%",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Verifications",
      value: "4.2K",
      change: "+18.2%",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Detections",
      value: "2.8K",
      change: "+31.4%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
    {
      label: "Active Users",
      value: "1.2K",
      change: "+12.8%",
      icon: Users,
      color: "from-green-500 to-emerald-500",
    },
  ]

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
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="text-4xl font-bold">Analytics & Statistics</h1>
          </div>
          <p className="text-muted-foreground">Track platform performance, user engagement, and detection metrics</p>
        </div>

        {/* Time Range Filter */}
        <div className="mb-8 flex gap-2">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? "" : "bg-transparent"}
            >
              {range === "7d" ? "Last 7 Days" : range === "30d" ? "Last 30 Days" : "Last 90 Days"}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="p-6 border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-green-500">{metric.change}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
              </Card>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Scans Over Time */}
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Scans & Verifications Over Time</h3>
            <ChartContainer
              config={{
                scans: { label: "Scans", color: "hsl(var(--chart-1))" },
                verifications: { label: "Verifications", color: "hsl(var(--chart-2))" },
              }}
              className="h-80"
            >
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="scans" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="verifications" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </Card>

          {/* Misinformation Types */}
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Misinformation Types Detected</h3>
            <ChartContainer
              config={{
                value: { label: "Count", color: "hsl(var(--chart-1))" },
              }}
              className="h-80"
            >
              <PieChart>
                <Pie
                  data={misinformationTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="var(--chart-1)"
                  dataKey="value"
                >
                  {misinformationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </Card>
        </div>

        {/* Detection Accuracy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Detection Accuracy by Content Type</h3>
            <ChartContainer
              config={{
                accuracy: { label: "Accuracy %", color: "hsl(var(--chart-1))" },
              }}
              className="h-80"
            >
              <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="accuracy" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </Card>

          {/* User Engagement */}
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Weekly User Engagement</h3>
            <ChartContainer
              config={{
                users: { label: "Users", color: "hsl(var(--chart-1))" },
                scans: { label: "Scans", color: "hsl(var(--chart-2))" },
                verifications: { label: "Verifications", color: "hsl(var(--chart-3))" },
              }}
              className="h-80"
            >
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="users" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="scans" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="verifications" fill="var(--chart-3)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Avg Scan Time", value: "2.3s", unit: "seconds" },
            { label: "False Positive Rate", value: "3.2%", unit: "percentage" },
            { label: "User Retention (30d)", value: "78.5%", unit: "percentage" },
            { label: "Platform Uptime", value: "99.9%", unit: "percentage" },
          ].map((metric, index) => (
            <Card key={index} className="p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
              <p className="text-3xl font-bold mb-1">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.unit}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
