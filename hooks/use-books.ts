"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"

const MOCK_BOOKS = [
  {
    id: "1",
    title: "Cantik Itu Luka",
    author: "Eka Kurniawan",
    genre: "Fiction",
    price: 70000,
    cover_image: "/placeholder.svg?height=400&width=300",
    upload_date: "2025-01-20",
    seller_id: "seller1",
    seller_name: "John Doe",
    status: "active" as const,
  },
  {
    id: "2",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    genre: "Fiction",
    price: 80000,
    cover_image: "/placeholder.svg?height=400&width=300",
    upload_date: "2025-01-19",
    seller_id: "seller2",
    seller_name: "Jane Smith",
    status: "active" as const,
  },
  {
    id: "3",
    title: "Dunia Sophie",
    author: "Jostein Gaarder",
    genre: "Philosophy",
    price: 90000,
    cover_image: "/placeholder.svg?height=400&width=300",
    upload_date: "2025-01-18",
    seller_id: "seller1",
    seller_name: "John Doe",
    status: "active" as const,
  },
  {
    id: "4",
    title: "Keajaiban Toko Kelontong Namiya",
    author: "Keigo Higashino",
    genre: "Mystery",
    price: 80000,
    cover_image: "/placeholder.svg?height=400&width=300",
    upload_date: "2025-01-17",
    seller_id: "seller2",
    seller_name: "Jane Smith",
    status: "active" as const,
  },
  {
    id: "5",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    price: 95000,
    cover_image: "/placeholder.svg?height=400&width=300",
    upload_date: "2025-01-16",
    seller_id: "seller1",
    seller_name: "John Doe",
    status: "active" as const,
  },
  {
    id: "6",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 65000,
    cover_image: "/placeholder.svg?height=400&width=300",
    upload_date: "2025-01-15",
    seller_id: "seller2",
    seller_name: "Jane Smith",
    status: "active" as const,
  },
]

interface Book {
  id: string
  title: string
  author: string
  genre: string
  price: number
  cover_image: string
  upload_date: string
  seller_id: string
  seller_name: string
  status: "active" | "sold" | "inactive"
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      // Check if we're in offline mode
      const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!hasSupabase) {
        // Use mock data in preview mode
        setBooks(MOCK_BOOKS)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("books")
        .select(`
          *,
          users!books_seller_id_fkey(full_name)
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false })

      if (error) throw error

      const formattedBooks = data.map((book) => ({
        ...book,
        seller_name: book.users?.full_name || "Unknown",
        upload_date: book.created_at,
      }))

      setBooks(formattedBooks)
    } catch (error) {
      console.error("Error fetching books:", error)
      // Fallback to mock data on error
      setBooks(MOCK_BOOKS)
    } finally {
      setLoading(false)
    }
  }

  return { books, loading, refetch: fetchBooks }
}
