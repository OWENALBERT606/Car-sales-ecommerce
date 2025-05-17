

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  description: string
  imageUrl?: string
  imageUrls?: string[]
  price: number
  discountedPrice?: number
  rating: number
  reviews?: any[]
  status: "IN_STOCK" | "LOW_STOCK"
  categoryId: string
}

interface FeaturedProductsProps {
  products: Product[]
  categories: Category[]
}

export default function FeaturedProducts({ products, categories }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("featured")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProducts = async () => {
      if (activeCategory === "featured") {
        setFilteredProducts(products)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/products?categoryId=UGX{activeCategory}`)
        const data = await response.json()
        setFilteredProducts(data.products ?? products.filter(p => p.categoryId === activeCategory))
      } catch (error) {
        console.error("Error fetching products:", error)
        setFilteredProducts(products.filter(p => p.categoryId === activeCategory))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [activeCategory, products])

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 UGX{i < rating ? "fill-amber-400" : "fill-gray-200"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="mb-6 flex border-b border-gray-200 overflow-x-auto">
        {[
          { id: "featured", name: "Featured" },
          ...categories.slice(0, 5)
        ].map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors UGX{
              activeCategory === category.id
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {category.name}
          </button>
        ))}

        <div className="ml-auto flex items-center px-4">
          <Link href="/shop" className="flex items-center text-sm font-medium text-green-600 hover:underline">
            View All <span className="ml-1">→</span>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {filteredProducts.slice(0,6).map((product:any) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="block w-36 sm:w-40 md:w-44">
  <div key={product.id} className="group relative h-full rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col">
    {/* Discount Badge */}
    {product.discountedPrice && product.discountedPrice < product.price && (
      <div className="absolute left-1 top-1 z-10 rounded bg-green-500 px-1 py-0.5 text-xs font-bold text-white">
        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
      </div>
    )}

    {/* Wishlist Button */}
    <button className="absolute right-1 top-1 z-10 rounded-full bg-white p-1 text-gray-400 shadow-sm hover:text-green-500">
      <Heart className="h-3 w-3" />     
    </button>

    {/* Product Image - Full Width */}
    <div className="overflow-hidden">
      <div className="h-32 w-full bg-gray-50">
        <Image
          src={product.imageUrl || product.imageUrls?.[0] || "/placeholder.svg"}
          alt={product.name}
          width={160}
          height={128}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
    </div>

    {/* Product Info */}
    <div className="p-2 flex flex-col flex-grow">
      <h3 className="mb-1 text-xs font-medium text-red-600 line-clamp-1">{product.name}</h3>
      
      <div className="mb-1 flex items-center">
        <div className="flex scale-75 origin-left">{renderStars(product.rating)}</div>
        <span className="ml-1 text-xs text-gray-500">
          {product.reviews?.length || 0}
        </span>
      </div>

      {/* Price */}
      <div className="mb-1">
        <span className="text-sm font-bold text-red-600">UGX-{product.price}M</span>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center justify-between">
        <Button size="sm" variant="outline" className="h-6 w-16 rounded-full bg-red-600 text-white hover:bg-red-700 text-xs px-1">
          <ShoppingCart className="mr-1 h-3 w-3" />
          Add
        </Button>
        <span className={`flex items-center text-xs ${
          product.status === "IN_STOCK" ? "text-green-600" : "text-orange-600"
        }`}>
          <span className={`mr-0.5 h-1 w-1 rounded-full ${
            product.status === "IN_STOCK" ? "bg-green-500" : "bg-orange-500"
          }`} />
          <span className="text-xs">
            {product.status === "IN_STOCK" ? "In" : "Low"}
          </span>
        </span>
      </div>
    </div>
  </div>
</Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </>
      )}

      {/* Pagination Dots */}
      {filteredProducts.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                className={`h-2 w-2 rounded-full UGX{dot === 0 ? "bg-green-500" : "bg-gray-300"}`}
                aria-label={`Go to page UGX{dot + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
