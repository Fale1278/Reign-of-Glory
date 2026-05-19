import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, BookOpen } from "lucide-react"
import Link from "next/link"
import { getBlogPostBySlug } from "@/lib/db"

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  const formattedDate = new Date(post.published_at || "").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  })

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/blog"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog</Link>
          </Button>

          <article className="bg-card border rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-video relative overflow-hidden bg-muted">
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-12 space-y-6">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b pb-6">
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> {formattedDate}</span>
                <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> {post.author}</span>
                <span className="flex items-center font-medium text-primary"><BookOpen className="w-4 h-4 mr-1.5" /> Devotional</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{post.title}</h1>

              <div className="prose max-w-none text-lg text-muted-foreground leading-relaxed space-y-6 pt-4">
                {post.content.split("\n\n").map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
