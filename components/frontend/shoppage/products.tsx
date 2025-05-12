"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Grid, List, ShoppingCart, Heart, CarTaxiFront, ShoppingCartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function Products({ products,categories,farms,locations }: { products: any[] ,farms:any[],locations:any[],categories:any[]}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("latest")
  const [itemsPerPage, setItemsPerPage] = useState("16")
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  // Sorting logic
  const sortProducts = (prods: any[]) => {
    switch (sortBy) {
      case "price-low":
        return [...prods].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...prods].sort((a, b) => b.price - a.price)
      case "popular":
        return [...prods].sort((a, b) => b.reviews - a.reviews)
      default:
        return prods
    }
  }

  const loadMoreProducts = () => {
    if (loading || !hasMore) return

    setLoading(true)

    setTimeout(() => {
      const currentLength = displayedProducts.length
      const perPage = parseInt(itemsPerPage)
      const nextProducts = sortProducts(products).slice(
        currentLength,
        currentLength + perPage
      )

      if (nextProducts.length > 0) {
        setDisplayedProducts((prev) => [...prev, ...nextProducts])
      } else {
        setHasMore(false)
      }

      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    // Reset list when sort or per-page changes
    const perPage = parseInt(itemsPerPage)
    const sorted = sortProducts(products).slice(0, perPage)
    setDisplayedProducts(sorted)
    setHasMore(perPage < products.length)
  }, [sortBy, itemsPerPage, products])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreProducts()
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [loaderRef.current, loading, hasMore])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-green-800">
        Find Fresh Agricultural Produce
      </h1>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6">
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-600">
              Finding the right agricultural products will help you maximize your harvest and ensure quality produce for
              your customers. Browse our marketplace to connect with local farmers and suppliers.
            </p>

            <div className="mt-4 space-y-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="grains">Grains & Cereals</SelectItem>
                  <SelectItem value="dairy">Dairy Products</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="organic">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Farming Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="conventional">Conventional</SelectItem>
                  <SelectItem value="hydroponic">Hydroponic</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="local">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="local">Local Farms</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="imported">Imported</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="mt-4 w-full bg-green-600 hover:bg-green-700" size="sm">
              Find Products
            </Button>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="font-medium">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="fruits" />
                <span>Fruits & Berries</span>
                <span className="ml-auto text-xs text-gray-500">(42)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="vegetables" />
                <span>Vegetables</span>
                <span className="ml-auto text-xs text-gray-500">(38)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="grains" />
                <span>Grains & Cereals</span>
                <span className="ml-auto text-xs text-gray-500">(24)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="nuts" />
                <span>Nuts & Seeds</span>
                <span className="ml-auto text-xs text-gray-500">(16)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="dairy" />
                <span>Dairy Products</span>
                <span className="ml-auto text-xs text-gray-500">(12)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="honey" />
                <span>Honey & Bee Products</span>
                <span className="ml-auto text-xs text-gray-500">(8)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="herbs" />
                <span>Herbs & Spices</span>
                <span className="ml-auto text-xs text-gray-500">(15)</span>
              </label>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="font-medium">Filter by price</h3>
            <div className="px-2">
              <Slider defaultValue={[0, 100]} max={100} step={1} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Price: UGX-0 — UGX-100</span>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="font-medium">Product Status</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="in-stock" />
                <span>In Stock</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="on-sale" />
                <span>On Sale</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="organic-certified" />
                <span>Organic Certified</span>
              </label>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="font-medium">Seller Type</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="farmers" />
                <span>Direct from Farmers</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="cooperatives" />
                <span>Farmer Cooperatives</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox id="wholesalers" />
                <span>Wholesalers</span>
              </label>
            </div>
          </div>
        </div>
          
          </div>

        {/* Products Grid */}
        <div className="space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-gray-600">
              Showing {displayedProducts.length} of {products.length} products
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9 w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Sort by latest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Show:</span>
                <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                  <SelectTrigger className="h-9 w-[80px]">
                    <SelectValue placeholder="16" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="36">36</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {displayedProducts.map((product) => (
    <Link
      href={`/shop/${product.id}`}
      key={`${product.id}-${product.name}`}
      className={`group relative UGX-{
        viewMode === "list" ? "flex gap-4" : ""
      } rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md`}
    >
      <div className={`relative UGX-{viewMode === "list" ? "w-1/3" : "w-full"}`}>
        {product.badge && (
          <Badge className={`absolute left-2 top-2 UGX-{product.badge.color}`}>
            {product.badge.text}
          </Badge>
        )}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="mx-auto h-auto w-full object-cover"
        />
      </div>
    </Link>
  ))}
          </div>

          {/* Loader trigger for infinite scroll */}
          <div ref={loaderRef} className="h-10"></div>
          {loading && (
            <div className="text-center text-gray-500">Loading more products...</div>
          )}
        </div>
      </div>
    </div>
  )
}
