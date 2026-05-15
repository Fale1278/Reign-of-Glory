import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar as CalendarIcon, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Understanding the Power of Prayer",
    excerpt: "Prayer is not just a routine, it's a direct line to the Creator of the universe. In this post, we explore...",
    author: "Pastor John Doe",
    date: "Oct 25, 2023",
    image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Building Stronger Families Through Faith",
    excerpt: "The family unit is the foundation of a strong community. Discover how faith-centered principles can transform...",
    author: "Pastor Jane Smith",
    date: "Oct 18, 2023",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop"
  }
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Devotionals</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Encouraging words and spiritual insights to nourish your soul.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
                    <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> {post.date}</span>
                    <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {post.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>
                  <Button variant="link" className="px-0 group/btn">
                    Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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
