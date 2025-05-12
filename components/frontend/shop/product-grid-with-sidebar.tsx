"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ArrowRight } from "lucide-react"
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


  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Sidebar */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-gray-900 lg:w-[300px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
        <Image src="/crop-protection-banner.jpg" alt="Farm equipment" fill className="object-cover" />
        <div className="relative z-10 p-6">
          <h2 className="mb-2 text-6xl font-bold text-white">-35%</h2>
          <p className="mb-4 text-sm font-medium text-white">Only This Week</p>
          <h3 className="mb-4 text-2xl font-bold text-white">Fruits and vegetables</h3>
          <p className="mb-6 text-sm text-gray-300">
            Quality fruits and vegetables for a health and nutritious meal
          </p>
          <Link href="/shop" className="flex rounded-xl px-3 text-white py-2 items-center bg-green-600 hover:bg-green-700">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0,8).map((product:any,i:any) => (
            <Link href={`/shop/${product.id}`} key={i} className="group relative rounded-lg border border-gray-200 bg-white p-4">
              {/* Discount Badge */}
              <div className="absolute left-2 top-2 z-10">
                {typeof product.discount === "string" && isNaN(Number.parseInt(product.discountedPrice)) ? (
                  <div
                    className={`rounded px-2 py-1 text-xs font-bold text-white UGX-{
                      product.discount === "SUPER PRICE"
                        ? "bg-orange-500"
                        : product.discount === "TOP PRODUCT"
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                  >
                    {product.discount}
                  </div>
                ) : (
                  <div className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">{product.discount}</div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 shadow-sm transition-colors hover:bg-gray-100"
              >
                <Heart
                  className={`h-4 w-4 UGX-{wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>

              {/* Product Image */}
              <div className="mb-4 flex  h-36 items-center justify-center">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={600}
                  height={500}
                  className="h-auto max-h-full w-auto max-w-full object-contain transition-transform group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div>
                <h3 className="mb-2 h-10 text-sm font-medium line-clamp-2">{product.name}</h3>

                {/* Ratings */}
                <div className="mb-2 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 UGX-{i < product.rating ? "fill-amber-400" : "fill-gray-200"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">{product.reviews} review</span>
                </div>
                <span>{product.description.substring(0, 40)}</span>

                {/* Price */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500 line-through">UGX-{product.price}</span>
                  <span className="text-sm font-bold text-green-600">UGX-{product.discountedPrice} per{product.unit.prefix}</span>
                </div>

                {/* Stock Status */}
                <div className="flex items-center justify-between">
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
