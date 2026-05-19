import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import { getEventById } from "@/lib/db"
import EventRegistrationForm from "@/components/EventRegistrationForm"

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getEventById(id)

  const eDate = new Date(event.date)
  const formattedDate = eDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
  const formattedTime = eDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  })

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={event.image_url} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <Button asChild variant="ghost" className="mb-auto mt-8 text-white hover:bg-white/20 w-fit">
            <Link href="/events"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Events</Link>
          </Button>
          <div className="space-y-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm font-semibold uppercase tracking-wider">Upcoming Event</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{event.title}</h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">About the Event</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Doors open 30 minutes before the event begins. We recommend arriving early as seating is on a first-come, first-served basis.
                </p>
              </div>

              <div className="pt-8 border-t">
                <h3 className="text-2xl font-bold mb-6">Location Map</h3>
                <div className="aspect-video bg-muted rounded-xl border flex items-center justify-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mr-2" /> {event.location}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="shadow-lg border-primary/20 sticky top-24">
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-semibold">{formattedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t pt-6">
                  <h4 className="text-lg font-bold w-full text-left">Register for this Event</h4>
                  <EventRegistrationForm eventId={event.id} />
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
