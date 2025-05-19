import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TopNavigationBar() {
  return (
    <div className="w-full px-4 md:px-12 lg:px-24 border-b border-gray-200 bg-white">
      <div className="h-1 w-full bg-red-600"></div>
      <div className="container flex h-10 items-center justify-between px-4 text-sm">
        {/* Left side navigation links */}
        <div className="hidden space-x-6 md:flex">
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About Us
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-gray-900">
            My Dashboard
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-gray-900">
            My Orders
          </Link>
          <Link href="/wishlist" className="text-gray-700 hover:text-gray-900">
            Wishlist
          </Link>
          <Link href="/sell" className="text-red-700 font-medium hover:text-red-900">
            Sell with us
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="px-2 py-1">
            <span className="text-xs">Menu</span>
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>

        {/* Contact and dropdowns */}
        <div className="flex  items-center space-x-2 text-xs md:text-sm">
          <span className="hidden md:inline">Need help?</span>
          <a
            href="tel:+256701234567"
            className="font-medium text-gray-700 hover:text-gray-900"
          >
            (+256) 709 704 128
          </a>
          <span className="hidden md:inline">or</span>
          <a
            href="mailto:support@nagotamotors.com"
            className="font-medium text-gray-700 hover:text-gray-900"
          >
            support@nagotamotors.com
          </a>
        </div>
      </div>
    </div>
  )
}
