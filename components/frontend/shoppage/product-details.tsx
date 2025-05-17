
"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Minus, Plus, ShoppingCart, Heart, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProducts } from "@/hooks/useProducts"
import RelatedProducts from "../relatedProducts"

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

enum SteeringType {
  RIGHT = "RIGHT",
  LEFT = "LEFT",
}

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
  steering: SteeringType
  fuelId: string
  createdAt: Date
  updatedAt: Date
  category?: { id: string; name: string }
  type?: { id: string; name: string }
  year?: { id: string; name: string }
  model?: { id: string; name: string }
  make?: { id: string; name: string }
  fuel?: { id: string; name: string }
  reviews?: any[]
}

export default function ProductDetail({ product }: { product: any }) {
  const { products } = useProducts()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(product.qty || 1)


  const handleThumbnailClick = (index: number) => setSelectedImage(index)
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1)
  const increaseQuantity = () => setQuantity(quantity + 1)

  const getStatusBadgeColor = (status: ProductStatus) => {
    switch (status) {
      case ProductStatus.IN_STOCK:
        return "bg-green-100 text-green-800"
      case ProductStatus.OUT_OF_STOCK:
        return "bg-red-100 text-red-800"
      case ProductStatus.LOW_STOCK:
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUsageBadgeColor = (usage: ProductUsage) => {
    switch (usage) {
      case ProductUsage.NEW:
        return "bg-blue-100 text-blue-800"
      case ProductUsage.USED:
        return "bg-amber-100 text-amber-800"
      case ProductUsage.REFURBISHED:
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 bg-white py-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr]">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border border-gray-200">
            <Badge className="absolute left-4 top-4 z-10 bg-red-600 text-white">
              {product.usage}
            </Badge>
            <div className="aspect-square w-full">
              <Image
                src={selectedImage !== null ? product.imageUrls[selectedImage] : product.imageUrl}
                alt={product.name}
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.imageUrls.map((image:any, index:any) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`min-w-[80px] rounded border ${
                  selectedImage === index ? "border-red-600" : "border-gray-200"
                }`}
              >
                <div className="aspect-square w-[80px]">
                  <Image
                    src={image}
                    alt={`Thumbnail ${index}`}
                    width={800}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.description || "No description provided."}</p>

          <div className="flex items-center space-x-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < product.rating ? "fill-red-400 text-red-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.reviews?.length || 0} reviews</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Status:</span>
              <Badge className={getStatusBadgeColor(product.status)}>
                {product.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Usage:</span>
              <Badge className={getUsageBadgeColor(product.usage)}>
                {product.usage.replace("_", " ")}
              </Badge>
            </div>
          </div>

          <p className="text-3xl font-bold text-red-700">UGX {product.price.toLocaleString()}</p>

          {product.status === ProductStatus.LOW_STOCK && (
            <div className="text-sm text-red-600 font-semibold">
              Only {product.qty} left in stock!
            </div>
          )}

          {/* Technical Info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div><strong>Make:</strong> {product.make?.name || "N/A"}</div>
            <div><strong>Model:</strong> {product.model?.name || "N/A"}</div>
            <div><strong>Year:</strong> {product.year?.name || "N/A"}</div>
            <div><strong>Category:</strong> {product.category?.name || "N/A"}</div>
            <div><strong>Type:</strong> {product.type?.name || "N/A"}</div>
            <div><strong>Color:</strong> {product.color}</div>
            <div><strong>Engine:</strong> {product.engine}</div>
            <div><strong>Fuel:</strong> {product.fuel?.name || "N/A"}</div>
            <div><strong>Steering:</strong> {product.steering === "RIGHT" ? "Right Hand Drive" : "Left Hand Drive"}</div>
          </div>

          {/* Quantity and Cart */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="bg-red-600 hover:bg-red-700 text-white flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>

            <Button variant="outline" size="icon" className="text-red-600 border-red-200 hover:bg-red-50">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-4 pt-4">
            <span className="text-sm font-medium">Share:</span>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="rounded-full border-red-200 text-red-600 hover:bg-red-50">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <RelatedProducts product={product} products={products}/> */}
    </div>
  )
}

