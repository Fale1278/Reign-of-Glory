import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Calendar as CalendarIcon, ArrowRight } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Night of Worship",
    date: "Nov 11, 2023",
    time: "7:00 PM",
    location: "Main Sanctuary",
    description: "Join us for an extended time of worship and encountering the presence of God.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Youth Conference 2023",
    date: "Nov 18, 2023",
    time: "10:00 AM",
    location: "Youth Center",
    description: "A transformative weekend for youth and young adults to discover their purpose.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop"
  }
]

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Join our community in fellowship, worship, and growth.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                <div className="md:w-1/3 aspect-video md:aspect-auto relative">
                  <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
                </div>
                <CardContent className="p-6 md:w-2/3 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-4 text-sm text-primary font-medium mb-3">
                    <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> {event.date}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {event.time}</span>
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {event.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  <Button asChild className="self-start">
                    <Link href={`/events/${event.id}`}>View Details & Register <ArrowRight className="ml-2 w-4 h-4" /></Link>
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
