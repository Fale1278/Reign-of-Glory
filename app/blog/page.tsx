import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar as CalendarIcon, User, ArrowRight } from "lucide-react"
import { getBlogPosts } from "@/lib/db"

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

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
            {blogPosts.map((post) => {
              const formattedDate = new Date(post.published_at || "").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC"
              })
              const excerpt = post.content ? post.content.substring(0, 150) + "..." : ""
              return (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
                          <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> {formattedDate}</span>
                          <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {post.author}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-muted-foreground mb-6 line-clamp-3">{excerpt}</p>
                      </div>
                      <Button variant="link" className="px-0 group/btn self-start">
                        Read More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
