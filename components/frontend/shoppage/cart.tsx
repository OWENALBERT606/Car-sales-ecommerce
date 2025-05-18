
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addItem, clearCart, removeItem, updateqty } from "@/redux/slices/cartSlice"

export default function ShoppingCart() {
  const dispatch: AppDispatch = useDispatch();
  const [shippingOption, setShippingOption] = useState("free");
  
  // Use useSelector to get cart items from Redux store
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

  // Calculate subtotal
  const subtotal = cartItems.reduce((total: number, item: any) => {
    return total + (item.salePrice || item.price) * item.qty;
  }, 0);

  console.log(cartItems);

  // Calculate total (subtotal + shipping)
  const total = subtotal; // Since shipping is free

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id)); // Remove item from the Redux store
  };

  const handleUpdateQty = (id: number, qty: number) => {
    if (qty < 1) return; // Prevent negative quantities
    dispatch(updateqty({ id, qty }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("cart"); // Clear local storage as well
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-red-800">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
              <p>Your order qualifies for free shipping!</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-red-200">
                <div className="h-full w-full bg-red-600"></div>
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
                  {cartItems.map((item: any) => (
                    <tr key={item.id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label={`Remove ${item.title || item.name} from cart`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="h-20 w-20 overflow-hidden rounded border">
                            <Image
                              src={item.imageUrl || "/placeholder.svg"}
                              alt={item.title || item.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title || item.name}</h3>
                            {item.category && <p className="mt-1 text-sm text-gray-500">{item.category}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">UGX {(item.salePrice || item.price).toLocaleString()}</td>
                      <td className="py-4">
                        <div className="flex w-32 items-center rounded-md border">
                          <button
                            onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                            className="flex h-8 w-8 items-center justify-center border-r"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex-1 text-center">{item.qty}</span>
                          <button
                            onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                            className="flex h-8 w-8 items-center justify-center border-l"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 font-medium">
                        UGX {((item.salePrice || item.price) * item.qty).toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
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
              <Button 
                variant="outline" 
                className="w-full sm:w-auto" 
                onClick={handleClearCart}
              >
                Remove All
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">CART TOTALS</h2>

            <div className="mb-4 flex justify-between border-b pb-4">
              <span>Subtotal</span>
              <span className="font-medium">UGX {subtotal.toLocaleString()}</span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 font-medium">Shipping</h3>
              <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free-shipping" />
                    <Label htmlFor="free-shipping">Free shipping</Label>
                  </div>
                  <span>UGX 0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="local-pickup" />
                    <Label htmlFor="local-pickup">Local pickup</Label>
                  </div>
                  <span>UGX 0</span>
                </div>
              </RadioGroup>

              <div className="mt-4 text-sm">
                Shipping to <span className="font-medium">Kampala</span>.{" "}
                <button className="text-red-600 hover:underline">Change address</button>
              </div>
            </div>

            <div className="mb-6 flex justify-between border-b pb-4 text-lg font-bold">
              <span>Total</span>
              <span>UGX {total.toLocaleString()}</span>
            </div>

            <Link href="/checkout"><Button className="w-full bg-red-600 hover:bg-red-700">
              Proceed to checkout
            </Button></Link>

            <div className="mt-6 space-y-4 rounded-lg bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-1 text-red-600">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">Secure Checkout</h4>
                  <p className="text-sm text-gray-600">Your payment information is secure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-1 text-red-600">
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
                <div className="rounded-full bg-red-100 p-1 text-red-600">
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
                  <p className="text-sm text-gray-600">On all orders over UGX 50,000</p>
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
          <p className="mb-6 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
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
              <Badge className="absolute left-2 top-2 bg-red-600">15% OFF</Badge>
              <Image
                src="/placeholder.svg?height=150&width=150&text=Product+1"
                alt="Product 1"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">Luxury Sedan</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 line-through">UGX 35,000,000</span>
                <span className="ml-1 font-medium text-red-700">UGX 29,750,000</span>
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
                src="/placeholder.svg?height=150&width=150&text=Product+2"
                alt="Product 2"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">SUV 4x4</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="font-medium text-red-700">UGX 45,000,000</span>
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
                src="/placeholder.svg?height=150&width=150&text=Product+3"
                alt="Product 3"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">Compact Hatchback</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="font-medium text-red-700">UGX 20,000,000</span>
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
                src="/placeholder.svg?height=150&width=150&text=Product+4"
                alt="Product 4"
                width={150}
                height={150}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-medium">Luxury Sports Car</h3>
            <div className="mt-1 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500 line-through">UGX 85,000,000</span>
                <span className="ml-1 font-medium text-red-700">UGX 75,000,000</span>
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