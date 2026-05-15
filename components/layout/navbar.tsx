"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "@/components/Search"

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/ministries", label: "Ministries" },
  { href: "/livestream", label: "Livestream" },
  { href: "/give", label: "Give" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight">Reign of Glory</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
          <div className="flex items-center space-x-4 ml-4 border-l pl-4">
            <Search />
            <Button asChild size="sm" className="rounded-full px-6">
              <Link href="/give">Donate</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <Search />
          <button
            className="p-2 rounded-full hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button asChild variant="outline" className="w-full justify-start rounded-xl">
                  <Link href="/prayer" onClick={() => setIsOpen(false)}>Prayer Request</Link>
                </Button>
                <Button asChild className="w-full justify-start rounded-xl">
                  <Link href="/give" onClick={() => setIsOpen(false)}>Give Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
