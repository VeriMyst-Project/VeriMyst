"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, ArrowLeft, CheckCircle2, Clock, BookOpen } from "lucide-react"

interface Lesson {
  id: string
  title: string
  content: string
  duration: string
}

interface GuideDetail {
  id: string
  title: string
  description: string
  category: "beginner" | "intermediate" | "advanced"
  duration: string
  lessons: Lesson[]
  keyTakeaways: string[]
}

const guides: Record<string, GuideDetail> = {
  "1": {
    id: "1",
    title: "Understanding Misinformation",
    description: "Learn what misinformation is, how it spreads, and why it matters in today's digital world.",
    category: "beginner",
    duration: "15 min",
    lessons: [
      {
        id: "1-1",
        title: "What is Misinformation?",
        content:
          "Misinformation is false or inaccurate information, regardless of intent to deceive. It differs from disinformation, which is deliberately false information spread to manipulate. Understanding this distinction is crucial for effective fact-checking.",
        duration: "4 min",
      },
      {
        id: "1-2",
        title: "How Misinformation Spreads",
        content:
          "Misinformation spreads rapidly through social media, messaging apps, and word-of-mouth. Factors like emotional content, confirmation bias, and algorithmic amplification accelerate its spread. Understanding these mechanisms helps us combat it effectively.",
        duration: "4 min",
      },
      {
        id: "1-3",
        title: "Impact of Misinformation",
        content:
          "Misinformation can harm public health, undermine trust in institutions, influence elections, and damage reputations. The consequences are real and far-reaching, affecting individuals and society as a whole.",
        duration: "4 min",
      },
      {
        id: "1-4",
        title: "Why We Fall for It",
        content:
          "Cognitive biases, emotional triggers, and our tendency to believe information that aligns with our existing beliefs make us vulnerable to misinformation. Awareness of these vulnerabilities is the first step to protection.",
        duration: "3 min",
      },
    ],
    keyTakeaways: [
      "Misinformation is false information spread without intent to deceive",
      "It spreads rapidly through social media and emotional content",
      "Understanding cognitive biases helps us resist misinformation",
      "Critical thinking and verification are essential defenses",
    ],
  },
  "2": {
    id: "2",
    title: "Identifying Fake News",
    description: "Master the techniques to spot fake news articles, manipulated images, and misleading headlines.",
    category: "beginner",
    duration: "20 min",
    lessons: [
      {
        id: "2-1",
        title: "Red Flags in Headlines",
        content:
          "Fake news often uses sensational, emotionally charged, or misleading headlines. Look for ALL CAPS, excessive punctuation, or claims that seem too good to be true. Legitimate news outlets use clear, factual headlines.",
        duration: "4 min",
      },
      {
        id: "2-2",
        title: "Analyzing Article Content",
        content:
          "Check if the article cites credible sources, includes author information, and provides verifiable facts. Fake news often lacks proper attribution, uses vague language, or makes unsupported claims.",
        duration: "4 min",
      },
      {
        id: "2-3",
        title: "Spotting Manipulated Images",
        content:
          "Images can be edited, taken out of context, or from completely different events. Use reverse image search to find the original source and verify when and where it was taken.",
        duration: "4 min",
      },
      {
        id: "2-4",
        title: "Checking Publication Details",
        content:
          "Verify the publication date, author, and website domain. Fake news sites often mimic legitimate news outlets with slightly different URLs. Check the 'About Us' section for credibility information.",
        duration: "4 min",
      },
      {
        id: "2-5",
        title: "Using Fact-Checking Tools",
        content:
          "Leverage fact-checking websites, reverse image search, and verification tools to confirm information. These resources can quickly identify known false claims and provide credible sources.",
        duration: "4 min",
      },
    ],
    keyTakeaways: [
      "Sensational headlines are often a sign of fake news",
      "Verify sources and check for author attribution",
      "Use reverse image search to verify photos",
      "Check publication details and website credibility",
    ],
  },
}

export default function GuidePage({ params }: { params: { guideId: string } }) {
  const guide = guides[params.guideId]
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Guide not found</p>
          <Link href="/learn">
            <Button>Back to Learning</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const currentLesson = guide.lessons[currentLessonIndex]
  const progressPercentage = ((completedLessons.length + 1) / guide.lessons.length) * 100

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId],
    )
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
          <Link href="/learn">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Guides
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Guide Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded text-xs font-medium ${
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
              <h1 className="text-4xl font-bold mb-2">{guide.title}</h1>
              <p className="text-muted-foreground text-lg">{guide.description}</p>
            </div>

            {/* Progress Bar */}
            <Card className="p-4 mb-8 border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Progress</p>
                <p className="text-sm font-semibold">{Math.round(progressPercentage)}%</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </Card>

            {/* Lesson Content */}
            <Card className="p-8 border border-border mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {currentLesson.duration}
                </div>
                <div className="text-sm text-muted-foreground">
                  Lesson {currentLessonIndex + 1} of {guide.lessons.length}
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-foreground leading-relaxed">{currentLesson.content}</p>
              </div>

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                  disabled={currentLessonIndex === 0}
                >
                  Previous Lesson
                </Button>

                <Button
                  onClick={() => toggleLessonComplete(currentLesson.id)}
                  className={completedLessons.includes(currentLesson.id) ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {completedLessons.includes(currentLesson.id) ? "Completed" : "Mark as Complete"}
                </Button>

                <Button
                  onClick={() => setCurrentLessonIndex(Math.min(guide.lessons.length - 1, currentLessonIndex + 1))}
                  disabled={currentLessonIndex === guide.lessons.length - 1}
                >
                  Next Lesson
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guide Info */}
            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-4">Guide Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total Duration</p>
                  <p className="font-semibold">{guide.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                  <p className="font-semibold">{guide.lessons.length}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="font-semibold">{completedLessons.length}</p>
                </div>
              </div>
            </Card>

            {/* Lessons List */}
            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-4">Lessons</h3>
              <div className="space-y-2">
                {guide.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      currentLessonIndex === index
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {completedLessons.includes(lesson.id) ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-border flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Key Takeaways */}
            <Card className="p-6 border border-border bg-primary/5">
              <h3 className="font-semibold mb-3">Key Takeaways</h3>
              <ul className="space-y-2">
                {guide.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span className="text-muted-foreground">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
