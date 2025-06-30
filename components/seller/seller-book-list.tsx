"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface SellerBookListProps {
  books: Array<{
    id: string
    title: string
    author: string
    price: number
    cover_image: string
    status: "active" | "sold" | "inactive"
    created_at: string
  }>
  loading: boolean
}

export function SellerBookList({ books, loading }: SellerBookListProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Memuat buku...</p>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 text-lg">Anda belum memiliki buku yang dijual.</p>
          <p className="text-gray-400 mt-2">Klik tombol "Tambah Buku" untuk mulai menjual.</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>
      case "sold":
        return <Badge className="bg-blue-100 text-blue-800">Terjual</Badge>
      case "inactive":
        return <Badge variant="secondary">Tidak Aktif</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <Card key={book.id} className="overflow-hidden">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              src={book.cover_image || "/placeholder.svg?height=400&width=300"}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">{getStatusBadge(book.status)}</div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>

            <p className="text-gray-600 text-sm mb-2">{book.author}</p>

            <div className="text-xl font-bold text-orange-600 mb-4">{formatPrice(book.price)}</div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                Lihat
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
