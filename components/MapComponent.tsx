"use client"
import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, Car, Bus, Plane, Info, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

// Custom Modern Icons
const createCustomIcon = (color: string, iconHtml: string) => L.divIcon({
  html: `<div class="flex items-center justify-center ${color} text-white p-2 rounded-full shadow-xl border-2 border-white transform transition-transform hover:scale-110">${iconHtml}</div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const churchIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/><path d="M12 2v5"/><path d="M9 4h6"/></svg>`
const userIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>`

// Helper component to auto-zoom
function ZoomHandler({ userCoords, churchCoords }: { userCoords: [number, number] | null, churchCoords: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    if (userCoords) {
      const bounds = L.latLngBounds([userCoords, churchCoords])
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [userCoords, churchCoords, map])
  return null
}

// Haversine distance
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const CHURCH_LOCATION: [number, number] = [40.7128, -74.0060]

export default function MapComponent() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [route, setRoute] = useState<[number, number][]>([])
  const [travelData, setTravelData] = useState<{
    car: { distance: number, duration: number } | null,
    bus: { distance: number, duration: number } | null,
    flight: { distance: number, duration: number } | null
  }>({ car: null, bus: null, flight: null })
  const [loading, setLoading] = useState(false)

  const locateUser = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])
          calculateRoutes(latitude, longitude)
          setLoading(false)
        },
        (error) => {
          console.error("Error getting location", error)
          setLoading(false)
        }
      )
    }
  }

  const calculateRoutes = async (lat: number, lon: number) => {
    const flightDist = getDistanceFromLatLonInKm(lat, lon, CHURCH_LOCATION[0], CHURCH_LOCATION[1])
    
    try {
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${lon},${lat};${CHURCH_LOCATION[1]},${CHURCH_LOCATION[0]}?overview=full&geometries=geojson`)
      const data = await res.json()
      
      if (data.routes?.[0]) {
        const routeData = data.routes[0]
        setTravelData({
          car: { distance: routeData.distance / 1000, duration: routeData.duration / 3600 },
          bus: { distance: routeData.distance / 1000, duration: (routeData.duration * 1.3) / 3600 },
          flight: { distance: flightDist, duration: flightDist / 800 }
        })
        setRoute(routeData.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]))
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-[600px] group">
        <MapContainer center={CHURCH_LOCATION} zoom={13} style={{ height: '100%', width: '100%', zIndex: 0 }} zoomControl={false}>
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          <ZoomHandler userCoords={userLocation} churchCoords={CHURCH_LOCATION} />
          
          <Marker position={CHURCH_LOCATION} icon={createCustomIcon('bg-primary', churchIconHtml)}>
            <Popup className="custom-popup">
              <div className="p-2">
                <h4 className="font-bold text-lg">Reign of Glory</h4>
                <p className="text-sm text-muted-foreground">123 Glory Avenue</p>
              </div>
            </Popup>
          </Marker>

          {userLocation && (
            <>
              <Marker position={userLocation} icon={createCustomIcon('bg-blue-600', userIconHtml)}>
                <Popup>Your Location</Popup>
              </Marker>
              {route.length > 0 && <Polyline positions={route} color="#3b82f6" weight={5} opacity={0.7} lineCap="round" />}
              <Polyline positions={[userLocation, CHURCH_LOCATION]} color="#ef4444" weight={2} dashArray="8, 12" opacity={0.4} />
            </>
          )}
        </MapContainer>

        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <button 
            onClick={locateUser}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-white transition-all active:scale-95 text-primary border border-primary/10"
            title="Locate Me"
          >
            <Target className={cn("w-6 h-6", loading && "animate-spin")} />
          </button>
        </div>

        {/* Floating Info Overlay for Mobile/Quick View */}
        <AnimatePresence>
          {userLocation && travelData.car && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-6 left-6 right-6 z-[1000] md:max-w-xs"
            >
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold flex items-center gap-2"><Navigation className="w-4 h-4 text-primary" /> Route Active</h4>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-wider">Fastest</span>
                </div>
                <div className="flex justify-around py-2">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Distance</p>
                    <p className="font-bold text-lg text-primary">{travelData.car.distance.toFixed(1)}<span className="text-xs ml-0.5">km</span></p>
                  </div>
                  <div className="w-px bg-muted-foreground/20" />
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Time</p>
                    <p className="font-bold text-lg text-primary">{travelData.car.duration.toFixed(1)}<span className="text-xs ml-0.5">hrs</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detailed Travel Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'By Car', icon: Car, data: travelData.car, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'By Bus', icon: Bus, data: travelData.bus, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'By Flight', icon: Plane, data: travelData.flight, color: 'text-red-600', bg: 'bg-red-50' }
        ].map((mode, idx) => (
          <motion.div
            key={mode.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "p-5 rounded-2xl border-2 transition-all hover:shadow-xl",
              userLocation ? "opacity-100 scale-100 border-primary/5 bg-white" : "opacity-50 scale-[0.98] border-transparent bg-muted/30"
            )}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={cn("p-3 rounded-xl", mode.bg, mode.color)}>
                <mode.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg">{mode.label}</h4>
            </div>
            
            {mode.data ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-bold text-foreground">{mode.data.distance.toFixed(1)} km</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Est. Duration</span>
                  <span className="font-bold text-foreground">{mode.data.duration.toFixed(1)} hrs</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Location access needed to calculate.</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-xl text-xs text-muted-foreground">
        <Info className="w-4 h-4 text-primary shrink-0" />
        <p>Flight estimates are based on commercial aviation averages. Road routes use OpenStreetMap data via the OSRM project. Estimated times may vary based on traffic and weather conditions.</p>
      </div>
    </div>
  )
}
