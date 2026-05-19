import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Music, HeartHandshake } from "lucide-react"
import { getMinistries } from "@/lib/db"

function getMinistryIcon(name: string) {
  const normalizedName = name.toLowerCase()
  if (normalizedName.includes("youth")) {
    return <Users className="w-12 h-12 text-primary" />
  }
  if (normalizedName.includes("women")) {
    return <HeartHandshake className="w-12 h-12 text-primary" />
  }
  if (normalizedName.includes("men")) {
    return <BookOpen className="w-12 h-12 text-primary" />
  }
  if (normalizedName.includes("worship") || normalizedName.includes("music") || normalizedName.includes("media")) {
    return <Music className="w-12 h-12 text-primary" />
  }
  return <Users className="w-12 h-12 text-primary" />
}

export default async function MinistriesPage() {
  const ministries = await getMinistries()

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
                    {getMinistryIcon(ministry.name)}
                  </div>
                  <h3 className="text-2xl font-bold">{ministry.name}</h3>
                  <p className="text-muted-foreground flex-1">
                    {ministry.description}
                  </p>
                  <div className="pt-4 mt-4 border-t w-full">
                    <p className="font-medium text-sm">Meeting Time:</p>
                    <p className="text-primary">{ministry.meeting_time}</p>
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
