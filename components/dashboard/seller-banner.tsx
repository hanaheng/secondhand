"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, X } from "lucide-react"
import Link from "next/link"

export function SellerBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="mb-8 bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-600 p-3 rounded-full">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Mulai Jual Buku Anda!</h3>
              <p className="text-gray-600">
                Bergabunglah sebagai penjual dan dapatkan penghasilan dari buku-buku yang sudah tidak terpakai.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/seller/register">
              <Button className="bg-orange-600 hover:bg-orange-700">Daftar Jadi Penjual</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
