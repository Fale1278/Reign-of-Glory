import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Calendar as CalendarIcon, Heart, Users, Film } from "lucide-react"
import { getAdminStats, getRecentPrayers } from "@/lib/db"
import AdminUploadForm from "@/components/AdminUploadForm"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const [stats, recentPrayers] = await Promise.all([
    getAdminStats(),
    getRecentPrayers(5)
  ])

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
                <h3 className="text-2xl font-bold">{stats.sermonsCount}</h3>
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
                <h3 className="text-2xl font-bold">{stats.eventsCount}</h3>
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
                <h3 className="text-2xl font-bold">{stats.prayersCount}</h3>
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
                <h3 className="text-2xl font-bold">{stats.ministriesCount}</h3>
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
                {recentPrayers.length > 0 ? (
                  recentPrayers.map((prayer: { id: string; name: string | null; request: string; status: string | null; created_at: string }) => (
                    <div key={prayer.id} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0 gap-4">
                      <div>
                        <p className="font-medium">{prayer.name || "Anonymous"}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{prayer.request}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">
                          {new Date(prayer.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        prayer.status === "answered"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : prayer.status === "prayed"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {prayer.status ? prayer.status.charAt(0).toUpperCase() + prayer.status.slice(1) : "Pending"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No prayer requests received yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Link href="/admin/media" className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors col-span-2 flex items-center justify-between group bg-primary/5 border-primary/20">
                  <div className="flex items-center space-x-3">
                    <Film className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="font-bold text-base text-primary">Manage Church Media</h4>
                      <p className="text-xs text-muted-foreground">Modify, update details, or delete uploaded files</p>
                    </div>
                  </div>
                </Link>
                <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                  <Video className="w-5 h-5 mb-2 text-muted-foreground" />
                  <h4 className="font-medium text-sm">Add Sermon</h4>
                </button>
                <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                  <CalendarIcon className="w-5 h-5 mb-2 text-muted-foreground" />
                  <h4 className="font-medium text-sm">Create Event</h4>
                </button>
                <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                  <Heart className="w-5 h-5 mb-2 text-muted-foreground" />
                  <h4 className="font-medium text-sm">View Prayers</h4>
                </button>
                <button className="p-4 border rounded-lg text-left hover:bg-muted/50 transition-colors">
                  <Users className="w-5 h-5 mb-2 text-muted-foreground" />
                  <h4 className="font-medium text-sm">Manage Ministries</h4>
                </button>
              </CardContent>
            </Card>

            <AdminUploadForm />
          </div>
        </div>
      </div>
    </div>
  )
}
