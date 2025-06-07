// import { MetricCard } from "@/components/metric-card";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   ArrowDown,
//   ArrowRight,
//   ArrowUp,
//   Badge,
//   Box,
//   Download,
//   Link,
//   Package,
//   ShoppingBag,
//   ShoppingCart,
//   Users,
// } from "lucide-react";
// import { format } from "date-fns";





// const topProducts = [
//   {
//     name: "Wireless Earbuds Pro",
//     sales: 1234,
//     revenue: "$45,678",
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     name: "Smart Watch Elite",
//     sales: 987,
//     revenue: "$39,480",
//     image: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     name: "Premium Laptop Stand",
//     sales: 865,
//     revenue: "$25,950",
//     image: "/placeholder.svg?height=40&width=40",
//   },
// ];

// export default function DashboardMain({allOrders}:{allOrders:any}) {
//   const metrics = [
//   {
//     title: "Total Sales",
//     value: "$120,784.02",
//     change: {
//       value: "12.3%",
//       trend: "up" as const,
//       today: "+$1,453.89 today",
//     },
//     color: "bg-blue-500",
//   },
//   {
//     title: "Total Orders",
//     value: allOrders.data.length,
//     change: {
//       value: "20.1%",
//       trend: "up" as const,
//       today: "+2,676 today",
//     },
//     color: "bg-purple-500",
//   },
//   {
//     title: "Visitor",
//     value: "18,896",
//     change: {
//       value: "5.6%",
//       trend: "down" as const,
//       today: "-876 today",
//     },
//     color: "bg-violet-500",
//   },
//   {
//     title: "Refunded",
//     value: "2,876",
//     change: {
//       value: "13%",
//       trend: "up" as const,
//       today: "+34 today",
//     },
//     color: "bg-indigo-500",
//   },
// ];
// const bigCards = [
//   {
//     title: "Total Sales",
//     value: "$120,784.02",
//     change: "+12.3%",
//     trend: "up",
//     icon: ShoppingCart,
//   },
//   {
//     title: "Total Orders",
//     value: allOrders.length,
//     change: "+20.1%",
//     trend: "up",
//     icon: ShoppingBag,
//   },
//   {
//     title: "Total Products",
//     value: "1,429",
//     change: "+8.3%",
//     trend: "up",
//     icon: Box,
//   },
//   {
//     title: "Total Users",
//     value: "12,456",
//     change: "+15.2%",
//     trend: "up",
//     icon: Users,
//   },
// ];
//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//             <p className="text-muted-foreground">
//               Here's your statistics overview.
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Select defaultValue="7d">
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Select period" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="7d">Last 7 days</SelectItem>
//                 <SelectItem value="30d">Last 30 days</SelectItem>
//                 <SelectItem value="90d">Last 90 days</SelectItem>
//                 <SelectItem value="12m">Last 12 months</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button variant="outline">
//               <Download className="mr-2 h-4 w-4" />
//               Export to Excel
//             </Button>
//           </div>
//         </div>
//         <div className="grid grid-cols-12 gap-6">
//           {/* Big Cards - 4 cards in a row */}
//           {bigCards.map((card, index) => (
//             <Card key={index} className="col-span-3 relative overflow-hidden">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   {card.title}
//                 </CardTitle>
//                 <card.icon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{card.value}</div>
//                 <div
//                   className={`flex items-center text-sm ${card.trend === "up" ? "text-green-600" : "text-red-600"}`}
//                 >
//                   View details
//                   <ArrowRight className="mr-1 h-4 w-4" />
//                 </div>
//               </CardContent>
//               <div className="absolute right-0 bottom-0 opacity-5">
//                 <card.icon className="h-24 w-24 text-primary" />
//               </div>
//             </Card>
//           ))}
//         </div>

//         <div className="grid grid-cols-12 gap-6">
//           {/* Recent Activity Table */}
//           <Card className="lg:col-span-8">
//                      <CardHeader>
//                        <CardTitle>Recent Orders</CardTitle>
//                        <CardDescription>latest vehicle purchases</CardDescription>
//                      </CardHeader>
//                      <CardContent>
//                        <Table>
//                          <TableHeader>
//                            <TableRow>
//                              <TableHead>Product</TableHead>
//                              <TableHead>Status</TableHead>
//                              <TableHead>Total</TableHead>
//                              <TableHead className="text-right">Date</TableHead>
//                            </TableRow>
//                          </TableHeader>
//                          <TableBody>
//                            {allOrders.data.slice(0,5).map((order:any) => (
//                              <TableRow key={order.id}>
//                                <TableCell>
//                                  <div className="flex items-center space-x-3">
//                                    <Avatar>
//                                      <AvatarImage src={order.items?.[0]?.product?.imageUrl} />
//                                      <AvatarFallback>
//                                        <Package className="h-4 w-4" />
//                                      </AvatarFallback>
//                                    </Avatar>
//                                    <div>
//                                      <div className="font-medium">{order.items?.[0]?.product?.name}</div>
//                                      <div className="text-sm text-muted-foreground">{order.items[0].product.name}</div>
//                                    </div>
//                                  </div>
//                                </TableCell>
//                                <TableCell>
//                                  <Badge
//                                  >
//                                    {order.status}
//                                  </Badge>
//                                </TableCell>
//                                <TableCell className="font-medium">{order.total}</TableCell>
//                                <TableCell className="text-right text-muted-foreground"> {format(new Date(order.createdAt), "EEEE, dd MMMM yyyy")}</TableCell>
//                              </TableRow>
//                            ))}
//                          </TableBody>
//                        </Table>
//                        <div className="mt-4">
//                          <Button variant="outline" className="w-full">
//                            <Link className="flex" href="/dashboard/orders">View All Orders
//                            <ArrowRight className="ml-2 h-4 w-4" /></Link>
//                          </Button>
//                        </div>
//                      </CardContent>
//                    </Card>

//           {/* Top Selling Products */}
//           <Card className="col-span-4">
//             <CardHeader>
//               <CardTitle>Top Selling Products</CardTitle>
//               <CardDescription>Best performing products</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6">
//                 {topProducts.map((product, index) => (
//                   <div key={index} className="flex items-center">
//                     <Avatar className="h-9 w-9">
//                       <AvatarImage src={product.image} alt={product.name} />
//                       <AvatarFallback>P</AvatarFallback>
//                     </Avatar>
//                     <div className="ml-4 space-y-1">
//                       <p className="text-sm font-medium leading-none">
//                         {product.name}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {product.sales.toLocaleString()} sales
//                       </p>
//                     </div>
//                     <div className="ml-auto font-medium">{product.revenue}</div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


import { MetricCard } from "@/components/metric-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Download,
  Package,
  ShoppingBag,
  ShoppingCart,
  Users,
  Box,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";

const topProducts = [
  {
    name: "Wireless Earbuds Pro",
    sales: 1234,
    revenue: "$45,678",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Smart Watch Elite",
    sales: 987,
    revenue: "$39,480",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Premium Laptop Stand",
    sales: 865,
    revenue: "$25,950",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function DashboardMain({ allOrders }: { allOrders: any }) {
  const metrics = [
    {
      title: "Total Sales",
      value: "UGX 0",
      change: {
        value: "12.3%",
        trend: "up" as const,
        today: "+$1,453.89 today",
      },
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: allOrders?.data?.length ?? 0,
      change: {
        value: "20.1%",
        trend: "up" as const,
        today: "+2,676 today",
      },
      color: "bg-purple-500",
    },
    {
      title: "Visitor",
      value: "18,896",
      change: {
        value: "5.6%",
        trend: "down" as const,
        today: "-876 today",
      },
      color: "bg-violet-500",
    },
    {
      title: "Refunded",
      value: "2,876",
      change: {
        value: "13%",
        trend: "up" as const,
        today: "+34 today",
      },
      color: "bg-indigo-500",
    },
  ];

  const bigCards = [
    {
      title: "Total Sales",
      value: "UGX-0",
      change: "+12.3%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Total Orders",
      value: allOrders?.data?.length ?? 0,
      change: "+20.1%",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      title: "Total Products",
      value: "1,429",
      change: "+8.3%",
      trend: "up",
      icon: Box,
    },
    {
      title: "Total Users",
      value: "12,456",
      change: "+15.2%",
      trend: "up",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Here's your statistics overview.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="7d">
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
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
          </div>
        </div>

        {/* Big Summary Cards */}
        <div className="grid grid-cols-12 gap-6">
          {bigCards.map((card, index) => (
            <Card key={index} className="col-span-3 relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div
                  className={`flex items-center text-sm ${
                    card.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  View details
                  <ArrowRight className="mr-1 h-4 w-4" />
                </div>
              </CardContent>
              <div className="absolute right-0 bottom-0 opacity-5">
                <card.icon className="h-24 w-24 text-primary" />
              </div>
            </Card>
          ))}
        </div>

        {/* Table + Top Products */}
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-8">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest vehicle purchases</CardDescription>
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
                  {allOrders?.data
                    ?.filter((order: any) => order.items?.[0]?.product)
                    .slice(0, 5)
                    .map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={
                                  order.items?.[0]?.product?.imageUrl ??
                                  "/placeholder.svg"
                                }
                              />
                              <AvatarFallback>
                                <Package className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {order.items?.[0]?.product?.name ?? "Unnamed"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {order.items?.[0]?.product?.name ?? "Unnamed"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.total}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {format(new Date(order.createdAt), "EEEE, dd MMMM yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <Link href="/dashboard/orders" className="flex items-center">
                    View All Orders <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          {/* <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performing products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={product.image} alt={product.name} />
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales.toLocaleString()} sales
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{product.revenue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
