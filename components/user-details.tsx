"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, LogOut, Package, Bell, Share2, User, Search } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function OrdersPage({ session,allOrders }: { session: any,allOrders:any }) {

const orders= allOrders.data.filter((order:any)=>order.userId===session?.user.id);
console.log(orders)

  const router=useRouter()

  const [activeTab, setActiveTab] = useState("orders")
  if(!session){
    toast.error("you need to be signed in first");
    router.push("/login")
   }

  // Sample orders data - in a real application, this would come from an API call
  // const orders = [
  //   {
  //     id: "ORD-7629385",
  //     date: "May 15, 2025",
  //     total: "UGX 78,500",
  //     status: "Delivered",
  //     items: [
  //       { name: "Wireless Headphones", quantity: 1, price: "UGX 45,000" },
  //       { name: "Phone Case", quantity: 1, price: "UGX 15,000" },
  //     ],
  //     address: "123 Main St, Kampala",
  //     tracking: "TRK283947264",
  //   },
  //   {
  //     id: "ORD-6529174",
  //     date: "April 28, 2025",
  //     total: "UGX 128,000",
  //     status: "Processing",
  //     items: [
  //       { name: "Smart Watch", quantity: 1, price: "UGX 120,000" },
  //       { name: "Watch Strap", quantity: 1, price: "UGX 8,000" },
  //     ],
  //     address: "123 Main St, Kampala",
  //     tracking: "TRK738293471",
  //   },
  //   {
  //     id: "ORD-5430962",
  //     date: "March 12, 2025",
  //     total: "UGX 35,000",
  //     status: "Cancelled",
  //     items: [{ name: "T-Shirt", quantity: 2, price: "UGX 35,000" }],
  //     address: "123 Main St, Kampala",
  //     tracking: "N/A",
  //   },
  // ]

  // Sample wishlist data
  const wishlistItems = [
    {
      id: "PROD-1234",
      name: "Premium Wireless Earbuds",
      price: "UGX 85,000",
      inStock: true,
    },
    {
      id: "PROD-5678",
      name: "Smartphone Power Bank 10000mAh",
      price: "UGX 65,000",
      inStock: true,
    },
    {
      id: "PROD-9012",
      name: "Fitness Tracker Watch",
      price: "UGX 120,000",
      inStock: false,
    },
  ]

  // Sample notifications
  const notifications = [
    {
      id: "NOTIF-1",
      title: "Order Delivered",
      message: "Your order #ORD-7629385 has been delivered successfully.",
      date: "May 16, 2025",
      read: false,
    },
    {
      id: "NOTIF-2",
      title: "Price Drop Alert",
      message: "An item in your wishlist is now on sale!",
      date: "May 14, 2025",
      read: true,
    },
    {
      id: "NOTIF-3",
      title: "New Arrivals",
      message: "Check out our latest products in the electronics category.",
      date: "May 10, 2025",
      read: true,
    },
  ]

  // Helper function to get status color
  const getStatusColor = (status: any) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50"
      case "Processing":
        return "text-blue-600 bg-blue-50"
      case "Shipped":
        return "text-purple-600 bg-purple-50"
      case "Cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return renderOrdersContent()
      case "profile":
        return renderProfileContent()
      case "wishlist":
        return renderWishlistContent()
      case "notifications":
        return renderNotificationsContent()
      default:
        return renderOrdersContent()
    }
  }

  // Orders tab content
  const renderOrdersContent = () => {
    return (
      <>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Orders</h1>
          <div className="relative w-64">
            <Input placeholder="Search orders..." className="pl-9" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-md p-12 text-center">
            <div className="flex justify-center mb-4">
              <Package size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <Button className="bg-red-700 hover:bg-red-800">Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order:any) => (
              <div key={order.id} className="bg-white rounded-md p-6 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p>Order Status</p>
                      <span className={`text-lg px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Order Date: {order.date}</p>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                    <p className="font-medium">{order.total}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item:any, idx:any) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                        <Image
                          src={item.product?.imageUrl}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.price}</p>
                        {order.status === "Delivered" && (
                          <Button variant="ghost" size="sm" className="text-red-700 mt-1">
                            Buy Again
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-col md:flex-row justify-between text-sm">
                    <div>
                      <p className="text-gray-600">Shipping Address:</p>
                      <p>{order.address}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <p className="text-gray-600">Tracking Number:</p>
                      <p>{order.tracking}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled className="w-9 h-9 p-0">
              <span className="sr-only">Previous</span>
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
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Button>
            <Button variant="outline" size="sm" className="w-9 h-9 p-0 bg-red-700 text-white">
              1
            </Button>
            <Button variant="outline" size="sm" className="w-9 h-9 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="w-9 h-9 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="w-9 h-9 p-0">
              <span className="sr-only">Next</span>
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
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </nav>
        </div>
      </>
    )
  }

  // Profile tab content
  const renderProfileContent = () => {
    return (
      <div className="bg-white rounded-md p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-6">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
             <Image src={session.user.imageUrl} alt="fdf" width={200} height={200}/>
            </div>
            <Button className="bg-red-700 hover:bg-red-800 w-full md:w-auto">Change Photo</Button>
          </div>

          <div className="md:w-2/3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{session?.user?.firstName}</label>
                <Input defaultValue={session?.user?.firstName} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{session?.user?.lastName}</label>
                <Input defaultValue={session?.user?.lastName} className="w-full" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input defaultValue="user@example.com" className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input defaultValue="+256 700 123 456" className="w-full" />
            </div>

            <div className="pt-4">
              <Button className="bg-red-700 hover:bg-red-800">Save Changes</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <h2 className="text-lg font-medium mb-4">Password & Security</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <Input type="password" className="w-full md:w-1/2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <Input type="password" className="w-full md:w-1/2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <Input type="password" className="w-full md:w-1/2" />
            </div>
            <div className="pt-2">
              <Button className="bg-red-700 hover:bg-red-800">Update Password</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Wishlist tab content
  const renderWishlistContent = () => {
    return (
      <>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Wishlist</h1>
          <div className="relative w-64">
            <Input placeholder="Search wishlist..." className="pl-9" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-md p-12 text-center">
            <div className="flex justify-center mb-4">
              <Heart size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Save items you like to your wishlist</p>
            <Button className="bg-red-700 hover:bg-red-800">Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-md p-4 shadow-sm flex items-center">
                <div className="h-20 w-20 bg-gray-100 rounded flex items-center justify-center mr-4">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-red-700 font-medium">{item.price}</p>
                  <p className="text-sm mt-1">
                    {item.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button className="bg-red-700 hover:bg-red-800" disabled={!item.inStock}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    )
  }

  // Notifications tab content
  const renderNotificationsContent = () => {
    return (
      <>
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Notifications</h1>
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-md p-12 text-center">
            <div className="flex justify-center mb-4">
              <Bell size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-gray-500">You don't have any notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-md p-4 shadow-sm border-l-4 ${notification.read ? "border-gray-300" : "border-red-700"}`}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                </div>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                {!notification.read && (
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-red-700">
                      Mark as Read
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="mb-6">
              <h2 className="font-bold text-black">Hello NGOBI OWEN ALBERT</h2>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                  activeTab === "orders" ? "bg-red-700 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Package size={20} />
                <span>Orders</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                  activeTab === "profile" ? "bg-red-700 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <User size={20} />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                  activeTab === "wishlist" ? "bg-red-700 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-3 p-3 rounded-md w-full text-left ${
                  activeTab === "notifications" ? "bg-red-700 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  )
}
