"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturedCategories({ categories }: { categories: any }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Number of items to show based on screen size
  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 5 // xl
      if (window.innerWidth >= 1024) return 4 // lg
      if (window.innerWidth >= 768) return 3 // md
      if (window.innerWidth >= 640) return 2 // sm
      return 1 // xs
    }
    return 3 // Default for SSR
  }

  const [itemsToShow, setItemsToShow] = useState(3)

  // Update items to show on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow())
    }

    // Set initial value
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate total number of pages
  const totalPages = Math.ceil(categories.length / itemsToShow)

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1))
  }

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1))
  }

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, autoplay, totalPages])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>
          <p className="text-sm text-gray-500">Browse our most popular agricultural categories</p>
        </div>
        <Link href="/categories" className="flex items-center text-sm font-medium text-green-600 hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Carousel Navigation */}
        <div className="absolute inset-y-0 left-0 z-10 flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 shadow-md -ml-4"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 z-10 flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 shadow-md -mr-4"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        {/* Carousel Track */}
        <div ref={carouselRef} className="overflow-hidden px-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              width: `${(categories.length / itemsToShow) * 100}%`,
            }}
          >
            {categories.map((category: any) => (
              <div key={category.id} className="px-2" style={{ width: `${(100 / categories.length) * itemsToShow}%` }}>
                <Link
                  href={`/category/${category.id}`}
                  className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md h-full"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={category.imageUrl || "/placeholder.svg?height=300&width=300"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="mb-1 font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.products?.length || 0} products</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-green-600" : "w-2 bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
