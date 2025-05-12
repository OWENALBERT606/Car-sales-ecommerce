import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function PromotionalBannersWithImages() {
  const promotions = [
    {
      id: 1,
      title: "Premium Organic Seeds for Your Next Harvest",
      badge: "On Sale This Week",
      link: "/category/seeds",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Fresh Seasonal Produce Direct From Local Farms",
      badge: "On Sale This Week",
      link: "/category/seasonal",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Boost Your Farm's Productivity With Quality Tools",
      badge: "On Sale This Week",
      link: "/category/equipment",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {promotions.map((promo) => (
        <div key={promo.id} className="group relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 transition-opacity duration-300 group-hover:opacity-90" />
          <Image
            src={promo.image || "/placeholder.svg"}
            alt={promo.title}
            width={600}
            height={400}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="mb-3 w-fit rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
              {promo.badge}
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">{promo.title}</h3>
            <Link href={promo.link} className="flex w-fit items-center text-sm font-medium text-white hover:underline">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
