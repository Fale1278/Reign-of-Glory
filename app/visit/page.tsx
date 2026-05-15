import { VisitMap } from "@/components/VisitMap"

export default function VisitPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan a Visit</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            We can&apos;t wait to welcome you. Find out how to get here.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <VisitMap />
        </div>
      </section>

      <section className="py-20 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Service Times</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-muted-foreground">Sunday Worship</span>
                  <span className="font-semibold text-primary">9:00 AM & 11:30 AM</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-muted-foreground">Wednesday Bible Study</span>
                  <span className="font-semibold text-primary">6:30 PM</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-muted-foreground">Friday Prayer</span>
                  <span className="font-semibold text-primary">6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Location Details</h2>
              <div className="p-6 bg-background rounded-xl shadow-sm border space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <p className="text-muted-foreground">123 Glory Avenue, City Center, ST 12345</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Parking</h4>
                  <p className="text-muted-foreground">Ample free parking is available in the main church lot and adjacent streets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      <section className="py-24 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "What should I wear?", a: "Come as you are! You&apos;ll see everything from jeans and t-shirts to suits and dresses. We&apos;re more interested in meeting you than in what you wear." },
              { q: "Is there childcare available?", a: "Yes! Our Kingdom Kids ministry provides a safe and fun environment for children of all ages during all of our Sunday services." },
              { q: "How long are the services?", a: "Our services typically last about 90 minutes. They include worship music, prayer, and a practical message from the Bible." },
              { q: "Where do I go when I arrive?", a: "Our greeters will be at the front doors waiting to welcome you. They can help you find your way to the sanctuary, children&apos;s check-in, or answer any questions you have." }
            ].map((faq, i) => (
              <div key={i} className="bg-muted/30 p-6 rounded-2xl">
                <h4 className="font-bold text-xl mb-2">{faq.q}</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
