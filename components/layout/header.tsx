"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png"
              width={100}
              height={100} alt={""}/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              HOME
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 transition-colors">
              GENRE
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-orange-600 transition-colors">
              NEW ARRIVALS
            </Link>
            {user && (
              <Link href="/seller/dashboard" className="text-gray-700 hover:text-orange-600 transition-colors">
                SELL YOUR BOOK
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Keluar
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-orange-600">
                HOME
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600">
                GENRE
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600">
                NEW ARRIVALS
              </Link>
              {user && (
                <Link href="/seller/dashboard" className="text-gray-700 hover:text-orange-600">
                  SELL YOUR BOOK
                </Link>
              )}
              <div className="pt-4 border-t">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={signOut} className="w-full bg-transparent">
                      Keluar
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm" className="w-full">
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                        Daftar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
