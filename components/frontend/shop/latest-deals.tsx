"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ArrowRight, CarTaxiFront, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LatestDeals({products}:{products:any}) {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  const deals = [
    {
      id: 1,
      name: "Smart Soil Moisture Sensor Kit",
      description: "Wireless Farm Monitoring System",
      image: "/placeholder.svg?height=200&width=200",
      originalPrice: 88.99,
      salePrice: 83.99,
      discount: 6,
      rating: 4,
      reviews: 1,
      available: 39,
      sold: 37,
    },
    {
      id: 2,
      name: "Premium Drip Irrigation System",
      description: "Water-Saving Technology",
      image: "/placeholder.svg?height=200&width=200",
      originalPrice: 89.99,
      salePrice: 69.99,
      discount: 23,
      rating: 5,
      reviews: 1,
      available: 65,
      sold: 37,
    },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Latest Deals for This Week</h2>
          <p className="text-sm text-gray-500">Dont miss out on this weeks deals</p>
        </div>
        <Link href="/shop" className="flex items-center text-sm font-medium text-red-600 hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {products.slice(0,4).map((deal:any) => (
          <Link href={`/shop/${deal.id}`}
            key={deal.id}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center"
          >
            {/* Discount Badge */}
            <div className="relative mb-4 flex-shrink-0 md:mb-0 md:mr-6">
              <div className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center bg-red-500 text-sm rounded-xl px-1 font-bold text-white">
                {deal.discountedPrice/50}%
              </div>
              <div className="relative h-48 w-48 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={deal.imageUrl}
                  alt={deal.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                />
                <button
                  onClick={() => toggleWishlist(deal.id)}
                  className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-sm"
                >
                  <Heart
                    className={`h-5 w-5 ${wishlist.includes(deal.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col">
              <h3 className="mb-1 text-lg font-medium">{deal.name}</h3>

              {/* Ratings */}
              <div className="mb-3 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < deal.rating ? "fill-amber-400" : "fill-gray-200"}`}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-xs text-gray-500">{deal.reviews} review</span>
                
              </div>
                <span>{deal.description.substring(0, 60)}</span>

              {/* Price */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">{deal.price} M UGX</span>
              </div>

              {/* Stock Indicator */}
              <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs">
                  <span>Available: 500</span>
                  <span>Sold: 300</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-yellow-500"
                    style={{ width: `${(deal.sold / (deal.available + deal.sold)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Add to Cart */}
             
              <Button className="mt-auto w-full flex bg-red-600 hover:bg-red-700">
                 <ShoppingCart className="text-white"/>
                Add to Cart</Button>
            </div>
          </Link>
        ))}
      </div>

      {/* Discount Banner */}
      <div className="relative mt-8 overflow-hidden rounded-lg border border-red-100 bg-red-50 p-6">
        <div className="absolute -right-10 -top-10 text-[120px] font-bold text-red-100">-39%</div>
        <div className="relative z-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold text-red-500">Super discount for your first purchase</h3>
            <p className="text-sm text-gray-600">Use discount code in checkout page.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-md border border-red-200 bg-white px-4 py-2 font-mono text-lg font-bold text-red-500">
              FARM15FIRST
            </span>
            <Button className="bg-red-500 hover:bg-red-600">Shop Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
