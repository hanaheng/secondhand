"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"

interface User {
  id: string
  email: string
  full_name: string
  is_seller: boolean
  store_name?: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserAsSeller: (sellerData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id, session)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id, session)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string, session: any) => {
    try {
      // maybeSingle() will NOT throw if 0 rows are returned – it simply resolves with
      // `data: null`. That prevents the "JSON object requested, multiple (or no) rows
      // returned" error you saw in preview/prod when a profile row is missing.
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).maybeSingle()

      if (error && error.details !== "0 rows") throw error
      if (!data) {
        // No profile yet - treat as buyer only
        setUser({
          id: userId,
          email: session.user.email ?? "",
          full_name: session.user.user_metadata?.full_name ?? "",
          is_seller: false,
          created_at: new Date().toISOString(),
        })
      } else {
        setUser(data)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          is_seller: false,
        },
      ])
      if (profileError) throw profileError
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const updateUserAsSeller = async (sellerData: any) => {
    if (!user) throw new Error("No user logged in")

    const { error } = await supabase
      .from("users")
      .update({
        is_seller: true,
        store_name: sellerData.storeName,
        store_description: sellerData.description,
        phone: sellerData.phone,
        address: sellerData.address,
        bank_account: sellerData.bankAccount,
        bank_name: sellerData.bankName,
      })
      .eq("id", user.id)

    if (error) throw error

    // Refresh user data
    await fetchUserProfile(user.id, null)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserAsSeller,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
