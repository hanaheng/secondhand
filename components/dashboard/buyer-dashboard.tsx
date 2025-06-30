"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { GenreCarousel } from "@/components/books/genre-carousel"
import { SellerBanner } from "@/components/dashboard/seller-banner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useBooks } from "@/hooks/use-books"
import { DevelopmentBanner } from "@/components/ui/development-banner"

const genres = [
  "Fiction",
  "Non-Fiction",
  "Romance",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Biography",
  "History",
  "Self-Help",
  "Business",
]

export function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const { user } = useAuth()
  const { books, loading } = useBooks()

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = !selectedGenre || book.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const booksByGenre = genres.reduce(
    (acc, genre) => {
      acc[genre] = filteredBooks.filter((book) => book.genre === genre)
      return acc
    },
    {} as Record<string, typeof books>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DevelopmentBanner />

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari buku atau penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGenre === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(null)}
              className={selectedGenre === null ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              Semua Genre
            </Button>
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Seller Banner */}
        {user && !user.is_seller && <SellerBanner />}

        {/* Books by Genre */}
        <div className="space-y-12">
          {genres.map((genre) => {
            const genreBooks = booksByGenre[genre]
            if (genreBooks.length === 0) return null

            return (
              <div key={genre}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{genre}</h2>
                <GenreCarousel books={genreBooks} />
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada buku yang ditemukan.</p>
            <p className="text-gray-400 mt-2">Coba ubah kata kunci pencarian atau filter Anda.</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Memuat buku...</p>
          </div>
        )}
      </div>
    </div>
  )
}
