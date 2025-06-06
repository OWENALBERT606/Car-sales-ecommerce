"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Package, Star, MessageSquare, Bell, User, ShoppingCart, Clock } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

// Mock user data - in real app, this would come from your database

const recentOrders = [
  {
    id: "ORD-001",
    product: "Toyota Camry 2020",
    status: "DELIVERED",
    total: "$25,000",
    date: "2 days ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ORD-002",
    product: "Honda Civic 2019",
    status: "PROCESSING",
    total: "$18,500",
    date: "1 week ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ORD-003",
    product: "Ford F-150 2021",
    status: "PENDING",
    total: "$32,000",
    date: "2 weeks ago",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const reviewedProducts = [
  {
    name: "Toyota Camry 2020",
    rating: 5,
    review: "Excellent condition, great service!",
    date: "3 days ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Honda Civic 2019",
    rating: 4,
    review: "Good value for money, minor scratches.",
    date: "1 week ago",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nissan Altima 2018",
    rating: 5,
    review: "Perfect car, exactly as described.",
    date: "2 weeks ago",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const notifications = [
  {
    message: "Your order ORD-001 has been delivered",
    time: "2 hours ago",
    read: false,
    type: "order",
  },
  {
    message: "New message from dealer about Honda Civic",
    time: "1 day ago",
    read: false,
    type: "message",
  },
  {
    message: "Your review for Toyota Camry was published",
    time: "3 days ago",
    read: true,
    type: "review",
  },
]

export default function UserDashboard({allOrders,session}:{allOrders:any,session:any}) {

  // const orders=  allOrders.data.filter((order:any) => order.userId === session?.user?.id);
  // console.log(orders);
  const orders=allOrders
  const userStats = [
  {
    title: "Total Orders",
    value: orders.length,
    change: "+2 this month",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-blue-500",
  },
  {
    title: "Reviews Written",
    value: "0",
    change: "+1 this week",
    trend: "up",
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    title: "Messages",
    value: "0",
    change: "0 unread",
    trend: "neutral",
    icon: MessageSquare,
    color: "bg-red-500",
  },
  {
    title: "Notifications",
    value: "0",
    change: "0 new",
    trend: "neutral",
    icon: Bell,
    color: "bg-purple-500",
  },
]

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your account overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="30d">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <User className="mr-2 h-4 w-4" />
             <Link href="/dashboard/profile"> Edit Profile</Link>
            </Button>
          </div>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm text-muted-foreground">{stat.change}</div>
              </CardContent>
              <div className="absolute right-0 bottom-0 opacity-10">
                <stat.icon className="h-16 w-16 text-primary" />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Recent Orders</CardTitle>
              <CardDescription>Your latest vehicle purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0,3).map((order:any) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={order.items?.[0]?.product?.imageUrl} />
                            <AvatarFallback>
                              <Package className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{order.items?.[0]?.product?.name}</div>
                            <div className="text-sm text-muted-foreground">{order.items[0].product.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "DELIVERED"
                              ? "default"
                              : order.status === "PROCESSING"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{order.total}</TableCell>
                      <TableCell className="text-right text-muted-foreground"> {format(new Date(order.createdAt), "EEEE, dd MMMM yyyy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Link className="flex" href="/dashboard/orders">View All Orders
                  <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Latest updates and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      !notification.read ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-1 rounded-full ${
                        notification.type === "order"
                          ? "bg-red-100"
                          : notification.type === "message"
                            ? "bg-blue-100"
                            : "bg-yellow-100"
                      }`}
                    >
                      {notification.type === "order" ? (
                        <Package className="h-3 w-3" />
                      ) : notification.type === "message" ? (
                        <MessageSquare className="h-3 w-3" />
                      ) : (
                        <Star className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Notifications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>My Recent Reviews</CardTitle>
            <CardDescription>Products you've reviewed recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviewedProducts.map((product, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.image || "/placeholder.svg"} alt={product.name} />
                    <AvatarFallback>
                      <Package className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">{product.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{product.review}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All My Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


