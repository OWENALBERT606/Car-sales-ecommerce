"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "HP Hp Stream 11 G2 Intel Celeron - 2GB RAM - 32GB HDD",
    price: 370,
    originalPrice: 300,
    rating: 5,
    reviews: 1,
    image:
      "https://inventory-app-ten-gilt.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fac944a3c-78c9-42ba-80bc-ab113efba8e2-9uotpt.webp&w=640&q=75",
    discount: 10,
  },
  {
    id: 2,
    name: 'Zinox Phoenix 14" Fhd Ips, Intel Core i3-10110u, 8g -256gb Ssd',
    price: 450,
    originalPrice: 666,
    rating: 5,
    reviews: 1,
    image:
      "https://inventory-app-ten-gilt.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F099b4e42-9a72-4b4e-bbd6-f523cd57c74a-w5bjic.webp&w=640&q=75",
    discount: 10,
  },
  {
    id: 3,
    name: 'Lenovo V15 G3 lap Laptop (12th Gen Core I5/ 21.5" 8gb/ 256 Ssd',
    price: 299,
    originalPrice: 364,
    rating: 5,
    reviews: 1,
    image:
      "https://inventory-app-ten-gilt.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F4331d814-3eba-4a8c-a956-c506a211b644-tm9vv5.webp&w=640&q=75",
    discount: 10,
  },
  {
    id: 4,
    name: 'Lenovo Thinkpad 11E Ultraportable - 11.6" - 8GB- 128GB SSD',
    price: 2499999,
    originalPrice: 2999998,
    rating: 5,
    reviews: 1,
    image:
      "https://inventory-app-ten-gilt.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F23bc3e7b-d93b-45e1-b9be-92990e21936d-hnbzic.jpg&w=640&q=75",
    discount: 10,
  },
  {
    id: 5,
    name: 'Toshiba Laptop 11E Ultraportable - 11.6" - 8GB- 128GB SSD',
    price: 2499999,
    originalPrice: 2999998,
    rating: 5,
    reviews: 1,
    image:
      "https://inventory-app-ten-gilt.vercel.app/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fbc44797e-a4bc-47c2-8c52-5d4d2908cadf-11sit6.webp&w=640&q=75",
    discount: 10,
  },
];

export default function TrendingProductCarousel({products}:{products:any}) {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const renderStars = (rating: number) => {
    return Array(7)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-red-600 rounded-t-lg p-2 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">New Arrivals</h2>
        <Link
          href="/all-products"
          className="text-white flex items-center gap-2 hover:underline"
        >
          SEE ALL
          <span className="text-xl">→</span>
        </Link>
      </div>

      <Carousel setApi={setApi} className="relative">
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product:any) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
                       <Link href={`/shop/${product.id}`} className="block w-36 sm:w-40 md:w-44">
                <div  className="group relative h-full rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md flex flex-col">
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
                    <h3 className="mb-1 text- font-medium text-red-600 line-clamp-1">{product.name}</h3>
                    
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2" />
        <CarouselNext className="right-0 translate-x-1/2" />
      </Carousel>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index + 1 === current ? "bg-red-600 w-6" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
