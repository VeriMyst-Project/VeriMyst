"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface ClaimVerifierProps {
  onVerify: (claim: string) => void
  isLoading?: boolean
}

export function ClaimVerifier({ onVerify, isLoading = false }: ClaimVerifierProps) {
  const [claim, setClaim] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (claim.trim()) {
      onVerify(claim)
      setClaim("")
    }
  }

  const suggestedClaims = [
    "COVID-19 vaccines cause autism",
    "The moon landing was faked",
    "5G causes COVID-19",
    "Climate change is a hoax",
  ]

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Enter a claim to verify</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="e.g., 'Vaccines contain microchips'"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!claim.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Search className="w-4 h-4" />
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </form>

      {/* Suggested Claims */}
      <div>
        <p className="text-sm font-medium mb-3">Try verifying these common claims:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestedClaims.map((suggestedClaim, index) => (
            <button
              key={index}
              onClick={() => {
                setClaim(suggestedClaim)
                onVerify(suggestedClaim)
              }}
              disabled={isLoading}
              className="p-3 text-left text-sm border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-50"
            >
              {suggestedClaim}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
