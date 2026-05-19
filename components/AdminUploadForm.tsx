"use client"

import React, { useState } from "react"
import { Upload, Link as LinkIcon, Music, Film, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { submitMediaItem } from "@/app/actions"

export default function AdminUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaType, setMediaType] = useState<"image" | "audio" | "video">("image")
  const [uploadSource, setUploadSource] = useState<"file" | "url">("file")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await submitMediaItem(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success("Church media uploaded successfully!")
        form.reset()
        setMediaType("image")
        setUploadSource("file")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to upload media item.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Upload Church Media
        </CardTitle>
        <CardDescription>
          Add new images, sermon audios, or fellowship videos to the public Media Gallery.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label htmlFor="media-title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Media Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="media-title"
              name="title"
              required
              placeholder="e.g. Sunday Service Praise Choir"
              className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="media-desc" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Description / Notes
            </label>
            <textarea
              id="media-desc"
              name="description"
              rows={2}
              placeholder="Provide a short details about this resource..."
              className="w-full flex min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {/* Type Selector */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
              Media Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "image", label: "Image", icon: ImageIcon },
                { value: "audio", label: "Audio", icon: Music },
                { value: "video", label: "Video", icon: Film }
              ] as const).map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setMediaType(type.value)}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 border rounded-lg text-sm font-semibold transition-all ${
                      mediaType === type.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-input bg-background text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </button>
                )
              })}
            </div>
            <input type="hidden" name="type" value={mediaType} />
          </div>

          {/* Upload Method Selector */}
          <div className="flex border-b pb-2 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setUploadSource("file")}
              className={`pb-1 border-b-2 transition-colors ${
                uploadSource === "file" ? "border-primary text-primary" : "border-transparent"
              }`}
            >
              Upload Local File
            </button>
            <button
              type="button"
              onClick={() => setUploadSource("url")}
              className={`pb-1 border-b-2 transition-colors ${
                uploadSource === "url" ? "border-primary text-primary" : "border-transparent"
              }`}
            >
              Paste Web Link (URL)
            </button>
          </div>

          {/* File Input */}
          {uploadSource === "file" ? (
            <div className="space-y-1">
              <label htmlFor="media-file" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Choose Local File
              </label>
              <input
                type="file"
                id="media-file"
                name="file"
                accept={
                  mediaType === "image"
                    ? "image/*"
                    : mediaType === "audio"
                    ? "audio/*"
                    : "video/*"
                }
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              <p className="text-[10px] text-muted-foreground/80 mt-1">
                Select any image, MP3, or MP4 file. For very large files, Paste Web Link is recommended.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <label htmlFor="media-url" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                Resource Link (URL)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  id="media-url"
                  name="external_url"
                  placeholder={
                    mediaType === "image"
                      ? "https://example.com/image.jpg"
                      : mediaType === "audio"
                      ? "https://example.com/song.mp3"
                      : "https://example.com/video.mp4"
                  }
                  className="w-full flex h-10 rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Save Church Media"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
