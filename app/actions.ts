"use server"

import { createClient } from "@/supabase/server"

export async function submitPrayerRequest(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const request = formData.get("request") as string
  const is_public = formData.get("is_public") === "on"

  if (!request) {
    return { error: "Prayer request is required" }
  }

  const { error } = await supabase.from("prayer_requests").insert([
    {
      name: name || null,
      email: email || null,
      request,
      is_public
    }
  ])

  if (error) {
    console.error("Prayer request error:", error)
    return { error: "Failed to submit prayer request. Please try again." }
  }

  return { success: true }
}
