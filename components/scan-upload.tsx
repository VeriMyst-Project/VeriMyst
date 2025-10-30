"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, ImageIcon, Music, Video } from "lucide-react"

interface ScanUploadProps {
  onUpload: (file: File, contentType: string) => void
  isLoading?: boolean
}

export function ScanUpload({ onUpload, isLoading = false }: ScanUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const contentTypes = [
    { id: "text", label: "Text", icon: FileText, accept: ".txt,.md,.pdf" },
    { id: "image", label: "Image", icon: ImageIcon, accept: "image/*" },
    { id: "audio", label: "Audio", icon: Music, accept: "audio/*" },
    { id: "video", label: "Video", icon: Video, accept: "video/*" },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0] && selectedType) {
      onUpload(files[0], selectedType)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files[0] && selectedType) {
      onUpload(files[0], selectedType)
    }
  }

  return (
    <div className="space-y-6">
      {/* Content Type Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Content Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedType === type.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
              }`}
            >
              <type.icon className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{type.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      {selectedType && (
        <Card
          className={`p-8 border-2 border-dashed transition-all ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-semibold mb-2">Upload {selectedType}</h4>
            <p className="text-muted-foreground mb-4">Drag and drop your file here or click to browse</p>

            <label>
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading}
                accept={contentTypes.find((t) => t.id === selectedType)?.accept}
              />
              <Button
                type="button"
                onClick={(e) => {
                  const input = (e.currentTarget.parentElement as HTMLLabelElement).querySelector("input")
                  input?.click()
                }}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Uploading..." : "Choose File"}
              </Button>
            </label>
          </div>
        </Card>
      )}

      {/* Text Input Alternative */}
      {selectedType === "text" && (
        <div>
          <h4 className="text-sm font-medium mb-2">Or paste text directly</h4>
          <textarea
            placeholder="Paste your text content here..."
            className="w-full h-32 p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  )
}
