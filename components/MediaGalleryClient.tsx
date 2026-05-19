"use client"

import React, { useState } from "react"
import { Download, MessageSquare, Send, Image as ImageIcon, Volume2, Video as VideoIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { submitComment } from "@/app/actions"
import { MediaItemRow, CommentRow } from "@/lib/db"

interface MediaGalleryClientProps {
  initialItems: MediaItemRow[]
  initialComments: CommentRow[]
}

export function MediaGalleryClient({ initialItems, initialComments }: MediaGalleryClientProps) {
  const [comments, setComments] = useState<CommentRow[]>(initialComments)
  const [activeTab, setActiveTab] = useState<"all" | "image" | "audio" | "video">("all")
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({})
  const [submittingComment, setSubmittingComment] = useState<Record<string, boolean>>({})

  // Filter items
  const filteredItems = initialItems.filter(item => activeTab === "all" || item.type === activeTab)

  const toggleComments = (id: string) => {
    setOpenComments(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>, mediaId: string) => {
    e.preventDefault()
    setSubmittingComment(prev => ({ ...prev, [mediaId]: true }))

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("media_id", mediaId)

    try {
      const res = await submitComment(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success("Comment added successfully!")
        
        // Optimistically add comment to state
        const name = formData.get("name") as string
        const commentText = formData.get("comment") as string
        const newComment: CommentRow = {
          id: "temp_" + Math.random().toString(36).substring(2, 9),
          media_id: mediaId,
          name,
          comment: commentText,
          created_at: new Date().toISOString()
        }
        setComments(prev => [...prev, newComment])
        form.reset()
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to add comment.")
    } finally {
      setSubmittingComment(prev => ({ ...prev, [mediaId]: false }))
    }
  }

  return (
    <div className="space-y-8">
      {/* Tab Filters */}
      <div className="flex justify-center gap-2 border-b pb-4">
        {(["all", "image", "audio", "video"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab === "all" ? "All Media" : tab + "s"}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
          <ImageIcon className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-muted-foreground">No media files found</h3>
          <p className="text-muted-foreground mt-1">Check back later or upload new media via the Admin panel.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const itemComments = comments.filter(c => c.media_id === item.id)
            const showComments = !!openComments[item.id]

            return (
              <Card key={item.id} className="overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  {/* Preview Section */}
                  <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden group">
                    {item.type === "image" && (
                      <img
                        src={item.file_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                    )}
                    {item.type === "audio" && (
                      <div className="p-6 w-full h-full flex flex-col justify-between bg-primary/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Volume2 className="w-5 h-5" />
                          </div>
                          <span className="text-xs uppercase tracking-wider font-semibold text-primary">Audio Resource</span>
                        </div>
                        <audio controls className="w-full" src={item.file_url} />
                      </div>
                    )}
                    {item.type === "video" && (
                      <video
                        controls
                        src={item.file_url}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Floating Badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-background/80 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      {item.type === "image" && <ImageIcon className="w-3.5 h-3.5" />}
                      {item.type === "audio" && <Volume2 className="w-3.5 h-3.5" />}
                      {item.type === "video" && <VideoIcon className="w-3.5 h-3.5" />}
                      {item.type}
                    </span>
                  </div>

                  <CardHeader className="p-6">
                    <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                    {item.description && (
                      <CardDescription className="line-clamp-2 mt-2">{item.description}</CardDescription>
                    )}
                  </CardHeader>
                </div>

                <CardContent className="px-6 pb-6 pt-0 space-y-4">
                  {/* Actions Bar */}
                  <div className="flex items-center gap-2 justify-between border-t pt-4">
                    <button
                      onClick={() => toggleComments(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-muted text-muted-foreground rounded-lg text-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{itemComments.length} Comments</span>
                    </button>

                    <a
                      href={item.file_url}
                      download={item.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </a>
                  </div>

                  {/* Comments Drawer / Section */}
                  {showComments && (
                    <div className="border-t pt-4 space-y-4">
                      <h4 className="font-bold text-sm text-foreground">Comments</h4>
                      
                      <div className="max-h-48 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {itemComments.length === 0 ? (
                          <p className="text-xs text-muted-foreground italic">No comments yet. Be the first to say something!</p>
                        ) : (
                          itemComments.map((comment) => (
                            <div key={comment.id} className="p-3 bg-muted/40 rounded-xl space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-foreground flex items-center gap-1">
                                  <User className="w-3 h-3 text-primary" /> {comment.name}
                                </span>
                                <span className="text-muted-foreground/75">
                                  {new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{comment.comment}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Comment Input Form */}
                      <form onSubmit={(e) => handleCommentSubmit(e, item.id)} className="space-y-2 mt-2">
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your Name"
                          className="w-full text-xs h-8 px-2.5 rounded-md border bg-background focus:ring-1 focus:ring-primary outline-none"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="comment"
                            required
                            placeholder="Add a comment..."
                            className="flex-1 text-xs h-8 px-2.5 rounded-md border bg-background focus:ring-1 focus:ring-primary outline-none"
                          />
                          <Button
                            type="submit"
                            size="sm"
                            className="h-8 w-8 p-0 shrink-0"
                            disabled={submittingComment[item.id]}
                          >
                            <Send className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
