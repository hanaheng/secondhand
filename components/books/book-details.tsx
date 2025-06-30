"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { useBook } from "@/hooks/use-book"

interface BookDetailsProps {
  bookId: string
}

export function BookDetails({ bookId }: BookDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { book, loading } = useBook(bookId)
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500">Memuat detail buku...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500">Buku tidak ditemukan.</p>
            <Link href="/dashboard">
              <Button className="mt-4">Kembali ke Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const images = [book.cover_image, ...(book.condition_images || [])]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                <img
                  src={images[currentImageIndex] || "/placeholder.svg?height=600&width=450"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index ? "border-orange-600" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg?height=96&width=80"}
                      alt={`${book.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">oleh {book.author}</p>
              <div className="text-3xl font-bold text-orange-600 mb-4">{formatPrice(book.price)}</div>
              <Badge variant="secondary" className="mb-4">
                {book.condition}
              </Badge>
            </div>

            {/* Synopsis */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Sinopsis</h3>
                <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>
              </CardContent>
            </Card>

            {/* Condition Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Kondisi Buku</h3>
                <p className="text-gray-700 leading-relaxed">{book.condition_description}</p>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Informasi Penjual</h3>
                <p className="text-gray-700">
                  <strong>Nama:</strong> {book.seller_name}
                </p>
                <p className="text-gray-700">
                  <strong>Bergabung:</strong> {new Date(book.seller_joined).toLocaleDateString("id-ID")}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href={`/chat/${book.seller_id}`} className="flex-1">
                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat dengan Penjual
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
