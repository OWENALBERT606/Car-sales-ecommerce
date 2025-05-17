"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductGridWithSidebar({products}:{products:any}) {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }
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
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Sidebar */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-gray-900 lg:w-[300px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
        <Image src="/luxury-car-rental-social-media-post-banner-template_488814-627.png" alt="Farm equipment" fill className="object-cover" />
        <div className="relative z-10 p-6">
          <h2 className="mb-2 text-6xl font-bold text-white">-35%</h2>
          <p className="mb-4 text-sm font-medium text-white">Only This Week</p>
          <h3 className="mb-4 text-2xl font-bold text-white">Family Card</h3>
          <p className="mb-6 text-sm text-yellow-500">
            Quality Luxury and Family Cars
          </p>
          <Link href="/shop" className="flex rounded-xl px-3 text-white py-2 items-center bg-red-600 hover:bg-red-700">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0,6).map((product:any) => (
                        <Link href={`/shop/${product.id}`} key={product.id} className="block w-36 sm:w-40 md:w-44">
            <div key={product.id} className="group relative h-full rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col">
              {/* Discount Badge */}
              {product.discountedPrice && product.discountedPrice < product.price && (
                <div className="absolute left-1 top-1 z-10 rounded bg-blue-500 px-1 py-0.5 text-xs font-bold text-white">
                  {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                </div>
              )}
          
              {/* Wishlist Button */}
              <button className="absolute right-1 top-1 z-10 rounded-full bg-white p-1 text-gray-400 shadow-sm hover:text-blue-500">
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
                    className="h-full w-full overflow-hidden object-cover transition-transform group-hover:scale-105"
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
                <div className="mt-auto flex items-center w-full justify-between">
                  <Button size="sm" variant="outline" className="h-6 w-full rounded-full bg-red-600 text-white hover:bg-red-700 text-xs px-1">
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Link>
                      ))}
        </div>
      </div>
    </div>
  )
}
