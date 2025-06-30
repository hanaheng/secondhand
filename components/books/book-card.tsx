"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Eye } from "lucide-react"
import Link from "next/link"
import { formatDate, formatPrice } from "@/lib/utils"

interface BookCardProps {
  book: {
    id: string
    title: string
    author: string
    price: number
    cover_image: string
    upload_date: string
    seller_id: string
    seller_name: string
  }
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="book-card-hover overflow-hidden">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={book.cover_image || "/placeholder.svg?height=400&width=300"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-2">{formatDate(book.upload_date)}</div>

        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{book.title}</h3>

        <p className="text-gray-600 text-sm mb-2">{book.author}</p>

        <div className="text-xl font-bold text-orange-600 mb-4">{formatPrice(book.price)}</div>

        <div className="flex gap-2">
          <Link href={`/books/${book.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              Detail
            </Button>
          </Link>
          <Link href={`/chat/${book.seller_id}`}>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
