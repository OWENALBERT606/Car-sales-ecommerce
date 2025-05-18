"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, CreditCard, MapPin, Package, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for order items - in a real app, this would come from your cart state
const orderItems = [
  {
    id: "1",
    name: "Vintage T-Shirt",
    price: 29.99,
    quantity: 2,
  },
  {
    id: "2",
    name: "Designer Jeans",
    price: 89.99,
    quantity: 1,
  },
]

// Calculate order total
const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = 5.99
const total = subtotal + shipping

export default function CheckoutForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("CASH")
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    // In a real app, you would submit this data to your API
    const orderData = {
      shippingAddress: formData.get("address"),
      shippingPhone: formData.get("phone"),
      deliveryMethod: deliveryMethod,
      paymentMethod: paymentMethod,
      scheduledAt: scheduledDate,
      total: total,
      items: orderItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    }

    console.log("Order data:", orderData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to confirmation page
    router.push("/checkout/confirmation")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-8 md:grid-cols-2 py-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your full address"
                  required
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={setDeliveryMethod}
                className="space-y-3"
                data-selected-color="red"
              >
                <div
                  className={`flex items-center space-x-2 rounded-md border p-4 ${deliveryMethod === "standard" ? "border-red-500" : ""}`}
                >
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm text-muted-foreground">Delivery in 3-5 business days</p>
                    </div>
                    <div className="font-medium">$5.99</div>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md border p-4 ${deliveryMethod === "express" ? "border-red-500" : ""}`}
                >
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="font-medium">Express Delivery</p>
                      <p className="text-sm text-muted-foreground">Delivery in 1-2 business days</p>
                    </div>
                    <div className="font-medium">$12.99</div>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md border p-4 ${deliveryMethod === "scheduled" ? "border-red-500" : ""}`}
                >
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="font-medium">Scheduled Delivery</p>
                      <p className="text-sm text-muted-foreground">Choose your delivery date</p>

                      {deliveryMethod === "scheduled" && (
                        <div className="mt-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal border-red-200 focus:ring-red-500",
                                  !scheduledDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {scheduledDate ? format(scheduledDate, "PPP") : "Select a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={scheduledDate}
                                onSelect={setScheduledDate}
                                initialFocus
                                disabled={(date) => {
                                  // Disable dates in the past and today
                                  const today = new Date()
                                  today.setHours(0, 0, 0, 0)
                                  return date < new Date(today.setDate(today.getDate() + 1))
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </div>
                    <div className="font-medium">$9.99</div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
                data-selected-color="red"
              >
                <div
                  className={`flex items-center space-x-2 rounded-md border p-4 ${paymentMethod === "CASH" ? "border-red-500" : ""}`}
                >
                  <RadioGroupItem value="CASH" id="cash" />
                  <Label htmlFor="cash" className="font-medium">
                    Cash on Delivery
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md border p-4 ${paymentMethod === "CREDIT_CARD" ? "border-red-500" : ""}`}
                >
                  <RadioGroupItem value="CREDIT_CARD" id="credit-card" />
                  <Label htmlFor="credit-card" className="font-medium">
                    Credit Card
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-2 rounded-md border p-4 ${paymentMethod === "PAYPAL" ? "border-red-500" : ""}`}
                >
                  <RadioGroupItem value="PAYPAL" id="paypal" />
                  <Label htmlFor="paypal" className="font-medium">
                    PayPal
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
              <CardDescription>
                {orderItems.length} {orderItems.length === 1 ? "item" : "items"} in your order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  )
}
