import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Calendar as CalendarIcon, User } from "lucide-react"

// Mock data, in production this comes from Supabase
const sermons = [
  {
    id: 1,
    title: "The Power of Faith",
    speaker: "Pastor John Doe",
    date: "Oct 29, 2023",
    thumbnail: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
    tags: ["Faith", "Growth"],
  },
  {
    id: 2,
    title: "Walking in Love",
    speaker: "Pastor Jane Smith",
    date: "Oct 22, 2023",
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop",
    tags: ["Love", "Relationships"],
  },
  {
    id: 3,
    title: "Overcoming Fear",
    speaker: "Pastor John Doe",
    date: "Oct 15, 2023",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
    tags: ["Victory", "Mindset"],
  }
]

export default function SermonsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermons</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Listen to life-transforming messages and encounter God through His Word.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon) => (
              <Card key={sermon.id} className="overflow-hidden group">
                <div className="aspect-video relative bg-muted">
                  <img src={sermon.thumbnail} alt={sermon.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
                    <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> {sermon.date}</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {sermon.speaker}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-1">{sermon.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {sermon.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full" asChild variant="outline">
                    <Link href={`/sermons/${sermon.id}`}>Watch Sermon</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
