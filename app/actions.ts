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

export async function registerForEvent(formData: FormData) {
  const supabase = await createClient()
  
  const event_id = formData.get("event_id") as string
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  if (!event_id || !name || !email) {
    return { error: "Name and Email are required" }
  }

  const { error } = await supabase.from("event_registrations").insert([
    {
      event_id,
      name,
      email,
      phone: phone || null
    }
  ])

  if (error) {
    console.error("Event registration error:", error)
    return { error: "Failed to register for the event. Please try again." }
  }

  return { success: true }
}

import { addMediaItem, addComment, deleteMediaItem, updateMediaItem } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function submitMediaItem(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as string // 'image', 'audio', 'video'
  const file = formData.get("file") as File | null
  const external_url = formData.get("external_url") as string

  if (!title || !type) {
    return { error: "Title and media type are required." }
  }

  let file_url = ""
  if (external_url) {
    file_url = external_url
  } else if (file && file.size > 0) {
    try {
      const buffer = await file.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      file_url = `data:${file.type};base64,${base64}`
    } catch (e) {
      console.error("Error reading file stream:", e)
      return { error: "Failed to read the uploaded file. Try using an external URL if the file is too large." }
    }
  } else {
    // Fallback mock links if no file or URL is provided
    if (type === "image") {
      file_url = "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
    } else if (type === "audio") {
      file_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    } else {
      file_url = "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  }

  try {
    await addMediaItem(title, description || null, type, file_url)
    revalidatePath("/media")
    revalidatePath("/admin")
    return { success: true }
  } catch (err) {
    console.error("Submit media item error:", err)
    return { error: err instanceof Error ? err.message : "Failed to save media item." }
  }
}

export async function submitComment(formData: FormData) {
  const media_id = formData.get("media_id") as string
  const name = formData.get("name") as string
  const comment = formData.get("comment") as string

  if (!media_id || !name || !comment) {
    return { error: "Name and comment are required." }
  }

  try {
    await addComment(media_id, name, comment)
    revalidatePath("/media")
    return { success: true }
  } catch (err) {
    console.error("Submit comment error:", err)
    return { error: err instanceof Error ? err.message : "Failed to submit comment." }
  }
}

export async function removeMediaItem(id: string) {
  if (!id) return { error: "ID is required." }

  try {
    const success = await deleteMediaItem(id)
    if (!success) {
      return { error: "Failed to delete media item." }
    }
    revalidatePath("/media")
    revalidatePath("/admin/media")
    return { success: true }
  } catch (err) {
    console.error("Error in delete server action:", err)
    return { error: err instanceof Error ? err.message : "Failed to delete media item." }
  }
}

export async function editMediaItem(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as string
  const file_url = formData.get("file_url") as string

  if (!id || !title || !type || !file_url) {
    return { error: "ID, title, type, and file URL are required." }
  }

  try {
    const updated = await updateMediaItem(id, title, description || null, type, file_url)
    if (!updated) {
      return { error: "Failed to update media item." }
    }
    revalidatePath("/media")
    revalidatePath("/admin/media")
    return { success: true }
  } catch (err) {
    console.error("Error in update server action:", err)
    return { error: err instanceof Error ? err.message : "Failed to update media item." }
  }
}

