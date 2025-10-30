"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, MessageSquare, BarChart3, BookOpen, Zap, Users, ChevronRight } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const features = [
    {
      id: "scan",
      icon: Shield,
      title: "Scan Content",
      description: "Analyze text, images, audio, and video for misinformation",
      color: "from-blue-500 to-cyan-500",
      path: "/scanner",
    },
    {
      id: "chat",
      icon: MessageSquare,
      title: "AI Chat Assistant",
      description: "Chat with multilingual AI about misinformation and fact-checking",
      color: "from-purple-500 to-pink-500",
      path: "/chat",
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: "Analytics",
      description: "View statistics and trends about misinformation detection",
      color: "from-green-500 to-emerald-500",
      path: "/analytics",
    },
    {
      id: "learn",
      icon: BookOpen,
      title: "Learn & Educate",
      description: "Access educational resources and guides",
      color: "from-orange-500 to-red-500",
      path: "/learn",
    },
    {
      id: "verify",
      icon: Zap,
      title: "Quick Verify",
      description: "Instantly verify claims and get credibility scores",
      color: "from-yellow-500 to-orange-500",
      path: "/verify",
    },
    {
      id: "community",
      icon: Users,
      title: "Community",
      description: "Join our community of fact-checkers",
      color: "from-indigo-500 to-blue-500",
      path: "/community",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Header */}
      <div className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">VeriMyst</span>
          </div>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to VeriMyst</h1>
          <p className="text-muted-foreground">Choose a feature to get started with misinformation defense</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.id}
                className="border border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer group"
                onClick={() => router.push(feature.path)}
              >
                <div className="p-6 h-full flex flex-col">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{feature.description}</p>
                  <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium">Open</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="border border-border/50 bg-card/50 backdrop-blur p-6">
            <div className="text-3xl font-bold text-primary mb-2">1.2M+</div>
            <p className="text-sm text-muted-foreground">Content Scanned</p>
          </Card>
          <Card className="border border-border/50 bg-card/50 backdrop-blur p-6">
            <div className="text-3xl font-bold text-accent mb-2">98.5%</div>
            <p className="text-sm text-muted-foreground">Detection Accuracy</p>
          </Card>
          <Card className="border border-border/50 bg-card/50 backdrop-blur p-6">
            <div className="text-3xl font-bold text-green-500 mb-2">50K+</div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
