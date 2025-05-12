"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Minus, Plus, ShoppingCart, Heart, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RelatedProducts from "./relatedProducts"
import { useProducts } from "@/hooks/useProducts"

export default function ProductDetail({product}:{product:any}) {
  const {products}=useProducts();
  
  // State for selected image
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index)
  }

  // State for quantity
  const [quantity, setQuantity] = useState(1)

  // Functions to handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="container mx-auto px-4">
      {/* <div className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:text-green-600">
          Shop
        </Link>{" "}
        /{" "}
        <Link href="/shop/honey" className="hover:text-green-600">
          Honey & Bee Products
        </Link>{" "}
        / {product.name}
      </div> */}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr]">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-lg border border-gray-200">
            <Badge className="absolute left-4 top-4 z-10 bg-green-600">{product.price/1000}%</Badge>
            <div className="aspect-square w-full">
            <Image
              src={selectedImage !== null ? product.imageUrls[selectedImage] : product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.imageUrls.map((image:any, index:any) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative min-w-[80px] overflow-hidden rounded border Ugx-{
                  selectedImage === index ? "border-green-600" : "border-gray-200"
                }`}
              >
                <div className="aspect-square w-[80px]">
                <Image
                  key={index}
                  src={image}
                  alt={`Thumbnail Ugx-{index}`}
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer border-2 Ugx-{
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description.substring(0,100)}</p>
          </div>

          {/* <div className="flex items-center space-x-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 Ugx-{i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.reviewCount} customer reviews</span>
          </div> */}

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">SKU:</span>
            {/* <span className="text-sm">{product.sku}</span> */}
            <Badge className="ml-2 bg-green-100 text-green-800">In Stock</Badge>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-green-700">Ugx-{product.price}</span>
            {product.price && (
              <span className="text-lg text-gray-500 line-through">Ugx-{product.price} per{product.unit.prefix}</span> 
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm text-green-600">
            <span className="font-medium">This item is low in stock.</span>
            <span>Items left:  40</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none border-r"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex h-10 w-12 items-center justify-center text-center">
                <span>{quantity}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none border-l"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <span className="text-sm font-medium">Share:</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
            <div className="flex flex-col items-center text-center text-sm">
              <div className="mb-2 rounded-full bg-green-100 p-2 text-green-700">
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
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="font-medium">100% Organic</span>
              <span className="text-xs text-gray-500">Certified Products</span>
            </div>
            <div className="flex flex-col items-center text-center text-sm">
              <div className="mb-2 rounded-full bg-green-100 p-2 text-green-700">
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
                >
                  <rect width="16" height="16" x="4" y="4" rx="2" />
                  <path d="m9 9 6 6" />
                  <path d="m15 9-6 6" />
                </svg>
              </div>
              <span className="font-medium">Free Shipping</span>
              <span className="text-xs text-gray-500">On orders over Ugx-50</span>
            </div>
            <div className="flex flex-col items-center text-center text-sm">
              <div className="mb-2 rounded-full bg-green-100 p-2 text-green-700">
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
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="font-medium">Quality Guarantee</span>
              <span className="text-xs text-gray-500">100% satisfaction</span>
            </div>
            <div className="flex flex-col items-center text-center text-sm">
              <div className="mb-2 rounded-full bg-green-100 p-2 text-green-700">
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
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <span className="font-medium">Direct from Farm</span>
              <span className="text-xs text-gray-500">Support local farmers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="additional">Additional Information</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="space-y-4 text-gray-700">
            <span className="text-sm">{product.description}</span>
            </div>
          </TabsContent>
          <TabsContent value="additional" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-medium">Product Specifications</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span>16 oz (454g)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Packaging:</span>
                      <span>Glass jar with metal lid</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Shelf Life:</span>
                      <span>24 months</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Storage:</span>
                      <span>Store at room temperature</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Origin:</span>
                      <span>Local wildflower meadows</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-medium">Nutritional Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Serving Size:</span>
                      <span>1 tbsp (21g)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Calories:</span>
                      <span>64 per serving</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Total Carbohydrates:</span>
                      <span>17g</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sugars:</span>
                      <span>16g</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Protein:</span>
                      <span>0g</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-2 font-medium">Certifications</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1 text-green-700">
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
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                    </div>
                    <span className="text-sm">USDA Organic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1 text-green-700">
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
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                    </div>
                    <span className="text-sm">Non-GMO Project Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1 text-green-700">
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
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                    </div>
                    <span className="text-sm">Fair Trade Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-4 text-center">
                    <div className="text-5xl font-bold text-green-700">{product.rating}.0</div>
                    <div className="mt-2 flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 Ugx-{i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">Based on {product.reviewCount} reviews</div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="w-8 text-sm">{rating} star</div>
                        <div className="mx-2 h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-amber-400"
                            style={{
                              width: `Ugx-{
                                rating === product.rating ? "75%" : rating === product.rating - 1 ? "20%" : "5%"
                              }`,
                            }}
                          ></div>
                        </div>
                        <div className="w-8 text-right text-sm text-gray-600">
                          {rating === product.rating
                            ? "75%"
                            : rating === product.rating - 1
                              ? "20%"
                              : rating === product.rating - 2
                                ? "5%"
                                : "0%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Sample review */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-green-100 text-center leading-10">JD</div>
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-xs text-gray-500">Verified Buyer</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">2 months ago</div>
                    </div>
                    <div className="mb-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <h4 className="mb-2 font-medium">Absolutely delicious!</h4>
                    <p className="text-sm text-gray-700">
                      This honey is incredible - you can really taste the difference compared to store-bought varieties.
                      It has a complex, floral flavor that's perfect on toast or in tea. I also appreciate that it's
                      supporting local beekeepers. Will definitely buy again!
                    </p>
                  </div>

                  {/* Sample review */}
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-green-100 text-center leading-10">MS</div>
                        <div>
                          <div className="font-medium">Mary Smith</div>
                          <div className="text-xs text-gray-500">Verified Buyer</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">1 month ago</div>
                    </div>
                    <div className="mb-2 flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <h4 className="mb-2 font-medium">Great quality honey</h4>
                    <p className="text-sm text-gray-700">
                      The honey has a wonderful flavor and I love that it's raw and unfiltered. The only reason I'm
                      giving 4 stars instead of 5 is that the jar is a bit difficult to open. Otherwise, it's a
                      fantastic product that I'll continue to purchase.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <RelatedProducts product={product} products={products}/>
      
    </div>
  )
}
