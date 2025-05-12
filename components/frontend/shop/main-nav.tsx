"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ChevronDown, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Session } from "next-auth"
import Logo from "@/components/global/Logo"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function MainNav({ session }: { session: Session | null }) {
  const router=useRouter();
   async function handleLogout() {
      try {
        await signOut();
        router.refresh;
      } catch (error) {
        console.log(error);
      }
    }
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="w-full px-4 md:px-12 lg:px-24 border-b border-gray-200 bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left section: Menu, Logo, Home icon */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
           <Logo/>
          </Link>
        </div>

        {/* Center section: Search */}
        <div className="hidden flex-1 px-6 md:block md:px-12 lg:px-24">
          <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Search for products..."
              className="w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        {/* Right section: Account, Wishlist, Cart */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 px-2">
              <>
      {session ? (
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-medium">My Account</span>
          <span className="flex items-center text-xs text-gray-600">
            Hello, {session.user.lastName}
            <ChevronDown className="ml-1 h-3 w-3" />
          </span>
        </div>
      ) : (
        <Link href="/login" className="text-sm font-medium">
          Login
        </Link>
      )}
    </>
              </Button>
            </DropdownMenuTrigger>
            <div className=""></div>
            {session?(<DropdownMenuContent align="end" className="bg-white flex flex-col justify-center items-center border-none">
              <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/orders" className="w-full">
                  Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={handleLogout} className="w-full">
                  Log out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>):(<></>)}
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative">
           <Link href="/wishlist"> <Heart className="h-6 w-6" /></Link>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              0
            </span>
            <span className="sr-only">Wishlist</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Link href="/cart"><ShoppingCart className="h-6 w-6" /></Link>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              0
            </span>
            <span className="sr-only">Cart</span>
          </Button>

          <div className="flex flex-col items-end text-right">
            <span className="text-xs text-gray-600">0 items</span>
            <span className="text-sm font-bold">$0.00</span>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-gray-200 p-2 md:hidden">
        <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
    </header>
  )
}
