import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

interface CategoryItem {
  icon: React.ReactNode
  label: string
  href: string
  hasSubmenu?: boolean
}

export default function AgriCategorySidebar({makes}:{makes:any}) {

  return (
    <div className="w-full max-w-[260px]  rounded-md border border-gray-200 bg-white">
      <div className="rounded-t-md bg-red-600 p-3">
        <button className="flex w-full items-center justify-between text-white">
          <span className="font-medium">Available Make</span>
          <ChevronRight className="h-4 w-4 rotate-90 transform" />
        </button>
      </div>
      <div className="divide-y divide-gray-100 h-[350px] overflow-y-scroll">
        {makes.map((item:any, index:any) => (
          <Link
            key={item.id}
            href={`/shop/${item.id}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
             <Image
        src={item.imageUrl} // Replace with your actual image path
        alt={item.name}
        width={40}
        height={6}
        className="rounded-xl object-cover"
        priority
      />
            {item.name} <span className="text-blue-600">{item.products.length}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
