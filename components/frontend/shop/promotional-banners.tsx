import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PromotionalBanners({banners}:{banners:any}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Organic Seeds Banner */}
      {
        banners.slice(0,3).map((item:any,i:any)=>{
          return(
            <div key={i} className="group relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div
          className="h-64 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${item.imageUrl})`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="mb-3 w-fit rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
            On Sale This Week
          </div>
          <h3 className="mb-4 text-2xl font-bold text-white">{item.title}</h3>
          <Link
            href={`/category/${item.category.id}`}
            className="flex w-fit items-center text-sm font-medium text-white hover:underline"
          >
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
          )
        })
      }
    </div>
  )
}
