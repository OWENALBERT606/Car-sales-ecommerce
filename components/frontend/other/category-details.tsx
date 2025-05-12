

"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Heart, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts } from "@/hooks/useProducts"

export default function CategoryDetail({category}:{category:any}) {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [activeSlide, setActiveSlide] = useState(0)
  const [showFilters, setShowFilters] = useState(true)

  // Toggle favorite status
  const toggleFavorite = (productId: number) => {
    if (favoriteProducts.includes(productId)) {
      setFavoriteProducts(favoriteProducts.filter((id) => id !== productId))
    } else {
      setFavoriteProducts([...favoriteProducts, productId])
    }
  }

  const { products } = useProducts();

  // Make sure category exists and has an id before filtering
  const filteredProducts = products?.filter((product: any) => 
    product?.categoryId === category?.id
  ) || [];

  // Calculate discount percentage correctly
  const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number) => {
    if (!originalPrice || !discountedPrice || originalPrice <= 0) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  return (
    <div className="mx-auto px-4">
      {/* Banner Slider */}
      <div className="relative mb-8 overflow-hidden rounded-lg">
        <div className="relative h-[170px] w-full">
          <Image
            src={category?.imageUrl}
            alt={category?.name}
            fill
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-4xl font-semibold">{category?.name || "Category"}</h3>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="sticky top-4 space-y-6">
            {/* Category Filter */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">Category</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Clear
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search Category" className="pl-8" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="seeds" />
                  <Label htmlFor="seeds" className="text-sm font-normal">
                    Seeds & Bulbs
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fertilizers" />
                  <Label htmlFor="fertilizers" className="text-sm font-normal">
                    Fertilizers & Soil Amendments
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tools" />
                  <Label htmlFor="tools" className="text-sm font-normal">
                    Garden Tools & Equipment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="irrigation" />
                  <Label htmlFor="irrigation" className="text-sm font-normal">
                    Irrigation & Watering
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="planters" />
                  <Label htmlFor="planters" className="text-sm font-normal">
                    Planters & Raised Beds
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pest-control" />
                  <Label htmlFor="pest-control" className="text-sm font-normal">
                    Pest & Disease Control
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="composting" />
                  <Label htmlFor="composting" className="text-sm font-normal">
                    Composting Supplies
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="harvest" />
                  <Label htmlFor="harvest" className="text-sm font-normal">
                    Harvesting & Storage
                  </Label>
                </div>
              </div>

              <Button variant="link" size="sm" className="mt-2 h-8 p-0 text-xs text-green-600">
                See All
              </Button>
            </div>

            {/* Sub Category Filter */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">Sub Category</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Clear
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search Sub Category" className="pl-8" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="vegetable-seeds" />
                  <Label htmlFor="vegetable-seeds" className="text-sm font-normal">
                    Vegetable Seeds
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="flower-seeds" />
                  <Label htmlFor="flower-seeds" className="text-sm font-normal">
                    Flower Seeds
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="herb-seeds" />
                  <Label htmlFor="herb-seeds" className="text-sm font-normal">
                    Herb Seeds
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fruit-seeds" />
                  <Label htmlFor="fruit-seeds" className="text-sm font-normal">
                    Fruit Seeds
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="seed-starting" />
                  <Label htmlFor="seed-starting" className="text-sm font-normal">
                    Seed Starting Supplies
                  </Label>
                </div>
              </div>

              <Button variant="link" size="sm" className="mt-2 h-8 p-0 text-xs text-green-600">
                See All
              </Button>
            </div>

            {/* Brand Filter */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">Brand</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Clear
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search Brand" className="pl-8" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="burpee" />
                  <Label htmlFor="burpee" className="text-sm font-normal">
                    Burpee
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ferry-morse" />
                  <Label htmlFor="ferry-morse" className="text-sm font-normal">
                    Ferry-Morse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="botanical-interests" />
                  <Label htmlFor="botanical-interests" className="text-sm font-normal">
                    Botanical Interests
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="johnnys" />
                  <Label htmlFor="johnnys" className="text-sm font-normal">
                    Johnny's Selected Seeds
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="baker-creek" />
                  <Label htmlFor="baker-creek" className="text-sm font-normal">
                    Baker Creek Heirloom
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="espoma" />
                  <Label htmlFor="espoma" className="text-sm font-normal">
                    Espoma
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="foxfarm" />
                  <Label htmlFor="foxfarm" className="text-sm font-normal">
                    FoxFarm
                  </Label>
                </div>
              </div>

              <Button variant="link" size="sm" className="mt-2 h-8 p-0 text-xs text-green-600">
                See All
              </Button>
            </div>

            {/* Price Range Filter */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-4 font-medium">Pricing (USD)</h3>

              <div className="px-2">
                <Slider defaultValue={[0, 500]} max={500} step={1} value={priceRange} onValueChange={setPriceRange} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-24 text-center"
                />
                <span className="text-sm">TO</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                  className="w-24 text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Listing */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">{filteredProducts.length} Products</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by</span>
              <Select defaultValue="featured">
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="bestselling">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredProducts.map((product:any) => {
              // Calculate discount percentage properly
              const discountPercent = calculateDiscountPercentage(product.price, product.discountedPrice);

              return (
                <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="relative">
                    {discountPercent > 0 && (
                      <Badge className="absolute left-2 top-2 bg-green-600">{discountPercent}% OFF</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className={`absolute right-2 top-2 h-8 w-8 rounded-full bg-white ${
                        favoriteProducts.includes(product.id) ? "text-red-500" : "text-gray-400"
                      }`}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart className={`h-4 w-4 ${favoriteProducts.includes(product.id) ? "fill-red-500" : ""}`} />
                    </Button>
                    <Image
                      src={product.imageUrl || "/api/placeholder/200/200"}
                      alt={product.name || "Product"}
                      width={200}
                      height={200}
                      className="mx-auto h-[200px] w-auto object-contain"
                    />
                  </div>

                  <div className="mt-4">
                    {/* Safely access category name */}
                    <div className="mb-1 text-xs text-gray-500">
                      {category?.name || "Category"}
                    </div>
                    <h3 className="font-medium">{product.name || "Product"}</h3>

                    <div className="mt-2 flex items-center">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          {product.price && product.discountedPrice && product.price > product.discountedPrice ? (
                            <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                          ) : null}
                          <span className="text-lg font-semibold text-green-700">
                            ${product.discountedPrice?.toFixed(2) || product.price?.toFixed(2) || "0.00"}
                          </span>
                          <span className="text-xs text-gray-500">/{product.unit?.prefix || "each"}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="mt-3 w-full bg-green-600 hover:bg-green-700">ADD TO CART</Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              1
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
              2
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
              3
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
