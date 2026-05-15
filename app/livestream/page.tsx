import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LivestreamPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Watch Live</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Join our worship services online.
          </p>
        </div>
      </section>

      <section className="py-12 flex-1 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-lg flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <PlayCircle className="w-16 h-16 mx-auto opacity-80" />
                  <p className="text-lg">Broadcast is currently offline</p>
                  <p className="text-sm text-gray-400">Next stream: Sunday at 9:00 AM</p>
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <h2 className="text-2xl font-bold mb-2">Sunday Worship Service</h2>
                <p className="text-muted-foreground mb-4">Welcome to Reign of Glory online! We&apos;re so glad you&apos;re joining us today. Let&apos;s worship God together and hear His Word.</p>
                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link href="/give">Give Offering</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/prayer">Request Prayer</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Live Chat Placeholder */}
            <div className="bg-card rounded-xl shadow-sm border h-[600px] flex flex-col">
              <div className="p-4 border-b flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Live Chat</h3>
              </div>
              <div className="flex-1 p-4 bg-muted/10 flex flex-col justify-center items-center text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">Chat is available during live broadcasts.</p>
              </div>
              <div className="p-4 border-t">
                <input 
                  type="text" 
                  disabled
                  placeholder="Sign in to chat..." 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
