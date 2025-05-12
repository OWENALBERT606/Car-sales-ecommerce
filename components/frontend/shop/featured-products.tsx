

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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.slice(0,4).map((product:any) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="">
                <div key={product.id} className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                {/* Discount Badge */}
                {product.discountedPrice && product.discountedPrice < product.price && (
                  <div className="absolute left-3 top-3 z-10 rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute right-3 top-3 z-10 rounded-full bg-white p-1.5 text-gray-400 shadow-sm hover:text-green-500">
                  <Heart className="h-5 w-5" />     
                </button>

                {/* Product Image */}
                <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-md bg-gray-50">
                  <Image
                    src={product.imageUrl || product.imageUrls?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-auto max-h-full w-auto max-w-full object-contain transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="mb-2">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                </div>

                {/* Ratings */}
                <div className="mb-3 flex items-center">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="ml-2 text-xs text-gray-500">
                    {product.reviews?.length || 0} reviews
                  </span>
                </div>
                <span>{product.description.substring(0, 60)}</span>

                {/* Price */}
                <div className="mb-3 flex items-center gap-2">
                  {product.discountedPrice && product.discountedPrice < product.price ? (
                    <>
                      <span className="text-xs text-gray-500 line-through">UGX-{product.price}</span>
                      <span className="text-sm font-bold text-green-600">UGX-{product.discountedPrice} per {product.unit.prefix}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-green-600">UGX-{product.price} per{product.unit.prefix}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" className="rounded-full">
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                  <span className={`flex items-center text-xs UGX{
                    product.status === "IN_STOCK" ? "text-green-600" : "text-orange-600"
                  }`}>
                    <span className={`mr-1 h-2 w-2 rounded-full UGX{
                      product.status === "IN_STOCK" ? "bg-green-500" : "bg-orange-500"
                    }`} />
                    {product.status === "IN_STOCK" ? "In Stock" : "Low Stock"}
                  </span>
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
