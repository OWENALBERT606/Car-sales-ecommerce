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
                  <div className="absolute h-8 w-8 rounded-full bg-red-600"></div>
                  <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-black"></div>
                </div>
                <span className="text-xl font-bold">Nagotal Motors</span>
              </div>

              <p className="mb-4 text-sm text-gray-600">
                Your trusted partner for high-quality new and pre-owned cars. Explore our wide selection and drive away with confidence.
              </p>

              <Link href="mailto:info@nagotalmotors.com" className="text-sm font-medium text-red-600 hover:underline">
                info@nagotalmotors.com
              </Link>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="mb-6 text-lg font-medium text-gray-900">Need Help?</h3>

              <div className="mb-4 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-red-600" />
                <span className="text-lg font-medium">+256 701 234 567</span>
              </div>

              <div className="mb-4 text-sm text-gray-600">
                <p>Monday – Friday: 8:00–18:00</p>
                <p>Saturday: 9:00 – 14:00</p>
              </div>

              <Link href="mailto:support@nagotalmotors.com" className="text-sm font-medium text-red-600 hover:underline">
                support@nagotalmotors.com
              </Link>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="mb-6 text-lg font-medium text-gray-900">Customer Service</h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/help-center" className="text-gray-600 hover:text-red-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/my-account" className="text-gray-600 hover:text-red-600">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/track-orders" className="text-gray-600 hover:text-red-600">
                    Track Orders
                  </Link>
                </li>
                <li>
                  <Link href="/test-drive" className="text-gray-600 hover:text-red-600">
                    Book a Test Drive
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="text-gray-600 hover:text-red-600">
                    Compare Cars
                  </Link>
                </li>
                <li>
                  <Link href="/financing" className="text-gray-600 hover:text-red-600">
                    Financing Options
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="mb-6 text-lg font-medium text-gray-900">Company</h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-red-600">
                    About Nagotal Motors
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="text-gray-600 hover:text-red-600">
                    Browse Inventory
                  </Link>
                </li>
                <li>
                  <Link href="/latest-arrivals" className="text-gray-600 hover:text-red-600">
                    Latest Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="text-gray-600 hover:text-red-600">
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link href="/sell-your-car" className="text-gray-600 hover:text-red-600">
                    Sell Your Car
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-red-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-red-600">
                    Contact Us
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
              Up to $1000 off selected models{" "}
              <Link href="/offers" className="ml-1 font-bold text-red-600 hover:underline">
                View Offers
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-center p-4 text-center">
            <p className="text-sm font-medium">Free delivery within Kampala & Wakiso districts</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Links */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <Link href="/privacy-policy" className="hover:text-red-600">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-red-600">
                Terms & Conditions
              </Link>
              <Link href="/refund-policy" className="hover:text-red-600">
                Return & Refund Policy
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500">© 2025 Nagotal Motors. All rights reserved.</div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <Image src="/payments/visa.svg" alt="Visa" width={40} height={30} />
              <Image src="/payments/mastercard.svg" alt="Mastercard" width={40} height={30} />
              <Image src="/payments/mobile-money.svg" alt="Mobile Money" width={40} height={30} />
              <Image src="/payments/bank-transfer.svg" alt="Bank Transfer" width={40} height={30} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
