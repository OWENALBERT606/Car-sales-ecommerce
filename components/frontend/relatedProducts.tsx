import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Define enums based on the schema
enum ProductStatus {
  IN_STOCK = "IN_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  LOW_STOCK = "LOW_STOCK",
}

enum ProductUsage {
  NEW = "NEW",
  USED = "USED",
  REFURBISHED = "REFURBISHED",
}

// Define the Product type based on the schema
type Product = {
  id: string
  name: string
  description?: string
  imageUrls: string[]
  price: number
  imageUrl: string
  engine: string
  color: string
  qty: number
  status: ProductStatus
  usage: ProductUsage
  rating: number
  categoryId: string
  typeId: string
  yearId: string
  modelId: string
  makeId: string
  createdAt: Date
  updatedAt: Date
  // Relations
  category?: { id: string; name: string }
  type?: { id: string; name: string }
  year?: { id: string; name: string }
  model?: { id: string; name: string }
  make?: { id: string; name: string }
  reviews?: any[]
  reviewCount?: number
}

export default function RelatedProducts({ product, products }: { product: Product; products: Product[] }) {
  // Filter related products (same category, make, or model)
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categoryId === product.categoryId || p.makeId === product.makeId || p.modelId === product.modelId),
    )
    .slice(0, 4)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {relatedProducts.map((relatedProduct) => (
        <div
          key={relatedProduct.id}
          className="group relative rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            <Badge className="absolute left-2 top-2 z-10 bg-red-600 text-white">
              {relatedProduct.usage === ProductUsage.NEW ? "NEW" : relatedProduct.usage}
            </Badge>
            <Image
              src={relatedProduct.imageUrl || "/placeholder.svg"}
              alt={relatedProduct.name}
              width={300}
              height={225}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < relatedProduct.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Badge
                className={
                  relatedProduct.status === ProductStatus.IN_STOCK
                    ? "bg-green-100 text-green-800"
                    : relatedProduct.status === ProductStatus.OUT_OF_STOCK
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }
              >
                {relatedProduct.status === ProductStatus.IN_STOCK
                  ? "In Stock"
                  : relatedProduct.status.replace("_", " ")}
              </Badge>
            </div>
            <h3 className="mb-1 font-medium line-clamp-1">{relatedProduct.name}</h3>
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <span>{relatedProduct.make?.name || ""}</span>
              {relatedProduct.make && relatedProduct.model && <span className="mx-1">•</span>}
              <span>{relatedProduct.model?.name || ""}</span>
              {relatedProduct.model && relatedProduct.year && <span className="mx-1">•</span>}
              <span>{relatedProduct.year?.name || ""}</span>
            </div>
            <div className="mb-3 text-lg font-bold text-red-700">UGX {relatedProduct.price.toLocaleString()}</div>
            <Link href={`/products/${relatedProduct.id}`} passHref>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">View Details</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
