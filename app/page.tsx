import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Calendar, Video, ArrowRight, Heart, Mail, Quote } from "lucide-react"
import { getSermons, getEvents } from "@/lib/db"

export default async function Home() {
  const [sermons, events] = await Promise.all([getSermons(), getEvents()])
  const latestSermon = sermons[0] || null
  const upcomingEvents = events.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
          alt="Church Worship"
          fill
          priority
          className="object-cover"
        />
        <div className="container relative z-20 mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
            Reign of <span className="text-primary-foreground underline decoration-primary/30">Glory</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light opacity-90 leading-relaxed">
            Equipping believers, reaching the lost, and manifesting God&apos;s glory in our generation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg px-10 h-14 bg-white text-black hover:bg-white/90 rounded-full">
              <Link href="/visit">Plan a Visit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 h-14 border-white text-white hover:bg-white/10 hover:text-white rounded-full backdrop-blur-sm">
              <Link href="/livestream">Watch Live</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Times & Location */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-xl bg-background transform transition-transform hover:-translate-y-1">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Service Times</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3 text-muted-foreground">
                <p><strong>Sunday Worship:</strong> 9:00 AM & 11:30 AM</p>
                <p><strong>Wednesday Bible Study:</strong> 6:30 PM</p>
                <p><strong>Friday Prayer:</strong> 6:00 PM</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-background transform transition-transform hover:-translate-y-1">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground space-y-2">
                <p>123 Glory Avenue</p>
                <p>City Center, ST 12345</p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link href="/visit" className="flex items-center">Get Directions <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-background transform transition-transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>New Here?</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground space-y-2">
                <p>We would love to connect with you. Join us this Sunday and experience God&apos;s presence.</p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link href="/about" className="flex items-center">Connect With Us <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Sermon & Events */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3 space-y-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-4xl font-bold tracking-tight">Latest Sermon</h2>
                <Button variant="ghost" asChild className="group">
                  <Link href="/sermons">View Library <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                </Button>
              </div>
              {latestSermon ? (
                <div className="group relative rounded-3xl overflow-hidden shadow-2xl border bg-card">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500 z-10 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform transition-transform group-hover:scale-110">
                        <Video className="w-10 h-10 text-white fill-white/20" />
                      </div>
                    </div>
                    <Image 
                      src={latestSermon.thumbnail}
                      alt={latestSermon.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm font-bold text-primary uppercase tracking-widest mb-4">
                      <span>{new Date(latestSermon.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      <span>{latestSermon.speaker}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{latestSermon.title}</h3>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed line-clamp-2">{latestSermon.description}</p>
                    <Button asChild className="w-full md:w-auto px-10 h-12 rounded-full">
                      <Link href={`/sermons/${latestSermon.id}`}>Watch Now</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-lg">No sermons available yet.</p>
              )}
            </div>

            <div className="lg:w-1/3 space-y-8">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-3xl font-bold tracking-tight">Events</h2>
                <Button variant="ghost" asChild>
                  <Link href="/events">See All</Link>
                </Button>
              </div>
              <div className="space-y-6">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => {
                    const eDate = new Date(event.date)
                    const month = eDate.toLocaleDateString("en-US", { month: "short" })
                    const day = eDate.toLocaleDateString("en-US", { day: "2-digit" })
                    const time = eDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
                    return (
                      <Link key={event.id} href={`/events/${event.id}`} className="flex gap-6 group cursor-pointer">
                        <div className="bg-primary/10 text-primary rounded-2xl p-4 text-center min-w-[85px] h-[85px] flex flex-col justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                          <p className="text-xs font-bold uppercase tracking-widest">{month}</p>
                          <p className="text-2xl font-black">{day}</p>
                        </div>
                        <div className="flex-1 border-b pb-4">
                          <h4 className="font-bold text-xl group-hover:text-primary transition-colors">{event.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-2 gap-4">
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {time}</span>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                ) : (
                  <p className="text-muted-foreground text-lg">No upcoming events.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Quote className="w-12 h-12 text-primary/20 mx-auto mb-8" />
          <h2 className="text-4xl font-bold mb-16 tracking-tight">Testimonies of Grace</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", text: "Finding Reign of Glory has been the greatest blessing for my family. The community is so welcoming and the teachings are life-changing." },
              { name: "Michael T.", text: "I was lost and searching for meaning. Through the ministries here, I found my purpose and a relationship with Christ." },
              { name: "Linda R.", text: "The prayer team stood with me through my darkest hour. I am a living testimony of God's healing power." }
            ].map((t, i) => (
              <Card key={i} className="border-none shadow-xl bg-background p-8 text-left relative">
                <p className="text-muted-foreground italic mb-6 text-lg">&ldquo;{t.text}&rdquo;</p>
                <p className="font-bold text-primary">— {t.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 border-y">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-muted-foreground text-lg mb-10">Receive weekly devotionals, event updates, and news directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-12 rounded-full border border-input bg-background px-6 outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
            <Button className="h-12 px-8 rounded-full">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Need Prayer?</h2>
          <p className="text-xl mb-12 text-primary-foreground/90 font-light max-w-2xl mx-auto">
            Our prayer team is ready to stand with you in faith. Whatever you are going through, you don&apos;t have to carry it alone.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-12 h-16 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform bg-white text-black hover:bg-white/90">
            <Link href="/prayer">Submit Prayer Request</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
