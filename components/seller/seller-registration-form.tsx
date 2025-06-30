"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export function SellerRegistrationForm() {
  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    phone: "",
    address: "",
    bankAccount: "",
    bankName: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const { user, updateUserAsSeller } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateUserAsSeller(formData)
      toast({
        title: "Berhasil menjadi penjual!",
        description: "Selamat! Anda sekarang dapat mulai menjual buku.",
      })
      router.push("/seller/dashboard")
    } catch (error) {
      toast({
        title: "Gagal mendaftar sebagai penjual",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Sebagai Penjual</CardTitle>
            <CardDescription>Lengkapi informasi di bawah untuk mulai menjual buku di SecondRead</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nama Toko</Label>
                <Input
                  id="storeName"
                  name="storeName"
                  placeholder="Masukkan nama toko Anda"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Toko</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Ceritakan tentang toko buku Anda..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Alamat lengkap untuk pengiriman"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Nama Bank</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    placeholder="Contoh: BCA, Mandiri"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Nomor Rekening</Label>
                  <Input
                    id="bankAccount"
                    name="bankAccount"
                    placeholder="Nomor rekening bank"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Daftar Sebagai Penjual"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
