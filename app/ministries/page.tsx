import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Music, HeartHandshake } from "lucide-react"

const ministries = [
  {
    id: 1,
    name: "Youth Ministry",
    icon: <Users className="w-12 h-12 text-primary" />,
    description: "Empowering the next generation to encounter God, discover their purpose, and change the world.",
    meetingTime: "Fridays @ 7:00 PM"
  },
  {
    id: 2,
    name: "Women's Ministry",
    icon: <HeartHandshake className="w-12 h-12 text-primary" />,
    description: "A community of women growing together in faith, building lasting friendships, and serving others.",
    meetingTime: "2nd & 4th Saturdays @ 10:00 AM"
  },
  {
    id: 3,
    name: "Men's Ministry",
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    description: "Equipping men to be godly leaders in their homes, workplaces, and communities.",
    meetingTime: "1st & 3rd Saturdays @ 8:30 AM"
  },
  {
    id: 4,
    name: "Worship & Media",
    icon: <Music className="w-12 h-12 text-primary" />,
    description: "Leading the congregation into the presence of God through music, creativity, and technology.",
    meetingTime: "Thursdays @ 6:30 PM (Rehearsal)"
  }
]

export default function MinistriesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Ministries</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Find your place to grow, serve, and connect with others.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ministries.map((ministry) => (
              <Card key={ministry.id} className="border-none shadow-md hover:shadow-lg transition-shadow bg-muted/30">
                <CardContent className="p-8 text-center space-y-4 flex flex-col items-center">
                  <div className="bg-background p-4 rounded-full shadow-sm mb-2">
                    {ministry.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{ministry.name}</h3>
                  <p className="text-muted-foreground flex-1">
                    {ministry.description}
                  </p>
                  <div className="pt-4 mt-4 border-t w-full">
                    <p className="font-medium text-sm">Meeting Time:</p>
                    <p className="text-primary">{ministry.meetingTime}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
