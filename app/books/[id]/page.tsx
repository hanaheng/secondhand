import { BookDetails } from "@/components/books/book-details"

interface BookDetailsPageProps {
  params: {
    id: string
  }
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  return <BookDetails bookId={params.id} />
}
