import { getMediaItems } from "@/lib/db"
import { AdminMediaManager } from "@/components/AdminMediaManager"

export const metadata = {
  title: "Media Administration | Reign of Glory Ministries",
  description: "Administrative controls to modify and delete church images, audios, and video resources.",
}

export default async function AdminMediaPage() {
  const items = await getMediaItems()

  return (
    <div className="flex flex-col min-h-screen pt-16 bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <AdminMediaManager initialItems={items} />
      </div>
    </div>
  )
}
