"use client"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Shield,
  MessageSquare,
  BarChart3,
  BookOpen,
  Zap,
  Users,
  Globe,
  Sparkles,
  TrendingUp,
  Lock,
  Lightbulb,
  Sun,   
  Moon,  
} from "lucide-react"



export default function Home() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const mainFeatures = [
    {
      icon: Shield,
      title: "Scan Content",
      description: "Analyze text, images, audio, and video for misinformation with AI-powered detection",
      color: "from-blue-500 to-cyan-500",
      path: "/scanner",
    },
    {
      icon: MessageSquare,
      title: "AI Chat Assistant",
      description: "Chat with our multilingual AI to understand misinformation and get fact-checking help",
      color: "from-purple-500 to-pink-500",
      path: "/chat",
    },
    {
      icon: Zap,
      title: "Quick Verify",
      description: "Instantly verify claims and get credibility scores from trusted sources",
      color: "from-yellow-500 to-orange-500",
      path: "/verify",
    },
  ]

  const secondaryFeatures = [
    {
      icon: BookOpen,
      title: "Learn & Educate",
      description: "Access 8 comprehensive guides to combat misinformation",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "View detailed statistics and trends about misinformation detection",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Support for English, Hindi, and Gujarati languages",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  const stats = [
    { label: "Content Types", value: "4", description: "Text, Image, Audio, Video" },
    { label: "Languages", value: "3", description: "English, Hindi, Gujarati" },
    { label: "Features", value: "7", description: "Comprehensive tools" },
    { label: "Accuracy", value: "AI-Powered", description: "Real-time detection" },
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Upload Content",
      description: "Share text, image, audio, or video you want to verify",
    },
    {
      step: "2",
      title: "AI Analysis",
      description: "Our AI analyzes the content for misinformation patterns",
    },
    {
      step: "3",
      title: "Get Results",
      description: "Receive trust score, risk level, and detailed findings",
    },
    {
      step: "4",
      title: "Learn & Share",
      description: "Understand the reasoning and share results with others",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Navigation */}
          <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary text-background shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground truncate">
            VeriMyst
          </span>
          
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
            Misinformation Defense
          </span>

          {/* <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full border border-border/50 hover:bg-accent/20">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
           </Button>
        </div>
      </div>
    </nav>


      {/* Hero Section - Enhanced */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
        <div className="mb-4 sm:mb-6 inline-block">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium">
            Powered by AI • Multilingual • Free to Use
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
          Defend Against{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Misinformation
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto text-balance leading-relaxed px-2">
          Real-time AI-powered detection, multilingual support, and community-driven fact-checking to help you identify
          and combat false information across all media types.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-2">
          <Button
            size="lg"
            onClick={() => router.push("/dashboard")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
          >
            Let's Use VeriMyst
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/learn")}
            className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
          >
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16 pt-8 sm:pt-16 border-t border-border/40">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground mb-0.5 sm:mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20 bg-card/50 rounded-xl sm:rounded-2xl my-8 sm:my-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 sm:mb-16 text-center">How VeriMyst Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {howItWorks.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-white flex-shrink-0">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
              </div>
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-7 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-4 text-center">Core Features</h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-16 text-center max-w-2xl mx-auto px-2">
          Powerful tools designed to help you identify and combat misinformation effectively
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-16">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="border border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 cursor-pointer group"
                onClick={() => router.push(feature.path)}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div
                    className={`w-12 sm:w-14 h-12 sm:h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform flex-shrink-0`}
                  >
                    <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{feature.description}</p>
                  <div className="flex items-center text-primary text-xs sm:text-sm font-medium group-hover:translate-x-2 transition-transform">
                    Explore <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 ml-1 sm:ml-2" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {secondaryFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="border border-border/50 bg-card/30 backdrop-blur hover:border-primary/50 transition-all"
              >
                <div className="p-4 sm:p-5 md:p-6">
                  <div
                    className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0`}
                  >
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 sm:mb-16 text-center">
          Why Choose VeriMyst?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              icon: Lock,
              title: "Privacy First",
              description: "Your data is secure. No tracking, no ads, no data selling. Your privacy is our priority.",
            },
            {
              icon: TrendingUp,
              title: "Real-Time Analysis",
              description: "Get instant results with our advanced AI models analyzing content in real-time.",
            },
            {
              icon: Lightbulb,
              title: "Educational",
              description: "Learn how to identify misinformation with our comprehensive guides and resources.",
            },
            {
              icon: Users,
              title: "Community Driven",
              description:
                "Join thousands of users protecting themselves and their communities from false information.",
            },
          ].map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="flex gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-lg border border-border/40 bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 sm:h-12 w-10 sm:w-12 rounded-lg bg-primary/10">
                    <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-20">
        <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 text-center backdrop-blur">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
            Ready to Defend Against Misinformation?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
            Join thousands of users protecting themselves and their communities. Start scanning, verifying, and learning
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/chat")}
              className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              Chat with AI
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-primary flex-shrink-0" />
                <span className="font-bold text-foreground text-sm sm:text-base">VeriMyst</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Defending truth, one scan at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2 sm:mb-4 text-sm sm:text-base">Features</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <a href="/scanner" className="hover:text-primary transition">
                    Scan Content
                  </a>
                </li>
                <li>
                  <a href="/chat" className="hover:text-primary transition">
                    AI Chat
                  </a>
                </li>
                <li>
                  <a href="/verify" className="hover:text-primary transition">
                    Verify Claims
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2 sm:mb-4 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>
                  <a href="/learn" className="hover:text-primary transition">
                    Learn
                  </a>
                </li>
                <li>
                  <a href="/analytics" className="hover:text-primary transition">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:text-primary transition">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2 sm:mb-4 text-sm sm:text-base">Languages</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>English</li>
                <li>Hindi</li>
                <li>Gujarati</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <p>VeriMyst - Defending Truth, One Scan at a Time | 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
