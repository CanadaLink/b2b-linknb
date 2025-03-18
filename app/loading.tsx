import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="text-center p-8 rounded-lg bg-white shadow-md">
        <Loader2 className="h-12 w-12 animate-spin text-[#1a3c86] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Loading</h2>
        <p className="text-gray-600">Please wait while we prepare your content...</p>
      </div>
    </div>
  )
}

