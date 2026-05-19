"use client"

import React, { useState } from "react"
import { ArrowLeft, Search, Edit, Trash2, Music, Film, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import Link from "next/link"
import { removeMediaItem, editMediaItem } from "@/app/actions"
import { MediaItemRow } from "@/lib/db"

interface AdminMediaManagerProps {
  initialItems: MediaItemRow[]
}

export function AdminMediaManager({ initialItems }: AdminMediaManagerProps) {
  const [items, setItems] = useState<MediaItemRow[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "image" | "audio" | "video">("all")
  const [editingItem, setEditingItem] = useState<MediaItemRow | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = activeFilter === "all" || item.type === activeFilter
    return matchesSearch && matchesFilter
  })

  // Delete Action
  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await removeMediaItem(id)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success("Media item deleted successfully!")
        setItems(prev => prev.filter(item => item.id !== id))
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete media item.")
    } finally {
      setDeletingId(null)
    }
  }

  // Edit/Update Action
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingItem) return
    setIsSaving(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("id", editingItem.id)

    try {
      const res = await editMediaItem(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success("Media item updated successfully!")
        
        // Update state
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const type = formData.get("type") as string
        const file_url = formData.get("file_url") as string

        setItems(prev =>
          prev.map(item =>
            item.id === editingItem.id
              ? { ...item, title, description: description || null, type, file_url }
              : item
          )
        )
        setEditingItem(null)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update media item.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="/admin" aria-label="Back to Admin Dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Manage Church Media</h1>
            <p className="text-sm text-muted-foreground">Modify or delete uploaded images, audios, and video resources.</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto">
          {(["all", "image", "audio", "video"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/75"
              }`}
            >
              {filter === "all" ? "All types" : filter + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
          <h3 className="text-xl font-bold text-muted-foreground">No media found</h3>
          <p className="text-muted-foreground mt-1">Try updating your search query or upload new media.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                {item.type === "image" && (
                  <img
                    src={item.file_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === "audio" && (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-primary/5">
                    <Music className="w-10 h-10 text-primary" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-primary">Audio</span>
                  </div>
                )}
                {item.type === "video" && (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-primary/5">
                    <Film className="w-10 h-10 text-primary" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-primary">Video</span>
                  </div>
                )}
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-background/90 text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm flex items-center gap-1">
                  {item.type}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description || "No description provided."}</p>
                  <p className="text-[10px] text-muted-foreground/80 mt-2 truncate bg-muted/50 p-1.5 rounded border border-dashed">
                    URL: {item.file_url}
                  </p>
                </div>

                <div className="flex gap-2 justify-end border-t pt-3 mt-4">
                  <Button
                    onClick={() => setEditingItem(item)}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1.5"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive/30"
                    disabled={deletingId === item.id}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> {deletingId === item.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal (Overlay card) */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <CardHeader>
              <CardTitle>Edit Media Item</CardTitle>
              <CardDescription>Update the title, description, or URL link of the selected media.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <label htmlFor="edit-title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Media Title
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    required
                    defaultValue={editingItem.title}
                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label htmlFor="edit-desc" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Description
                  </label>
                  <textarea
                    id="edit-desc"
                    name="description"
                    rows={3}
                    defaultValue={editingItem.description || ""}
                    className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                {/* Type Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Type
                  </label>
                  <select
                    name="type"
                    defaultValue={editingItem.type}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <option value="image">Image</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                {/* URL */}
                <div className="space-y-1">
                  <label htmlFor="edit-url" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    File Resource Link (URL)
                  </label>
                  <input
                    type="text"
                    id="edit-url"
                    name="file_url"
                    required
                    defaultValue={editingItem.file_url}
                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
