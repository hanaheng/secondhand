"use client"

import { useState } from "react"
import { BookCard } from "./book-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GenreCarouselProps {
  books: Array<{
    id: string
    title: string
    author: string
    price: number
    cover_image: string
    upload_date: string
    seller_id: string
    seller_name: string
  }>
}

export function GenreCarousel({ books }: GenreCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const booksPerPage = 4

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex + booksPerPage < books.length

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - booksPerPage))
  }

  const scrollRight = () => {
    setCurrentIndex(Math.min(books.length - booksPerPage, currentIndex + booksPerPage))
  }

  const visibleBooks = books.slice(currentIndex, currentIndex + booksPerPage)

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={scrollLeft} disabled={!canScrollLeft}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={scrollRight} disabled={!canScrollRight}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-gray-500">
          {currentIndex + 1}-{Math.min(currentIndex + booksPerPage, books.length)} dari {books.length} buku
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
