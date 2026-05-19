import { createClient } from "@/supabase/server"

export interface SermonRow {
  id: string
  title: string
  speaker: string
  date: string
  video_url: string
  description: string
  scripture_references: string[]
  tags: string[]
}

export interface EventRow {
  id: string
  title: string
  date: string
  location: string
  description: string
  image_url: string
  is_featured: boolean
}

export interface MinistryRow {
  id: string
  name: string
  description: string
  leader: string
  meeting_time: string
  image_url: string
}

export interface BlogPostRow {
  id: string
  title: string
  slug: string
  content: string
  author: string
  image_url: string
  published_at: string
}

export interface MediaItemRow {
  id: string
  title: string
  description: string | null
  type: string // 'image', 'audio', 'video'
  file_url: string
  created_at: string
}

export interface CommentRow {
  id: string
  media_id: string
  name: string
  comment: string
  created_at: string
}

// Check if Supabase environment variables are configured
export function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Fallback Mock Data
export const mockSermons = [
  {
    id: "1",
    title: "The Power of Faith",
    speaker: "Pastor John Doe",
    date: "2023-10-29",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Discover how faith can move mountains in your everyday life and bring you closer to God's promises. This message explores the biblical foundation of faith and how to apply it practically to overcome obstacles.",
    scripture_references: ["Hebrews 11:1"],
    tags: ["Faith", "Growth", "Victory", "Trust"],
    thumbnail: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Walking in Love",
    speaker: "Pastor Jane Smith",
    date: "2023-10-22",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Walking in love is a daily choice. Learn how to love others as Christ loved us, and build deep, meaningful relationships centered on Him.",
    scripture_references: ["1 Corinthians 13:4-8"],
    tags: ["Love", "Relationships"],
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Overcoming Fear",
    speaker: "Pastor John Doe",
    date: "2023-10-15",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Fear is not from God. Discover how to walk in power, love, and a sound mind, overcoming every anxiety and fear holding you back.",
    scripture_references: ["2 Timothy 1:7"],
    tags: ["Victory", "Mindset"],
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
  }
]

export const mockEvents = [
  {
    id: "1",
    title: "Night of Worship",
    date: "2023-11-11T19:00:00Z",
    location: "Main Sanctuary",
    description: "Join us for an extended time of worship and encountering the presence of God. This special night is dedicated to lifting up the name of Jesus through song, prayer, and collective worship. We invite you to bring your family and friends for what promises to be a life-changing encounter.",
    image_url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
    is_featured: true
  },
  {
    id: "2",
    title: "Youth Conference 2023",
    date: "2023-11-18T10:00:00Z",
    location: "Youth Center",
    description: "A transformative weekend for youth and young adults to discover their purpose, build meaningful relationships, and be equipped to shine bright.",
    image_url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop",
    is_featured: false
  },
  {
    id: "3",
    title: "Community Outreach",
    date: "2023-11-19T09:00:00Z",
    location: "City Center",
    description: "Serving our local community with food, supplies, and sharing the love of God. All volunteers are welcome!",
    image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
    is_featured: false
  }
]

export const mockMinistries = [
  {
    id: "1",
    name: "Youth Ministry",
    description: "Empowering the next generation to encounter God, discover their purpose, and change the world.",
    meeting_time: "Fridays @ 7:00 PM",
    leader: "Pastor David Lee",
    image_url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Women's Ministry",
    description: "A community of women growing together in faith, building lasting friendships, and serving others.",
    meeting_time: "2nd & 4th Saturdays @ 10:00 AM",
    leader: "Pastor Jane Smith",
    image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Men's Ministry",
    description: "Equipping men to be godly leaders in their homes, workplaces, and communities.",
    meeting_time: "1st & 3rd Saturdays @ 8:30 AM",
    leader: "Pastor John Doe",
    image_url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Worship & Media",
    description: "Leading the congregation into the presence of God through music, creativity, and technology.",
    meeting_time: "Thursdays @ 6:30 PM (Rehearsal)",
    leader: "Worship Leader Sarah Brown",
    image_url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
  }
]

export const mockBlogPosts = [
  {
    id: "1",
    title: "Understanding the Power of Prayer",
    slug: "understanding-power-of-prayer",
    content: "Prayer is not just a routine, it's a direct line to the Creator of the universe. In this post, we explore the biblical foundation of prayer, how it shapes our character, and how to build a consistent prayer life. When we pray, we align our hearts with God's will and invite His power to move in our circumstances.",
    author: "Pastor John Doe",
    image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
    published_at: "2023-10-25T10:00:00Z"
  },
  {
    id: "2",
    title: "Building Stronger Families Through Faith",
    slug: "building-stronger-families-faith",
    content: "The family unit is the foundation of a strong community. Discover how faith-centered principles can transform your household, improve communication, and instill godly values in your children. Walking together in faith helps families navigate challenges with grace and unity.",
    author: "Pastor Jane Smith",
    image_url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop",
    published_at: "2023-10-18T10:00:00Z"
  }
]

// Sermons
export async function getSermons() {
  if (!isSupabaseConfigured()) return mockSermons

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("date", { ascending: false })

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching sermons from Supabase:", error)
      return mockSermons
    }

    return data.map((sermon: SermonRow) => ({
      id: sermon.id,
      title: sermon.title,
      speaker: sermon.speaker,
      date: sermon.date,
      video_url: sermon.video_url,
      description: sermon.description,
      scripture_references: sermon.scripture_references || [],
      tags: sermon.tags || [],
      thumbnail: sermon.video_url && sermon.video_url.includes("youtube.com")
        ? `https://img.youtube.com/vi/${getYouTubeId(sermon.video_url)}/maxresdefault.jpg`
        : "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
    }))
  } catch (err) {
    console.error("Failed to connect to Supabase for sermons:", err)
    return mockSermons
  }
}

export async function getSermonById(id: string) {
  const sermons = await getSermons()
  const sermon = sermons.find((s) => s.id === id)
  if (sermon) return sermon

  if (!isSupabaseConfigured()) return mockSermons[0]

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      if (error) console.error(`Error fetching sermon ${id} from Supabase:`, error)
      return mockSermons[0]
    }

    return {
      id: data.id,
      title: data.title,
      speaker: data.speaker,
      date: data.date,
      video_url: data.video_url,
      description: data.description,
      scripture_references: data.scripture_references || [],
      tags: data.tags || [],
      thumbnail: data.video_url && data.video_url.includes("youtube.com")
        ? `https://img.youtube.com/vi/${getYouTubeId(data.video_url)}/maxresdefault.jpg`
        : "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
    }
  } catch (err) {
    console.error("Failed to connect to Supabase for sermon detail:", err)
    return mockSermons[0]
  }
}

// Events
export async function getEvents() {
  if (!isSupabaseConfigured()) return mockEvents

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true })

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching events from Supabase:", error)
      return mockEvents
    }

    return data.map((event: EventRow) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      image_url: event.image_url || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
      is_featured: event.is_featured
    }))
  } catch (err) {
    console.error("Failed to connect to Supabase for events:", err)
    return mockEvents
  }
}

export async function getEventById(id: string) {
  const events = await getEvents()
  const event = events.find((e) => e.id === id)
  if (event) return event

  if (!isSupabaseConfigured()) return mockEvents[0]

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      if (error) console.error(`Error fetching event ${id} from Supabase:`, error)
      return mockEvents[0]
    }

    return {
      id: data.id,
      title: data.title,
      date: data.date,
      location: data.location,
      description: data.description,
      image_url: data.image_url || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
      is_featured: data.is_featured
    }
  } catch (err) {
    console.error("Failed to connect to Supabase for event detail:", err)
    return mockEvents[0]
  }
}

// Ministries
export async function getMinistries() {
  if (!isSupabaseConfigured()) return mockMinistries

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("ministries")
      .select("*")
      .order("name", { ascending: true })

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching ministries from Supabase:", error)
      return mockMinistries
    }

    return data.map((ministry: MinistryRow) => ({
      id: ministry.id,
      name: ministry.name,
      description: ministry.description,
      leader: ministry.leader,
      meeting_time: ministry.meeting_time,
      image_url: ministry.image_url || "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2000&auto=format&fit=crop"
    }))
  } catch (err) {
    console.error("Failed to connect to Supabase for ministries:", err)
    return mockMinistries
  }
}

// Blog
export async function getBlogPosts() {
  if (!isSupabaseConfigured()) return mockBlogPosts

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false })

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching blog posts from Supabase:", error)
      return mockBlogPosts
    }

    return data.map((post: BlogPostRow) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      image_url: post.image_url || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
      published_at: post.published_at
    }))
  } catch (err) {
    console.error("Failed to connect to Supabase for blog posts:", err)
    return mockBlogPosts
  }
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.slug === slug)
  if (post) return post

  if (!isSupabaseConfigured()) return mockBlogPosts[0]

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error || !data) {
      if (error) console.error(`Error fetching blog post by slug ${slug} from Supabase:`, error)
      return mockBlogPosts[0]
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      content: data.content,
      author: data.author,
      image_url: data.image_url || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
      published_at: data.published_at
    }
  } catch (err) {
    console.error("Failed to connect to Supabase for blog post detail:", err)
    return mockBlogPosts[0]
  }
}

// Admin stats and lists
export async function getAdminStats() {
  if (!isSupabaseConfigured()) {
    return {
      sermonsCount: mockSermons.length,
      eventsCount: mockEvents.length,
      prayersCount: 28,
      ministriesCount: mockMinistries.length
    }
  }

  try {
    const supabase = await createClient()
    
    const [sermonsRes, eventsRes, prayersRes, ministriesRes] = await Promise.all([
      supabase.from("sermons").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("prayer_requests").select("id", { count: "exact", head: true }),
      supabase.from("ministries").select("id", { count: "exact", head: true })
    ])

    return {
      sermonsCount: sermonsRes.count || mockSermons.length,
      eventsCount: eventsRes.count || mockEvents.length,
      prayersCount: prayersRes.count || 28,
      ministriesCount: ministriesRes.count || mockMinistries.length
    }
  } catch (err) {
    console.error("Failed to fetch admin stats from Supabase:", err)
    return {
      sermonsCount: mockSermons.length,
      eventsCount: mockEvents.length,
      prayersCount: 28,
      ministriesCount: mockMinistries.length
    }
  }
}

export async function getRecentPrayers(limit = 5) {
  if (!isSupabaseConfigured()) {
    return [
      { id: "1", name: "Anonymous", request: "Please pray for my family's health and our upcoming travels...", status: "pending", created_at: new Date().toISOString() },
      { id: "2", name: "Sarah Miller", request: "Prayers for strength and guidance as I start a new job next week.", status: "pending", created_at: new Date().toISOString() },
      { id: "3", name: "Anonymous", request: "Please pray for peace of mind and healing in my relationships.", status: "pending", created_at: new Date().toISOString() }
    ]
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error || !data) {
      if (error) console.error("Error fetching recent prayer requests:", error)
      return []
    }

    return data
  } catch (err) {
    console.error("Failed to connect to Supabase for recent prayers:", err)
    return []
  }
}

// Helper to extract YouTube ID
function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ""
}

// Media items fallback mock arrays
export const mockMediaItems: MediaItemRow[] = [
  {
    id: "m1",
    title: "Sunday Resurrection Service Choir",
    description: "Our beautiful choir singing during the opening praise and worship.",
    type: "image",
    file_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop",
    created_at: "2023-10-29T11:00:00Z"
  },
  {
    id: "m2",
    title: "Morning Devotional Audio - Grace & Peace",
    description: "Listen to the daily devotional and find peace for your morning routine.",
    type: "audio",
    file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    created_at: "2023-10-28T07:00:00Z"
  },
  {
    id: "m3",
    title: "Reign of Glory Promo Video",
    description: "Welcome to Reign of Glory Ministries! See our vision and communities.",
    type: "video",
    file_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    created_at: "2023-10-25T14:00:00Z"
  }
]

export const mockComments: CommentRow[] = [
  {
    id: "c1",
    media_id: "m1",
    name: "Brother David",
    comment: "This choir session was so anointed. God was indeed in the house!",
    created_at: "2023-10-29T12:30:00Z"
  },
  {
    id: "c2",
    media_id: "m1",
    name: "Sister Abigail",
    comment: "Praise God! The garments look beautiful too.",
    created_at: "2023-10-29T13:00:00Z"
  }
]

// Media functions
export async function getMediaItems(): Promise<MediaItemRow[]> {
  if (!isSupabaseConfigured()) return mockMediaItems

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("media_items")
      .select("*")
      .order("created_at", { ascending: false })

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching media items from Supabase:", error)
      return mockMediaItems
    }

    return data as MediaItemRow[]
  } catch (err) {
    console.error("Failed to connect to Supabase for media items:", err)
    return mockMediaItems
  }
}

export async function addMediaItem(title: string, description: string | null, type: string, file_url: string): Promise<MediaItemRow> {
  if (!isSupabaseConfigured()) {
    const newItem: MediaItemRow = {
      id: "m_mock_" + Math.random().toString(36).substring(2, 9),
      title,
      description,
      type,
      file_url,
      created_at: new Date().toISOString()
    }
    mockMediaItems.unshift(newItem)
    return newItem
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("media_items")
      .insert([{ title, description, type, file_url }])
      .select()
      .single()

    if (error) {
      console.error("Error adding media item to Supabase:", error)
      throw new Error(error.message)
    }

    return data as MediaItemRow
  } catch (err) {
    console.error("Failed to add media item to Supabase:", err)
    const newItem: MediaItemRow = {
      id: "m_mock_" + Math.random().toString(36).substring(2, 9),
      title,
      description,
      type,
      file_url,
      created_at: new Date().toISOString()
    }
    mockMediaItems.unshift(newItem)
    return newItem
  }
}

// Comments functions
export async function getComments(): Promise<CommentRow[]> {
  if (!isSupabaseConfigured()) return mockComments

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: true })

    if (error || !data) {
      if (error) console.error("Error fetching comments from Supabase:", error)
      return mockComments
    }

    return data as CommentRow[]
  } catch (err) {
    console.error("Failed to connect to Supabase for comments:", err)
    return mockComments
  }
}

export async function addComment(media_id: string, name: string, comment: string): Promise<CommentRow> {
  if (!isSupabaseConfigured()) {
    const newComment: CommentRow = {
      id: "c_mock_" + Math.random().toString(36).substring(2, 9),
      media_id,
      name,
      comment,
      created_at: new Date().toISOString()
    }
    mockComments.push(newComment)
    return newComment
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("comments")
      .insert([{ media_id, name, comment }])
      .select()
      .single()

    if (error) {
      console.error("Error adding comment to Supabase:", error)
      throw new Error(error.message)
    }

    return data as CommentRow
  } catch (err) {
    console.error("Failed to add comment to Supabase:", err)
    const newComment: CommentRow = {
      id: "c_mock_" + Math.random().toString(36).substring(2, 9),
      media_id,
      name,
      comment,
      created_at: new Date().toISOString()
    }
    mockComments.push(newComment)
    return newComment
  }
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    const idx = mockMediaItems.findIndex(item => item.id === id)
    if (idx !== -1) {
      mockMediaItems.splice(idx, 1)
      return true
    }
    return false
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from("media_items")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting media item from Supabase:", error)
      return false
    }

    return true
  } catch (err) {
    console.error("Failed to connect to Supabase to delete media item:", err)
    return false
  }
}

export async function updateMediaItem(
  id: string,
  title: string,
  description: string | null,
  type: string,
  file_url: string
): Promise<MediaItemRow | null> {
  if (!isSupabaseConfigured()) {
    const idx = mockMediaItems.findIndex(item => item.id === id)
    if (idx !== -1) {
      mockMediaItems[idx] = {
        ...mockMediaItems[idx],
        title,
        description,
        type,
        file_url
      }
      return mockMediaItems[idx]
    }
    return null
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("media_items")
      .update({ title, description, type, file_url })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating media item in Supabase:", error)
      return null
    }

    return data as MediaItemRow
  } catch (err) {
    console.error("Failed to connect to Supabase to update media item:", err)
    return null
  }
}
