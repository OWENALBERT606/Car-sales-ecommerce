"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export default function UserReviews() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const reviews = [
    {
      id: 1,
      name: "Michael Thompson",
      role: "Organic Farmer",
      location: "California",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "FarmConnect has transformed how I sell my organic vegetables. The platform connects me directly with customers who appreciate quality produce. My sales have increased by 35% since joining!",
      product: "Organic Vegetable Bundle",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Small-Scale Farmer",
      location: "Oregon",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "As a small farm owner, I struggled to find reliable buyers. FarmConnect solved that problem completely. The ordering system is straightforward, payments are prompt, and customer service is excellent.",
      product: "Seasonal Fruit Box",
    },
    {
      id: 3,
      name: "Robert Garcia",
      role: "Urban Gardener",
      location: "New York",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4,
      text: "I've been purchasing seeds and gardening tools from FarmConnect for my urban garden. The quality is consistently high, and I love supporting local farmers. Delivery is always on time.",
      product: "Heirloom Seed Collection",
    },
    {
      id: 4,
      name: "Emily Wilson",
      role: "Restaurant Owner",
      location: "Texas",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Our farm-to-table restaurant relies on fresh, local ingredients. FarmConnect helps us source directly from farmers in our area. The produce quality is exceptional and our customers can taste the difference.",
      product: "Weekly Restaurant Supply Box",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  return (
    <section className="w-full bg-green-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Hear from farmers and buyers who have experienced the benefits of our agricultural marketplace
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Review Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="rounded-lg bg-white p-8 shadow-md">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full">
                          <Image
                            src={review.image || "/placeholder.svg"}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{review.name}</h4>
                          <p className="text-sm text-gray-600">
                            {review.role} from {review.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote className="mb-4 text-gray-700">"{review.text}"</blockquote>
                    <p className="text-sm font-medium text-green-600">Purchased: {review.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 w-2.5 rounded-full ${currentSlide === index ? "bg-green-600" : "bg-gray-300"}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
