"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"

export function DevelopmentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show banner only if Supabase is not configured
    const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setIsVisible(!hasSupabase)
  }, [])

  if (!isVisible) return null

  return (
    <Card className="mb-4 bg-yellow-50 border-yellow-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Mode Preview</h4>
              <p className="text-sm text-yellow-700">
                Aplikasi berjalan dalam mode offline. Untuk menggunakan database, konfigurasikan environment variables
                Supabase.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
