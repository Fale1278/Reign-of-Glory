"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { registerForEvent } from "@/app/actions"

export default function EventRegistrationForm({ eventId }: { eventId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    formData.append("event_id", eventId)

    try {
      const result = await registerForEvent(formData)
      if (result.error) {
        setError(result.error)
        toast.error("Registration failed. Please try again.")
      } else {
        setRegistered(true)
        toast.success("Successfully registered for the event!")
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred. Please try again.")
      toast.error("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (registered) {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center space-y-3">
        <h4 className="text-xl font-bold text-primary">You&apos;re Registered!</h4>
        <p className="text-sm text-muted-foreground">
          We&apos;ve saved your spot. A confirmation email has been sent to your inbox. We look forward to seeing you!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="reg-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Full Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="reg-name"
          name="name"
          required
          placeholder="John Doe"
          className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="reg-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Email Address <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          id="reg-email"
          name="email"
          required
          placeholder="john@example.com"
          className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="reg-phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="reg-phone"
          name="phone"
          placeholder="(123) 456-7890"
          className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <Button type="submit" className="w-full h-11 text-base font-semibold mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Confirm Registration"}
      </Button>
    </form>
  )
}
