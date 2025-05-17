"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <section className="w-full border-t border-gray-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          {/* Icon and Text */}
          <div className="max-w-md">
            <div className="mb-4 flex items-center">
              <div className="mr-4 text-gray-400">
                <Mail className="h-12 w-12" />
              </div>
              <p className="text-sm font-medium text-red-600">Join our newsletter for $10 off your first order</p>
            </div>

            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Get our emails for info on seasonal harvests, sales and much more.
            </h3>

            <p className="text-sm text-gray-600">
              Register now to get latest updates on farm-fresh produce, promotions & coupons. Don&apos;t worry, we
              don&apos;t spam!
            </p>
          </div>

          {/* Subscription Form */}
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-red-500 hover:bg-red-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>

              {isSuccess && (
                <p className="text-sm text-red-600">
                  Thank you for subscribing! Your discount code will be sent to your email.
                </p>
              )}

              <p className="text-xs text-gray-500">
                By subscribing you agree to our{" "}
                <Link href="/terms" className="text-red-600 hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-red-600 hover:underline">
                  Privacy & Cookies Policy.
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
