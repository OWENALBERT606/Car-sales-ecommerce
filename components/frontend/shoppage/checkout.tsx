"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addItem, clearCart } from "@/redux/slices/cartSlice"
import { createOrder } from "@/actions/orders"
import { OrderStatus } from "@/types/types"
import { createBulkOrderItems } from "@/actions/orderItem"
import toast from "react-hot-toast"

// Mock data for order items - in a real app, this would come from your cart state


export default function CheckoutForm({session}:{session:any}) {
   const dispatch: AppDispatch = useDispatch();
   console.log(session);
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("CASH")
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
    const cartItems = useSelector((state: any) => state.cart.items);

  
    // Fetch items from local storage when the component mounts
    useEffect(() => {
      const storedItems = localStorage.getItem("cart");
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          if (Array.isArray(parsedItems)) {
            const items = parsedItems.map((item: any) => ({
              ...item,
              qty: item.qty ?? 1 // Ensure qty defaults to 1
            }));
            // Dispatch addItem for each item to sync local storage with Redux
            items.forEach((item: any) => {
              dispatch(addItem(item));
            });
          }
        } catch (error) {
          console.error("Error parsing cart items from localStorage:", error);
        }
      }
    }, [dispatch]);
  
    // Update local storage whenever cart items change
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);
  
const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart"); // Clear local storage as well
  };

  
const orderItems=cartItems;
    console.log(orderItems);
      // Calculate subtotal
    const subtotal = cartItems.reduce((total: number, item: any) => {
      return total + (item.salePrice || item.price) * item.qty;
    }, 0);
  

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

  
     // In a real app, you would submit this data to your API
    const orderData = {
  userId: session?.user?.id,
  shippingAddress: (formData.get("address") as string) || "",
  shippingPhone: (formData.get("phone") as string) || "",
  deliveryMethod: deliveryMethod,
  paymentMethod: paymentMethod,
  scheduledAt: scheduledDate ?? null,
  total: subtotal,
  status:  OrderStatus.PENDING
    }

    try {
       const response = await createOrder(orderData);
         if (response.success) {
          const orderItemsPayload = orderItems.map((item:any) => {
          const quantity = item.qty || 1;
          const price = item.salePrice || item.price || 0;
          return {
            orderId: response?.data?.id,
            productId: item.id,
            quantity: quantity,
            unitPrice: price,
            total: price * quantity,
          };
        });
        console.log(orderItemsPayload);
        await createBulkOrderItems(orderItemsPayload);
        toast.success("order placed successfully")
        router.push("/confirmation")
        handleClearCart();
      
    };
       setIsSubmitting(false)
    
    }catch{

    }
      
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

          {/* <Card>
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
          </Card> */}

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
              {orderItems.map((item:any) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <p className="font-medium">UGX-{(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>UGX-{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  {/* <p>UGX-{total}</p> */}
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
