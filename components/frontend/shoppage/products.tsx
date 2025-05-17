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

export default function Products({ products,categories}: { products: any[] ,categories:any[]}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("latest")
  const [itemsPerPage, setItemsPerPage] = useState("16")
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 100000]);
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
      <h1 className="mb-6 text-2xl font-bold text-red-600">
        Find Your best ride now
      </h1>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        {/* <div className="space-y-6">
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

            <Button className="mt-4 w-full bg-red-600 hover:bg-red-700" size="sm">
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
          
          </div> */}
       <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-600">
          Find your perfect vehicle by filtering our extensive inventory of quality cars. 
          Browse by make, model, year, and more to discover the right car for your needs.
        </p>

        <div className="mt-4 space-y-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500">
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="camry">Camry</SelectItem>
              <SelectItem value="civic">Civic</SelectItem>
              <SelectItem value="3-series">3 Series</SelectItem>
              <SelectItem value="c-class">C-Class</SelectItem>
              <SelectItem value="mustang">Mustang</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
              <SelectItem value="older">2018 & Older</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="mt-4 w-full bg-red-600 hover:bg-red-700" size="sm">
          Find Cars
        </Button>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="font-medium text-red-800">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="sedan" />
            <span>Sedan</span>
            <span className="ml-auto text-xs text-gray-500">(42)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="suv" />
            <span>SUV</span>
            <span className="ml-auto text-xs text-gray-500">(38)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="truck" />
            <span>Truck</span>
            <span className="ml-auto text-xs text-gray-500">(24)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="coupe" />
            <span>Coupe</span>
            <span className="ml-auto text-xs text-gray-500">(16)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="hatchback" />
            <span>Hatchback</span>
            <span className="ml-auto text-xs text-gray-500">(12)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="convertible" />
            <span>Convertible</span>
            <span className="ml-auto text-xs text-gray-500">(8)</span>
          </label>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="font-medium text-red-800">Filter by price</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[0, 100000]} 
            max={100000} 
            step={1000}
            onValueChange={setPriceRange}
            className="text-red-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            Price: <span className="text-red-600 font-medium">${priceRange[0].toLocaleString()} — ${priceRange[1].toLocaleString()}</span>
          </span>
          <Button variant="outline" size="sm" className="h-8 text-xs border-red-600 text-red-600 hover:bg-red-50">
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="font-medium text-red-800">Fuel Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="petrol" />
            <span>Petrol</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="diesel" />
            <span>Diesel</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="electric" />
            <span>Electric</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="hybrid" />
            <span>Hybrid</span>
          </label>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="font-medium text-red-800">Condition</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="new" />
            <span>New</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="used" />
            <span>Used</span>
          </label>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="font-medium text-red-800">Steering Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="right" />
            <span>Right-Hand Drive</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="left" />
            <span>Left-Hand Drive</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="center" />
            <span>Center Steering</span>
          </label>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="font-medium text-red-800">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="in-stock" />
            <span>In Stock</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox id="on-sale" />
            <span>On Sale</span>
          </label>
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
       {displayedProducts.map((product:any) => (
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

