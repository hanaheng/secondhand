"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Shield, MessageCircle, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Temukan Buku Impian Anda di <span className="text-orange-600">Secondhand</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Platform marketplace buku preloved terpercaya. Jual buku lama Anda atau temukan buku berkualitas dengan
              harga terjangkau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                  Mulai Berbelanja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                  Jelajahi Katalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Secondhand?</h2>
            <p className="text-lg text-gray-600">Platform yang menghubungkan pecinta buku di seluruh Indonesia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Koleksi Lengkap</h3>
                <p className="text-gray-600">Ribuan buku dari berbagai genre dan penulis terkenal</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Komunitas Aktif</h3>
                <p className="text-gray-600">Bergabung dengan ribuan pecinta buku di Indonesia</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transaksi Aman</h3>
                <p className="text-gray-600">Sistem pembayaran yang aman dan terpercaya</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <MessageCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Chat Langsung</h3>
                <p className="text-gray-600">Komunikasi langsung dengan penjual untuk negosiasi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 warm-gradient text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Buku Terjual</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-lg opacity-90">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-lg opacity-90 flex items-center justify-center">
                <Star className="h-5 w-5 mr-1 fill-current" />
                Rating Pengguna
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Siap Memulai Perjalanan Membaca Anda?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Bergabunglah dengan ribuan pecinta buku lainnya dan temukan buku impian Anda hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
