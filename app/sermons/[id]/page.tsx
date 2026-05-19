import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Video, FileText } from "lucide-react"
import Link from "next/link"
import { getSermonById } from "@/lib/db"

export default async function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sermon = await getSermonById(id)
  
  const formattedDate = new Date(sermon.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  })

  const scripture = sermon.scripture_references && sermon.scripture_references.length > 0
    ? sermon.scripture_references.join(", ")
    : "Hebrews 11:1"


  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/sermons"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Sermons</Link>
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg border">
                <iframe 
                  src={sermon.video_url}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">{sermon.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b pb-4">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {formattedDate}</span>
                  <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {sermon.speaker}</span>
                  <span className="flex items-center font-semibold text-primary"><FileText className="w-4 h-4 mr-1" /> {scripture}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {sermon.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed pt-4">
                  {sermon.description}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Sermon Notes</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Download the sermon outline and study guide to follow along and deepen your study.
                </p>
                <Button className="w-full" variant="outline">
                  Download PDF
                </Button>
              </div>
              
              <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Need Prayer?</h3>
                <p className="opacity-90 text-sm mb-6">
                  After hearing this message, if you would like someone to stand with you in prayer, we are here for you.
                </p>
                <Button asChild variant="secondary" className="w-full bg-white text-black hover:bg-white/90">
                  <Link href="/prayer">Submit Request</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
