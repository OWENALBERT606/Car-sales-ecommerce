"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function ShoppingCart() {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Raw Wildflower Honey",
      price: 24.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Honey",
    },
    {
      id: 2,
      name: "Fresh Organic Vegetables Bundle",
      price: 35.5,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Vegetables",
    },
    {
      id: 3,
      name: "Heirloom Tomato Seeds Pack",
      price: 12.75,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Seeds",
    },
    {
      id: 4,
      name: "Organic Fertilizer - 5lb Bag",
      price: 19.95,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Fertilizer",
    },
    {
      id: 5,
      name: "Handcrafted Wooden Planter Box",
      price: 45.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=Planter",
    },
  ])

  // Shipping option state
  const [shippingOption, setShippingOption] = useState("free")

  // Function to update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Function to remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Function to remove all items
  const removeAll = () => {
    setCartItems([])
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate total
  const total = subtotal

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-green-800">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">
              <p>Your order qualifies for free shipping!</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-green-200">
                <div className="h-full w-full bg-green-600"></div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b text-left">
                  <tr>
                    <th className="pb-4 font-medium">Product</th>
                    <th className="pb-4 font-medium">Price</th>
                    <th className="pb-4 font-medium">Quantity</th>
                    <th className="pb-4 font-medium">Subtotal</th>
                    <th className="pb-4 font-medium sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="h-20 w-20 overflow-hidden rounded border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">Organic Certified</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">${item.price.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex w-32 items-center rounded-md border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center border-r"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex-1 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center border-l"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-600 hover:underline md:hidden"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
                <Input placeholder="Coupon code" className="h-10" />
                <Button variant="outline" className="h-10 whitespace-nowrap">
                  Apply coupon
                </Button>
              </div>
              <Button variant="outline" className="w-full sm:w-auto" onClick={removeAll}>
                Remove All
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">CART TOTALS</h2>

            <div className="mb-4 flex justify-between border-b pb-4">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 font-medium">Shipping</h3>
              <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free-shipping" />
                    <Label htmlFor="free-shipping">Free shipping</Label>
                  </div>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="local-pickup" />
                    <Label htmlFor="local-pickup">Local pickup</Label>
                  </div>
                  <span>$0.00</span>
                </div>
              </RadioGroup>

              <div className="mt-4 text-sm">
                Shipping to <span className="font-medium">CA</span>.{" "}
                <button className="text-green-600 hover:underline">Change address</button>
              </div>
            </div>

            <div className="mb-6 flex justify-between border-b pb-4 text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">Proceed to checkout</Button>

            <div className="mt-6 space-y-4 rounded-lg bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1 text-green-600">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">Secure Checkout</h4>
                  <p className="text-sm text-gray-600">Your payment information is secure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Satisfaction Guaranteed</h4>
                  <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="16" height="16" x="4" y="4" rx="2" />
                    <path d="m9 9 6 6" />
                    <path d="m15 9-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On all orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-6 text-gray-500">Looks like you haven't added any agricultural products to your cart yet.</p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      )}

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-bold">You might also like</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Suggested Product 1 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Badge className="absolute left-2 top-2 bg-green-600">15% OFF</Badge>
              <Image
                src="/placeholder.svg?height=150&width=150&text=Organic+Apples"
                alt="Organic Apples"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">Organic Red Apples</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 line-through">$3.99</span>
                <span className="ml-1 font-medium text-green-700">$3.39</span>
              </div>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Product 2 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Badge className="absolute left-2 top-2 bg-amber-600">NEW</Badge>
              <Image
                src="/placeholder.svg?height=150&width=150&text=Bee+Pollen"
                alt="Bee Pollen"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">Organic Bee Pollen</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="font-medium text-green-700">$17.99</span>
              </div>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Product 3 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=150&width=150&text=Garden+Tools"
                alt="Garden Tools Set"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">Garden Tools Set</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="font-medium text-green-700">$29.95</span>
              </div>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Suggested Product 4 */}
          <div className="rounded-lg border p-4">
            <div className="relative">
              <Badge className="absolute left-2 top-2 bg-red-600">BEST SELLER</Badge>
              <Image
                src="/placeholder.svg?height=150&width=150&text=Compost+Bin"
                alt="Compost Bin"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">Compost Bin - 5 Gallon</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 line-through">$45.99</span>
                <span className="ml-1 font-medium text-green-700">$39.99</span>
              </div>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
