import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Calendar as CalendarIcon, Heart, Users } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Sermons</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Events</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Prayer Requests</p>
                <h3 className="text-2xl font-bold">28</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Ministries</p>
                <h3 className="text-2xl font-bold">6</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Prayer Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">Anonymous</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">Please pray for my family&apos;s health and our upcoming travels...</p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded">Pending</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                <Video className="w-6 h-6 mb-2 text-primary" />
                <h4 className="font-medium">Add Sermon</h4>
              </button>
              <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                <CalendarIcon className="w-6 h-6 mb-2 text-primary" />
                <h4 className="font-medium">Create Event</h4>
              </button>
              <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                <Heart className="w-6 h-6 mb-2 text-primary" />
                <h4 className="font-medium">View Prayers</h4>
              </button>
              <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                <Users className="w-6 h-6 mb-2 text-primary" />
                <h4 className="font-medium">Manage Ministries</h4>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
