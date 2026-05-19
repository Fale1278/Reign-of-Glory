import { getMediaItems, getComments } from "@/lib/db"
import { MediaGalleryClient } from "@/components/MediaGalleryClient"
import { Play } from "lucide-react"

export const metadata = {
  title: "Media Gallery | Reign of Glory Ministries",
  description: "Browse, listen, download, and comment on Reign of Glory Ministries' images, audios, and video resources.",
}

export default async function MediaPage() {
  const items = await getMediaItems()
  const comments = await getComments()

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 space-y-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur">
            <Play className="w-6 h-6 text-primary-foreground animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Media Gallery</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90 font-light">
            Access, download, and comment on our collection of inspirational sermon audios, fellowship videos, and church event highlights.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-muted/20 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          <MediaGalleryClient initialItems={items} initialComments={comments} />
        </div>
      </section>
    </div>
  )
}
