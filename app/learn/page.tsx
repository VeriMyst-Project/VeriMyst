"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, ArrowLeft, BookOpen, Lightbulb, Users, Award, ChevronRight } from "lucide-react"

interface Guide {
  id: string
  title: string
  description: string
  category: "beginner" | "intermediate" | "advanced"
  duration: string
  icon: React.ReactNode
  lessons: number
}

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")

  const guides: Guide[] = [
    {
      id: "1",
      title: "Understanding Misinformation",
      description: "Learn what misinformation is, how it spreads, and why it matters in today's digital world.",
      category: "beginner",
      duration: "15 min",
      icon: <Lightbulb className="w-6 h-6" />,
      lessons: 4,
    },
    {
      id: "2",
      title: "Identifying Fake News",
      description: "Master the techniques to spot fake news articles, manipulated images, and misleading headlines.",
      category: "beginner",
      duration: "20 min",
      icon: <Shield className="w-6 h-6" />,
      lessons: 5,
    },
    {
      id: "3",
      title: "Fact-Checking Basics",
      description: "Learn the fundamental steps of fact-checking and how to verify claims using reliable sources.",
      category: "beginner",
      duration: "18 min",
      icon: <BookOpen className="w-6 h-6" />,
      lessons: 4,
    },
    {
      id: "4",
      title: "Source Credibility Assessment",
      description: "Develop skills to evaluate the credibility and reliability of information sources.",
      category: "intermediate",
      duration: "25 min",
      icon: <Award className="w-6 h-6" />,
      lessons: 6,
    },
    {
      id: "5",
      title: "Deepfakes and Manipulated Media",
      description: "Understand how deepfakes are created and learn to identify manipulated audio, video, and images.",
      category: "intermediate",
      duration: "30 min",
      icon: <Shield className="w-6 h-6" />,
      lessons: 7,
    },
    {
      id: "6",
      title: "Cognitive Biases and Misinformation",
      description: "Explore how cognitive biases make us vulnerable to misinformation and how to overcome them.",
      category: "intermediate",
      duration: "22 min",
      icon: <Lightbulb className="w-6 h-6" />,
      lessons: 5,
    },
    {
      id: "7",
      title: "Advanced Verification Techniques",
      description: "Master advanced techniques for verifying complex claims and investigating misinformation networks.",
      category: "advanced",
      duration: "40 min",
      icon: <Users className="w-6 h-6" />,
      lessons: 8,
    },
    {
      id: "8",
      title: "Building Resilience Against Misinformation",
      description: "Learn strategies to build personal and community resilience against misinformation campaigns.",
      category: "advanced",
      duration: "35 min",
      icon: <Award className="w-6 h-6" />,
      lessons: 7,
    },
  ]

  const filteredGuides = selectedCategory === "all" ? guides : guides.filter((g) => g.category === selectedCategory)

  const categoryStats = {
    beginner: guides.filter((g) => g.category === "beginner").length,
    intermediate: guides.filter((g) => g.category === "intermediate").length,
    advanced: guides.filter((g) => g.category === "advanced").length,
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
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-4xl font-bold">Learn & Educate</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Master the skills to identify misinformation, verify claims, and protect yourself and your community from
            false information.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCategory === "all" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-semibold">All Guides</p>
              <p className="text-sm text-muted-foreground">{guides.length} courses</p>
            </button>

            <button
              onClick={() => setSelectedCategory("beginner")}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCategory === "beginner"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-semibold">Beginner</p>
              <p className="text-sm text-muted-foreground">{categoryStats.beginner} courses</p>
            </button>

            <button
              onClick={() => setSelectedCategory("intermediate")}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCategory === "intermediate"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-semibold">Intermediate</p>
              <p className="text-sm text-muted-foreground">{categoryStats.intermediate} courses</p>
            </button>

            <button
              onClick={() => setSelectedCategory("advanced")}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCategory === "advanced"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-semibold">Advanced</p>
              <p className="text-sm text-muted-foreground">{categoryStats.advanced} courses</p>
            </button>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredGuides.map((guide) => (
            <Link key={guide.id} href={`/learn/${guide.id}`}>
              <Card className="h-full p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    {guide.icon}
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      guide.category === "beginner"
                        ? "bg-green-500/10 text-green-500"
                        : guide.category === "intermediate"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{guide.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{guide.duration}</span>
                    <span>{guide.lessons} lessons</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Tips for Spotting Misinformation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Check the Source",
                description: "Verify the credibility and reputation of the source before trusting the information.",
              },
              {
                title: "Look for Evidence",
                description: "Reliable information is backed by credible sources, data, and expert opinions.",
              },
              {
                title: "Check the Date",
                description: "Outdated information can be misleading. Always check when the content was published.",
              },
              {
                title: "Verify with Multiple Sources",
                description: "Cross-reference information across multiple reliable sources to confirm accuracy.",
              },
              {
                title: "Identify Emotional Language",
                description: "Misinformation often uses sensational or emotionally charged language to manipulate.",
              },
              {
                title: "Check for Bias",
                description: "Be aware of potential biases in the source and presentation of information.",
              },
            ].map((tip, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  {tip.title}
                </h4>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-2">For Journalists</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Professional tools and techniques for verifying sources and investigating misinformation.
              </p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Explore Resources
              </Button>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-2">For Educators</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Curriculum materials and lesson plans to teach media literacy and critical thinking.
              </p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Explore Resources
              </Button>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-2">For Researchers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Academic papers, datasets, and tools for studying misinformation patterns.
              </p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Explore Resources
              </Button>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-2">For General Public</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Practical guides and tips for everyday users to protect themselves online.
              </p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Explore Resources
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
