import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            We would love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Get In Touch</h2>
              <p className="text-muted-foreground text-lg">
                Whether you have a question about our services, need prayer, or want to know more about our ministries, our team is ready to answer all your questions.
              </p>

              <div className="space-y-6">
                <Card className="border-none bg-muted/30 shadow-none">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Address</h3>
                      <p className="text-muted-foreground">123 Glory Avenue<br/>City Center, ST 12345</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none bg-muted/30 shadow-none">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none bg-muted/30 shadow-none">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Email</h3>
                      <p className="text-muted-foreground">info@reignofglory.org</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none bg-muted/30 shadow-none">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Office Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-xl h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full h-12 rounded-md border border-input bg-background px-4 py-2"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full h-12 rounded-md border border-input bg-background px-4 py-2"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full h-12 rounded-md border border-input bg-background px-4 py-2"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-4 py-3"
                      placeholder="Your message here..."
                    />
                  </div>
                  <Button type="button" className="w-full h-12 text-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  )
}
