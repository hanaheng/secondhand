"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"

interface BookDetails {
  id: string
  title: string
  author: string
  genre: string
  price: number
  cover_image: string
  condition_images: string[]
  synopsis: string
  condition: string
  condition_description: string
  seller_id: string
  seller_name: string
  seller_joined: string
  created_at: string
}

export function useBook(bookId: string) {
  const [book, setBook] = useState<BookDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (bookId) {
      fetchBook()
    }
  }, [bookId])

  const fetchBook = async () => {
    try {
      const { data, error } = await supabase
        .from("books")
        .select(`
          *,
          users!books_seller_id_fkey(full_name, created_at)
        `)
        .eq("id", bookId)
        .single()

      if (error) throw error

      const bookDetails: BookDetails = {
        ...data,
        seller_name: data.users?.full_name || "Unknown",
        seller_joined: data.users?.created_at || data.created_at,
        condition_images: data.condition_images || [],
      }

      setBook(bookDetails)
    } catch (error) {
      console.error("Error fetching book:", error)
    } finally {
      setLoading(false)
    }
  }

  return { book, loading, refetch: fetchBook }
}
