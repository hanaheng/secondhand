"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BookListingForm } from "@/components/seller/book-listing-form"
import { SellerBookList } from "@/components/seller/seller-book-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, BookOpen, MessageCircle, DollarSign } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useSellerBooks } from "@/hooks/use-seller-books"

export function SellerDashboard() {
  const [showAddForm, setShowAddForm] = useState(false)
  const { user } = useAuth()
  const { books, loading } = useSellerBooks()

  const stats = {
    totalBooks: books.length,
    totalSold: books.filter((book) => book.status === "sold").length,
    totalRevenue: books.filter((book) => book.status === "sold").reduce((sum, book) => sum + book.price, 0),
    activeChats: 5, // This would come from a real chat system
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Penjual</h1>
          <p className="text-gray-600">Kelola buku dan penjualan Anda di sini</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Buku</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Terjual</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSold}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendapatan</p>
                  <p className="text-2xl font-bold text-gray-900">Rp {stats.totalRevenue.toLocaleString("id-ID")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chat Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeChats}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="books" className="space-y-6">
          <TabsList>
            <TabsTrigger value="books">Kelola Buku</TabsTrigger>
            <TabsTrigger value="orders">Pesanan</TabsTrigger>
            <TabsTrigger value="chats">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Daftar Buku Anda</h2>
              <Button onClick={() => setShowAddForm(true)} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Buku
              </Button>
            </div>

            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Tambah Buku Baru</CardTitle>
                  <CardDescription>Lengkapi informasi buku yang ingin Anda jual</CardDescription>
                </CardHeader>
                <CardContent>
                  <BookListingForm onSuccess={() => setShowAddForm(false)} />
                </CardContent>
              </Card>
            )}

            <SellerBookList books={books} loading={loading} />
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Pesanan</CardTitle>
                <CardDescription>Kelola pesanan dari pembeli</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Fitur pesanan akan segera hadir.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chats">
            <Card>
              <CardHeader>
                <CardTitle>Chat dengan Pembeli</CardTitle>
                <CardDescription>Komunikasi dengan calon pembeli</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Fitur chat akan segera hadir.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
