import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Reign of Glory</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Equipping believers, reaching the lost, and manifesting God&apos;s glory in our generation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/sermons" className="text-muted-foreground hover:text-foreground">Sermons</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link href="/ministries" className="text-muted-foreground hover:text-foreground">Ministries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="/prayer" className="text-muted-foreground hover:text-foreground">Prayer Requests</Link></li>
              <li><Link href="/livestream" className="text-muted-foreground hover:text-foreground">Livestream</Link></li>
              <li><Link href="/give" className="text-muted-foreground hover:text-foreground">Give</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Service Times</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Sunday Worship: 9:00 AM</li>
              <li>Wednesday Bible Study: 6:30 PM</li>
              <li>Friday Prayer: 6:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Reign of Glory Ministries. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
