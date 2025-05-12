"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function LocationSlider({locations}:{locations:any}) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Calculate number of slides (6 locations per slide)
  const locationsPerSlide = 6
  const totalSlides = Math.ceil(locations.length / locationsPerSlide)

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      sliderRef.current?.scrollTo({
        left: (currentSlide - 1) * sliderRef.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  const handleNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
      sliderRef.current?.scrollTo({
        left: (currentSlide + 1) * sliderRef.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shop by Location</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevSlide} disabled={currentSlide === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextSlide} disabled={currentSlide === totalSlides - 1}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-w-full snap-start"
            >
              {locations.slice(slideIndex * locationsPerSlide, (slideIndex + 1) * locationsPerSlide).map((location:any) => (
                <Link href={`/location/${location.id}`} key={location.id}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="p-3">
                      <CardTitle className="text-base">{location.name}</CardTitle>
                      <CardDescription className="flex items-center text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-xs text-muted-foreground">{location.farms.length} farms</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === index ? "w-6 bg-primary" : "w-1.5 bg-muted"
            }`}
            onClick={() => {
              setCurrentSlide(index)
              sliderRef.current?.scrollTo({
                left: index * sliderRef.current.clientWidth,
                behavior: "smooth",
              })
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
