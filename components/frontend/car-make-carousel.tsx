

// "use client"

// import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import { Card, CardContent } from "@/components/ui/card"

// // Car make data matching the model schema
// // const carMakes = [
// //   {
// //     id: "clq1a2b3c4d5e6f7g8h9i0",
// //     name: "Toyota",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "toyota",
// //     createdAt: new Date("2023-01-01").toISOString(),
// //     updatedAt: new Date("2023-01-01").toISOString(),
// //   },
// //   {
// //     id: "clq2b3c4d5e6f7g8h9i0j1",
// //     name: "Honda",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "honda",
// //     createdAt: new Date("2023-01-02").toISOString(),
// //     updatedAt: new Date("2023-01-02").toISOString(),
// //   },
// //   {
// //     id: "clq3c4d5e6f7g8h9i0j1k2",
// //     name: "Ford",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "ford",
// //     createdAt: new Date("2023-01-03").toISOString(),
// //     updatedAt: new Date("2023-01-03").toISOString(),
// //   },
// //   {
// //     id: "clq4d5e6f7g8h9i0j1k2l3",
// //     name: "BMW",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "bmw",
// //     createdAt: new Date("2023-01-04").toISOString(),
// //     updatedAt: new Date("2023-01-04").toISOString(),
// //   },
// //   {
// //     id: "clq5e6f7g8h9i0j1k2l3m4",
// //     name: "Mercedes-Benz",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "mercedes-benz",
// //     createdAt: new Date("2023-01-05").toISOString(),
// //     updatedAt: new Date("2023-01-05").toISOString(),
// //   },
// //   {
// //     id: "clq6f7g8h9i0j1k2l3m4n5",
// //     name: "Audi",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "audi",
// //     createdAt: new Date("2023-01-06").toISOString(),
// //     updatedAt: new Date("2023-01-06").toISOString(),
// //   },
// //   {
// //     id: "clq7g8h9i0j1k2l3m4n5o6",
// //     name: "Lexus",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "lexus",
// //     createdAt: new Date("2023-01-07").toISOString(),
// //     updatedAt: new Date("2023-01-07").toISOString(),
// //   },
// //   {
// //     id: "clq8h9i0j1k2l3m4n5o6p7",
// //     name: "Tesla",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "tesla",
// //     createdAt: new Date("2023-01-08").toISOString(),
// //     updatedAt: new Date("2023-01-08").toISOString(),
// //   },
// //   {
// //     id: "clq9i0j1k2l3m4n5o6p7q8",
// //     name: "Chevrolet",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "chevrolet",
// //     createdAt: new Date("2023-01-09").toISOString(),
// //     updatedAt: new Date("2023-01-09").toISOString(),
// //   },
// //   {
// //     id: "clq0j1k2l3m4n5o6p7q8r9",
// //     name: "Nissan",
// //     imageUrl: "/placeholder.svg?height=200&width=200",
// //     slug: "nissan",
// //     createdAt: new Date("2023-01-10").toISOString(),
// //     updatedAt: new Date("2023-01-10").toISOString(),
// //   },
// // ]

// // Type definition matching the model schema
// type Make = {
//   id: string
//   name: string
//   imageUrl: string
//   slug: string
//   createdAt: string
//   updatedAt: string
// }

// export function CarMakeCarousel({carMakes}:{carMakes:any[]}) {
//   const [api, setApi] = React.useState<any>()
//   const [current, setCurrent] = React.useState(0)
//   const [count, setCount] = React.useState(0)

//   React.useEffect(() => {
//     if (!api) {
//       return
//     }

//     setCount(api.scrollSnapList().length)
//     setCurrent(api.selectedScrollSnap() + 1)

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1)
//     })
//   }, [api])

//   return (
//     <section className="py-12 px-4 md:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-red-600">Shop by Make</h2>
//           <div className="hidden md:flex items-center gap-2">
//             <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => api?.scrollPrev()}>
//               <ChevronLeft className="h-4 w-4" />
//               <span className="sr-only">Previous slide</span>
//             </Button>
//             <span className="text-sm text-muted-foreground">
//               {current} / {count}
//             </span>
//             <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => api?.scrollNext()}>
//               <ChevronRight className="h-4 w-4" />
//               <span className="sr-only">Next slide</span>
//             </Button>
//           </div>
//         </div>

//         <Carousel
//           setApi={setApi}
//           className="w-full"
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//         >
//           <CarouselContent className="-ml-2 md:-ml-4">
//             {carMakes.map((make: Make) => (
//               <CarouselItem key={make.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/7">
//                 <Link href={`/makes/${make.slug}`}>
//                   <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-200 bg-transparent">
//                     <CardContent className="p-0 relative">
//                       <div className="relative w-full aspect-square group">
//                         <div className="absolute inset-0 rounded-full overflow-hidden">
//                           <Image
//                             src={make.imageUrl || "/placeholder.svg"}
//                             alt={`${make.name} logo`}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                         <div className="absolute inset-0 bg-blue-700/70 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <h3 className="font-medium text-white p-3 w-full text-center">{make.name}</h3>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <div className="md:hidden mt-4 flex justify-center">
//             <CarouselPrevious className="relative inset-0 translate-x-0 mr-2" />
//             <CarouselNext className="relative inset-0 translate-x-0" />
//           </div>
//         </Carousel>
//       </div>
//     </section>
//   )
// }


"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

// Type definition matching the model schema
type Make = {
  id: string
  name: string
  imageUrl: string
  slug: string
  createdAt: string
  updatedAt: string
}

export function CarMakeCarousel({carMakes}:{carMakes:any[]}) {
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Calculate the number of slides based on 10 items per slide
  const totalSlides = Math.ceil(carMakes.length / 10)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(totalSlides)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, totalSlides])

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600">Shop by Make</h2>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => api?.scrollPrev()}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <span className="text-sm text-muted-foreground">
              {current} / {count}
            </span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => api?.scrollNext()}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent>
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <CarouselItem key={slideIndex} className="basis-full">
                <div className="flex flex-row items-center space-x-4 overflow-x-auto pb-2">
                  {carMakes.slice(slideIndex * 10, (slideIndex + 1) * 10).map((make: Make) => (
                    <Link key={make.id} href={`/makes/${make.slug}`} className="flex-shrink-0">
                      <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-200 bg-transparent w-16">
                        <CardContent className="p-0 relative">
                          <div className="relative w-16 h-16 group">
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <Image
                                src={make.imageUrl || "/placeholder.svg"}
                                alt={`${make.name} logo`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-blue-700/70 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="font-medium text-white text-xs p-1 w-full text-center truncate">{make.name}</h3>
                            </div>
                          </div>
                          <p className="text-xs text-center mt-1 truncate w-16">{make.name}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="md:hidden mt-4 flex justify-center">
            <CarouselPrevious className="relative inset-0 translate-x-0 mr-2" />
            <CarouselNext className="relative inset-0 translate-x-0" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}