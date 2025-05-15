import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface CategoryItem {
  icon: React.ReactNode
  label: string
  href: string
  hasSubmenu?: boolean
}

export default function AgriCategorySidebar({farms}:{farms:any}) {
  const categories: CategoryItem[] = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      label: "Seeds & Seedlings",
      href: "/category/seeds-seedlings",
      hasSubmenu: true,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: "Fertilizers",
      href: "/category/fertilizers",
      hasSubmenu: true,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      label: "Irrigation Equipment",
      href: "/category/irrigation-equipment",
      hasSubmenu: true,
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 20L10 4L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: "Farm Tools",
      href: "/category/farm-tools",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: "Crop Protection",
      href: "/category/crop-protection",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20V18H4V6Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: "Agri Machinery",
      href: "/category/agri-machinery",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8V12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: "Storage & Packaging",
      href: "/category/storage-packaging",
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 8H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      label: "Farmer Education",
      href: "/category/farmer-education",
    },
  ]

  const specialCategories = [
    {
      label: "Seasonal Offers",
      href: "/seasonal-offers",
    },
    {
      label: "Farmer's Choice Picks",
      href: "/farmers-choice",
    },
    {
      label: "New Crop Varieties",
      href: "/new-crops",
      isNew: true,
    },
  ]

  return (
    <div className="w-full max-w-[260px] rounded-md border border-gray-200 bg-white">
      <div className="rounded-t-md bg-blue-600 p-3">
        <button className="flex w-full items-center justify-between text-white">
          <span className="font-medium">Active Farms</span>
          <ChevronRight className="h-4 w-4 rotate-90 transform" />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {farms.map((farm:any, index:any) => (
          <Link
            key={farm.id}
            href={`/farms/${farm.id}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
            {farm.name} <span className="text-green-600">{farm.products.length}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
