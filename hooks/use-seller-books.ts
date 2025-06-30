"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { useAuth } from "./use-auth"

interface SellerBook {
  id: string
  title: string
  author: string
  price: number
  cover_image: string
  status: "active" | "sold" | "inactive"
  created_at: string
}

export function useSellerBooks() {
  const [books, setBooks] = useState<SellerBook[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (user?.id) {
      fetchSellerBooks()
    }
  }, [user?.id])

  const fetchSellerBooks = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (error) {
      console.error("Error fetching seller books:", error)
    } finally {
      setLoading(false)
    }
  }

  return { books, loading, refetch: fetchSellerBooks }
}
