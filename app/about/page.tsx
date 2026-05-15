import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Discover our heart, our vision, and the calling God has placed upon Reign of Glory Ministries.
          </p>
        </div>
      </section>

      {/* Our Story & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Reign of Glory Ministries was founded with a burning passion to see the presence and power of God manifested in our generation. What started as a small prayer gathering has blossomed into a thriving community of believers committed to worship, word, and witnessing.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in the transformative power of the Gospel to heal the broken, deliver the oppressed, and ignite a revival that will impact nations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-muted/50 border-none">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be a catalyst for global revival by equipping believers to manifest God&apos;s glory in every sphere of life.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50 border-none">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                <p className="text-muted-foreground">
                  To preach the uncompromised Word of God, demonstrate the power of the Holy Spirit, and disciple nations.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Beliefs */}
          <div className="space-y-6 pt-8 border-t">
            <h2 className="text-3xl font-bold">What We Believe</h2>
            <ul className="space-y-4 text-lg text-muted-foreground list-disc pl-6">
              <li><strong>The Bible:</strong> The inspired, infallible, and authoritative Word of God.</li>
              <li><strong>The Trinity:</strong> One God eternally existent in three persons: Father, Son, and Holy Spirit.</li>
              <li><strong>Salvation:</strong> We are saved by grace through faith in Jesus Christ alone.</li>
              <li><strong>The Holy Spirit:</strong> The present ministry of the Holy Spirit empowers the Christian for godly living and service.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
