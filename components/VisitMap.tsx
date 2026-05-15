"use client"
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-muted animate-pulse rounded-xl flex items-center justify-center text-muted-foreground">
      Loading Map...
    </div>
  )
})

export function VisitMap() {
  return <MapComponent />
}
