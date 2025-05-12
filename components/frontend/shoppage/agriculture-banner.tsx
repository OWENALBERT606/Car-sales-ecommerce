import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AgricultureBanner({banners}:{banners:any}) {
  return (
    <>
    {
      banners.slice(2,3).map((item:any)=>{
        return(
          <div className="relative overflow-hidden rounded-lg bg-green-900 text-white">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.imageUrl}
          alt="Agricultural field background"
          className="object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800/90 to-green-900/80"
          style={{
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="inline-block rounded bg-green-600 px-3 py-1 text-sm font-medium">Seasonal Special</div>

        <div className="mt-4 max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {item.title}
          </h2>

          <p className="mt-2 text-green-100 md:mt-4">
            {item.description}
          </p>
        </div>
      </div>
    </div>
        )
      })
    }
    </>
  )
}