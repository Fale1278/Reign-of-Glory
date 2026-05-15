"use client"
import { useState, useEffect } from "react"
import { Search as SearchIcon, X, BookOpen, Calendar, Video } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Search() {
  const [isOpen, setIsOpen] = useState(false)

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="rounded-full hover:bg-primary/10 transition-colors">
        <SearchIcon className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/40 backdrop-blur-md flex items-start justify-center pt-24 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-background border shadow-2xl rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex items-center gap-4">
                <SearchIcon className="w-6 h-6 text-primary" />
                <input 
                  autoFocus
                  placeholder="Search sermons, events, blogs..." 
                  className="flex-1 bg-transparent border-none outline-none text-2xl font-light placeholder:text-muted-foreground/50"
                />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quick Links</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/sermons" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors group">
                      <Video className="w-5 h-5 text-primary" />
                      <span className="font-medium">Recent Sermons</span>
                    </Link>
                    <Link href="/events" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors group">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-medium">Upcoming Events</span>
                    </Link>
                    <Link href="/blog" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors group">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="font-medium">Blog Posts</span>
                    </Link>
                    <Link href="/give" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors group">
                      <SearchIcon className="w-5 h-5 text-primary" />
                      <span className="font-medium">Ways to Give</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
