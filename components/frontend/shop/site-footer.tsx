import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-white">
      {/* Main Footer */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div>
              <div className="mb-6 flex items-center">
                <div className="relative h-8 w-8 mr-2">
                  <div className="absolute h-8 w-8 rounded-full bg-red-500"></div>
                  <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-black"></div>
                </div>
                <span className="text-xl font-bold">FarmConnect</span>
              </div>

              <p className="mb-4 text-sm text-gray-600">
                Connecting farmers directly to consumers. Fresh produce, fair prices, and sustainable practices for a
                better agricultural ecosystem.
              </p>

              <Link href="mailto:info@farmconnect.com" className="text-sm font-medium text-red-500 hover:underline">
                info@farmconnect.com
              </Link>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="mb-6 text-lg font-medium text-gray-900">Need Help?</h3>

              <div className="mb-4 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-green-600" />
                <span className="text-lg font-medium">(+800) 1234 5678 90</span>
              </div>

              <div className="mb-4 text-sm text-gray-600">
                <p>Monday – Friday: 9:00–20:00</p>
                <p>Saturday: 11:00 – 15:00</p>
              </div>

              <Link href="mailto:support@farmconnect.com" className="text-sm font-medium text-red-500 hover:underline">
                support@farmconnect.com
              </Link>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="mb-6 text-lg font-medium text-gray-900">Customer Service</h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/help-center" className="text-gray-600 hover:text-green-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="text-gray-600 hover:text-green-600">
                    My account
                  </Link>
                </li>
                <li>
                  <Link href="/track-orders" className="text-gray-600 hover:text-green-600">
                    Track Orders
                  </Link>
                </li>
                <li>
                  <Link href="/my-orders" className="text-gray-600 hover:text-green-600">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist" className="text-gray-600 hover:text-green-600">
                    Your Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="text-gray-600 hover:text-green-600">
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link href="/gift-cards" className="text-gray-600 hover:text-green-600">
                    Buy Gift Cards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Store Information */}
            <div>
              <h3 className="mb-6 text-lg font-medium text-gray-900">Farm Information</h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-green-600">
                    About FarmConnect
                  </Link>
                </li>
                <li>
                  <Link href="/bestsellers" className="text-gray-600 hover:text-green-600">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="/latest-products" className="text-gray-600 hover:text-green-600">
                    Latest Harvests
                  </Link>
                </li>
                <li>
                  <Link href="/seasonal-discounts" className="text-gray-600 hover:text-green-600">
                    Seasonal Discounts
                  </Link>
                </li>
                <li>
                  <Link href="/sale-products" className="text-gray-600 hover:text-green-600">
                    Sale Products
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate-program" className="text-gray-600 hover:text-green-600">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link href="/sell-on-farmconnect" className="text-gray-600 hover:text-green-600">
                    Sell on FarmConnect
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banners */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="flex items-center justify-center p-4 text-center">
            <p className="text-sm font-medium">
              -5% for all orders this week{" "}
              <Link href="/shop" className="ml-1 font-bold text-green-600 hover:underline">
                Shop now
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-center p-4 text-center">
            <p className="text-sm font-medium">Free delivery for all orders over $200</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Links */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <Link href="/privacy-policy" className="hover:text-green-600">
                Privacy Policy
              </Link>
              <Link href="/order-tracking" className="hover:text-green-600">
                Order Tracking
              </Link>
              <Link href="/terms-conditions" className="hover:text-green-600">
                Terms and Conditions
              </Link>
              <Link href="/refund-policy" className="hover:text-green-600">
                Refund and Returns Policy
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500">Copyright 2025 © FarmConnect. All rights reserved.</div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <Image src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="Mastercard" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="PayPal" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="Skrill" width={40} height={30} />
              <Image src="/placeholder.svg?height=30&width=40" alt="Bank Transfer" width={40} height={30} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
