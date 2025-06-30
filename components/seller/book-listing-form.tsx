"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookListingFormProps {
  onSuccess: () => void
}

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

const conditions = ["Seperti Baru", "Sangat Baik", "Baik", "Cukup Baik", "Perlu Perbaikan"]

export function BookListingForm({ onSuccess }: BookListingFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    condition: "",
    price: "",
    synopsis: "",
    conditionDescription: "",
  })
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [conditionImages, setConditionImages] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleConditionImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setConditionImages(Array.from(e.target.files))
    }
  }

  const removeConditionImage = (index: number) => {
    setConditionImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would upload images and create the book listing
      // For now, we'll just simulate the process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Buku berhasil ditambahkan!",
        description: "Buku Anda telah dipublikasikan di katalog.",
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Gagal menambahkan buku",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Buku</Label>
          <Input
            id="title"
            name="title"
            placeholder="Masukkan judul buku"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Penulis</Label>
          <Input
            id="author"
            name="author"
            placeholder="Nama penulis"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={formData.genre} onValueChange={(value) => setFormData((prev) => ({ ...prev, genre: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Kondisi</Label>
          <Select
            value={formData.condition}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih kondisi" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Harga (Rp)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="50000"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="synopsis">Sinopsis</Label>
        <Textarea
          id="synopsis"
          name="synopsis"
          placeholder="Ceritakan tentang isi buku..."
          value={formData.synopsis}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="conditionDescription">Deskripsi Kondisi</Label>
        <Textarea
          id="conditionDescription"
          name="conditionDescription"
          placeholder="Jelaskan kondisi fisik buku secara detail..."
          value={formData.conditionDescription}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-2">
        <Label>Foto Cover Buku</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input type="file" accept="image/*" onChange={handleCoverImageChange} className="hidden" id="cover-upload" />
          <label htmlFor="cover-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {coverImage ? coverImage.name : "Klik untuk upload foto cover"}
            </span>
          </label>
        </div>
      </div>

      {/* Condition Images Upload */}
      <div className="space-y-2">
        <Label>Foto Kondisi Buku (Opsional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleConditionImagesChange}
            className="hidden"
            id="condition-upload"
          />
          <label htmlFor="condition-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Klik untuk upload foto kondisi buku</span>
          </label>
        </div>

        {conditionImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {conditionImages.map((file, index) => (
              <div key={index} className="relative">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-600">{file.name.slice(0, 10)}...</span>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={() => removeConditionImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onSuccess} className="flex-1 bg-transparent">
          Batal
        </Button>
        <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : "Tambah Buku"}
        </Button>
      </div>
    </form>
  )
}
