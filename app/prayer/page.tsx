"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { submitPrayerRequest } from "@/app/actions"

export default function PrayerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError("")
    
    const result = await submitPrayerRequest(formData)
    
    if (result.error) {
      setError(result.error)
      toast.error("Failed to submit request. Please try again.")
    } else {
      toast.success("Prayer request submitted successfully! We are standing with you in faith.")
      // Reset form or clear error
      setError("")
      const form = document.querySelector('form') as HTMLFormElement
      form?.reset()
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prayer Requests</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            &quot;For where two or three gather in my name, there am I with them.&quot; - Matthew 18:20
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">How can we pray for you?</CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below. Your request can be anonymous if you prefer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={onSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name (Optional)</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email (Optional)</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="request" className="text-sm font-medium">Prayer Request <span className="text-destructive">*</span></label>
                    <textarea 
                      id="request" 
                      name="request" 
                      required
                      rows={5}
                      className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Share what is on your heart..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="is_public" 
                      name="is_public" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="is_public" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Make this request public on our prayer wall
                    </label>
                  </div>

                  <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
      </section>
    </div>
  )
}
