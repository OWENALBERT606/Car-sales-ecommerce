"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

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

export default function TrendingProductCarousel() {
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
      <div className="bg-red-600 rounded-t-lg p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
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
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="border rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-pink-100 text-pink-600 px-2 py-1 rounded-md text-sm">
                      -{product.discount}%
                    </div>
                  </div>

                  <h3 className="font-medium text-sm mb-2 h-12 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-green-600 text-sm">
                      You save $
                      {(product.originalPrice - product.price).toLocaleString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-600">
                        {product.reviews} Review
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
