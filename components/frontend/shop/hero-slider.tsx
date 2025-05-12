"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBanners } from "@/hooks/useBanners"
import Link from "next/link"


export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const {banners,error}=useBanners();


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [banners.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-md bg-gray-900">
      {banners.map((slide:any, index:any) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80" />
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/60 to-transparent flex items-center">
            <div className="ml-12 max-w-lg text-white">
              <h2 className="mb-4 text-4xl font-bold leading-tight">{slide.title}</h2>
              <p className="mb-6 text-sm text-gray-200">{slide.description}</p>
              <div className="mb-6 flex items-center gap-3">
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href={`/categories/{slide.categoryId}`}> View {slide.category.name}
                   <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Slider dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {banners.map((_:any, index:any) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
