"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, X, ShoppingCart, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function WishlistPage() {
  // Sample wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Organic Raw Wildflower Honey",
      originalPrice: 29.99,
      salePrice: 24.99,
      image: "/placeholder.svg?height=80&width=80&text=Honey",
      dateAdded: "April 11, 2025",
      inStock: true,
    },
    {
      id: 2,
      name: "Premium Heirloom Tomato Seeds Collection",
      originalPrice: 18.95,
      salePrice: 15.75,
      image: "/placeholder.svg?height=80&width=80&text=Seeds",
      dateAdded: "April 11, 2025",
      inStock: true,
    },
    {
      id: 3,
      name: "Handcrafted Cedar Raised Garden Bed",
      originalPrice: 129.99,
      salePrice: 99.95,
      image: "/placeholder.svg?height=80&width=80&text=Garden+Bed",
      dateAdded: "April 11, 2025",
      inStock: true,
    },
    {
      id: 4,
      name: "Stainless Steel Pruning Shears Set",
      originalPrice: 34.99,
      salePrice: 29.99,
      image: "/placeholder.svg?height=80&width=80&text=Shears",
      dateAdded: "April 11, 2025",
      inStock: false,
    },
  ])

  // Function to remove item from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-800">My Wishlist</h1>
        <p className="mt-2 text-gray-600">
          Items you've saved for later. Add them to your cart when you're ready to purchase.
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4 pl-4 font-medium text-gray-600">Product</th>
                <th className="pb-4 font-medium text-gray-600">Price</th>
                <th className="pb-4 font-medium text-gray-600">Date Added</th>
                <th className="pb-4 font-medium text-gray-600">Stock</th>
                <th className="pb-4 font-medium text-gray-600">Add to cart</th>
                <th className="pb-4 pr-4 font-medium text-gray-600 sr-only">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {wishlistItems.map((item) => (
                <tr key={item.id} className="group">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link href="#" className="font-medium text-green-800 hover:text-green-600">
                          {item.name}
                        </Link>
                        {item.id === 1 && (
                          <Badge className="ml-2 bg-green-100 text-xs font-normal text-green-800">Organic</Badge>
                        )}
                        {item.id === 2 && (
                          <Badge className="ml-2 bg-amber-100 text-xs font-normal text-amber-800">Non-GMO</Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      <span className="font-medium text-green-700">${item.salePrice.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{item.dateAdded}</td>
                  <td className="py-4">
                    {item.inStock ? (
                      <span className="text-sm font-medium text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm font-medium text-red-500">Out of stock</span>
                    )}
                  </td>
                  <td className="py-4">
                    {item.inStock ? (
                      <Button className="bg-green-600 hover:bg-green-700">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
                      </Button>
                    ) : (
                      <Button variant="outline">
                        <AlertCircle className="mr-2 h-4 w-4" /> Read more
                      </Button>
                    )}
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                      className="h-8 w-8 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-gray-400"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-medium">Your wishlist is empty</h2>
          <p className="mb-6 text-gray-500">
            Browse our agricultural products and add your favorites to your wishlist.
          </p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Share on:</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Twitter className="h-5 w-5 text-blue-400" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Instagram className="h-5 w-5 text-pink-600" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Linkedin className="h-5 w-5 text-blue-700" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="mb-6 text-xl font-bold text-green-800">You might also like</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Suggested Product 1 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Badge className="absolute left-2 top-2 bg-green-600">15% OFF</Badge>
              <Image
                src="/placeholder.svg?height=150&width=150&text=Organic+Apples"
                alt="Organic Apples"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
              <Button variant="outline" size="icon" className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </Button>
            </div>
            <h3 className="mt-4 font-medium">Organic Red Apples</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 line-through">$3.99</span>
                <span className="ml-1 font-medium text-green-700">$3.39</span>
              </div>
              <Button size="sm" className="h-8 w-8 bg-green-600 p-0 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Product 2 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Badge className="absolute left-2 top-2 bg-amber-600">NEW</Badge>
              <Image
                src="/placeholder.svg?height=150&width=150&text=Compost+Bin"
                alt="Compost Bin"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
              <Button variant="outline" size="icon" className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </Button>
            </div>
            <h3 className="mt-4 font-medium">Compost Bin - 5 Gallon</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="font-medium text-green-700">$39.99</span>
              </div>
              <Button size="sm" className="h-8 w-8 bg-green-600 p-0 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Product 3 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=150&width=150&text=Garden+Tools"
                alt="Garden Tools Set"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
              <Button variant="outline" size="icon" className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </Button>
            </div>
            <h3 className="mt-4 font-medium">Garden Tools Set</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="font-medium text-green-700">$29.95</span>
              </div>
              <Button size="sm" className="h-8 w-8 bg-green-600 p-0 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Product 4 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Badge className="absolute left-2 top-2 bg-red-600">BEST SELLER</Badge>
              <Image
                src="/placeholder.svg?height=150&width=150&text=Bee+Pollen"
                alt="Bee Pollen"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
              <Button variant="outline" size="icon" className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </Button>
            </div>
            <h3 className="mt-4 font-medium">Organic Bee Pollen</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 line-through">$19.99</span>
                <span className="ml-1 font-medium text-green-700">$17.99</span>
              </div>
              <Button size="sm" className="h-8 w-8 bg-green-600 p-0 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
