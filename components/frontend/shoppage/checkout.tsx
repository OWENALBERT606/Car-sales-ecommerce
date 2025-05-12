"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  // State for shipping option
  const [shippingOption, setShippingOption] = useState("free")

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer")

  // State for different shipping address
  const [differentShippingAddress, setDifferentShippingAddress] = useState(false)

  // State for terms agreement
  const [termsAgreed, setTermsAgreed] = useState(false)

  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: "Organic Raw Wildflower Honey",
      price: 24.99,
      quantity: 1,
      image: "/placeholder.svg?height=50&width=50&text=Honey",
    },
    {
      id: 2,
      name: "Fresh Organic Vegetables Bundle",
      price: 35.5,
      quantity: 1,
      image: "/placeholder.svg?height=50&width=50&text=Vegetables",
    },
    {
      id: 3,
      name: "Heirloom Tomato Seeds Pack",
      price: 12.75,
      quantity: 1,
      image: "/placeholder.svg?height=50&width=50&text=Seeds",
    },
    {
      id: 4,
      name: "Organic Fertilizer - 5lb Bag",
      price: 19.95,
      quantity: 1,
      image: "/placeholder.svg?height=50&width=50&text=Fertilizer",
    },
    {
      id: 5,
      name: "Handcrafted Wooden Planter Box",
      price: 45.0,
      quantity: 1,
      image: "/placeholder.svg?height=50&width=50&text=Planter",
    },
  ]

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate total
  const total = subtotal

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle payment processing here
    console.log("Order submitted")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">
        <p>Your order qualifies for free shipping!</p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-green-200">
          <div className="h-full w-full bg-green-600"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-[1fr_400px]">
          {/* Billing Details */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-gray-900">BILLING DETAILS</h2>

            <div className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="font-medium">
                    First name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="first-name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name" className="font-medium">
                    Last name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="last-name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-name" className="font-medium">
                  Farm/Company name (optional)
                </Label>
                <Input id="company-name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="font-medium">
                  Country / Region <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="us">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States (US)</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="mx">Mexico</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street-address" className="font-medium">
                  Street address <span className="text-red-500">*</span>
                </Label>
                <Input id="street-address" placeholder="House number and street name" required />
                <Input id="street-address-2" placeholder="Apartment, suite, unit, etc. (optional)" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="font-medium">
                  Town / City <span className="text-red-500">*</span>
                </Label>
                <Input id="city" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="font-medium">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="ca">
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="il">Illinois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip" className="font-medium">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input id="zip" required />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input id="phone" type="tel" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" type="email" required />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="create-account" />
                <Label htmlFor="create-account" className="text-sm font-normal">
                  Create an account?
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="different-address"
                  checked={differentShippingAddress}
                  onCheckedChange={(checked) => setDifferentShippingAddress(checked as boolean)}
                />
                <Label htmlFor="different-address" className="text-sm font-normal">
                  SHIP TO A DIFFERENT ADDRESS?
                </Label>
              </div>

              {differentShippingAddress && (
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 font-medium">Shipping Address</h3>
                  {/* Shipping address fields would go here */}
                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input placeholder="First name *" />
                      <Input placeholder="Last name *" />
                    </div>
                    <Input placeholder="Street address *" />
                    <Input placeholder="Town / City *" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Select defaultValue="ca">
                        <SelectTrigger>
                          <SelectValue placeholder="State *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="ZIP Code *" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="order-notes" className="font-medium">
                  Order notes (optional)
                </Label>
                <Textarea
                  id="order-notes"
                  placeholder="Notes about your order, e.g. special notes for delivery or harvest preferences."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-6 text-xl font-bold text-gray-900">YOUR ORDER</h2>

              <div className="mb-4 flex justify-between border-b pb-2 text-sm font-medium">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 overflow-hidden rounded border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>
                        {item.name} <span className="text-gray-500">× {item.quantity}</span>
                      </span>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="my-4 flex justify-between border-b pb-4 pt-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 font-medium">Shipping</h3>
                <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="free-shipping" />
                      <Label htmlFor="free-shipping" className="font-normal">
                        Free shipping
                      </Label>
                    </div>
                    <span className="text-sm">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="local" id="local-pickup" />
                      <Label htmlFor="local-pickup" className="font-normal">
                        Local pickup
                      </Label>
                    </div>
                    <span className="text-sm">$0.00</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-6 flex justify-between border-b pb-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-green-700">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer" className="font-medium">
                        Direct bank transfer
                      </Label>
                    </div>
                    {paymentMethod === "bank-transfer" && (
                      <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
                        Make your payment directly into our bank account. Please use your Order ID as the payment
                        reference. Your order will not be shipped until the funds have cleared in our account.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="check" id="check" />
                      <Label htmlFor="check" className="font-medium">
                        Check payments
                      </Label>
                    </div>
                    {paymentMethod === "check" && (
                      <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
                        Please send a check to: Farm Fresh Market, 123 Harvest Lane, Farmington, CA 90210
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="font-medium">
                        Cash on delivery
                      </Label>
                    </div>
                    {paymentMethod === "cash" && (
                      <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
                        Pay with cash upon delivery. Available for local deliveries only.
                      </p>
                    )}
                  </div>
                </RadioGroup>

                <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
                  <p>
                    Your personal data will be used to process your order, support your experience throughout this
                    website, and for other purposes described in our{" "}
                    <Link href="/privacy-policy" className="text-green-600 hover:underline">
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAgreed}
                    onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I have read and agree to the website{" "}
                    <Link href="/terms" className="text-green-600 hover:underline">
                      terms and conditions
                    </Link>
                    <span className="text-red-500"> *</span>
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={!termsAgreed}>
                  Place order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
