import type React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SecNavigation() {
  return (
    <nav className="w-full px-4 md:px-12 lg:px-24 border-b border-gray-200 bg-white">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-1">
          <NavItem href="/" label="Home" />
          <NavItem href="/shop" label="Shop"/>
          <NavItem href="/farmer-onboarding" label="Sell produce" />
          <NavItem href="#categories" label="categories" />
          <NavItem href="#deals" label="Latest deals"/>
          <NavItem href="/blog" label="Blog" />
          <NavItem
            href="/featured-products"
            label="Featured"
            hasDropdown
            icon={
              <svg className="mr-1 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        <div>
          <Button variant="ghost" size="sm" className="flex items-center text-green-600">
            <svg className="mr-1 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Help Center
          </Button>
        </div>
      </div>
    </nav>
  )
}

function NavItem({
  href,
  label,
  hasDropdown,
  icon,
}: {
  href: string
  label: string
  hasDropdown?: boolean
  icon?: React.ReactNode
}) {
  return (
    <Link href={href} className="flex h-full items-center px-3 py-2 text-sm hover:text-green-600">
      {icon}
      {label}
      {hasDropdown && <ChevronDown className="ml-1 h-3 w-3" />}
    </Link>
  )
}
