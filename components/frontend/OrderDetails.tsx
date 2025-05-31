// "use client"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, CreditCard, MapPin, Phone } from 'lucide-react'
// import Image from "next/image"
// import { Button } from "../ui/moving-border"
// import { useEffect, useState } from "react"
// import StatusButton from "./status-button"

// interface OrderItem {
//   name: string
//   quantity: number
//   price: number
//   subTotal: number
// }

// interface OrderDetails {
//   customerName: string
//   orderDate: string
//   paymentMethod: string
//   items: OrderItem[]
//   total: number
//   shippingAddress: {
//     street: string
//     city: string
//     phone: string
//   }
// }

// export default function OrderDetails({order}:{order:any}) {
//   const orderDetails: OrderDetails = {
//     customerName: "NGOBI OWEN ALBERT",
//     orderDate: "11/18/2024",
//     paymentMethod: "cash on delivery",
//     items: [
//       {
//         name: "SPARK PLUGS",
//         quantity: 9,
//         price: 169000.00,
//         subTotal: 1521000.00
//       }
//     ],
//     total: 1521000.00,
//     shippingAddress: {
//       street: "Sunt autem qui mollit, Libero dolore accusa",
//       city: "Ipsa qui et ullam.co, Autem officia labori",
//       phone: "0776796191 or +1 (777) 764-9604"
//     }
//   }

  
//     // change date 
//     const date = new Date(order.createdAt);
//     const formattedDate = date.toLocaleDateString();

//     // get user location
//   //   const [userLocation, setUserLocation] = useState(null);

//   // useEffect(() => {
//   //   // Fetch all users
//   //   async function fetchUsers() {
//   //     try {
//   //       const response = await fetch('/api/users'); // Replace with your actual endpoint
//   //       const users = await response.json();

//   //       // Find the user matching the order.userId
//   //       const matchingUser = users.find((user) => user.id === order.user.id);

//   //       // Set the first location of the matching user (if available)
//   //       if (matchingUser?.locations?.length > 0) {
//   //         setUserLocation(matchingUser.locations[0]);
//   //       } else {
//   //         setUserLocation("Location not available");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching users:", error);
//   //       setUserLocation("Location not available");
//   //     }
//   //   }

//   //   fetchUsers();
//   // }, [order.user.id]);


//   return (
//     <div className="container mx-auto p-6 space-y-6 max-w-6xl">
//       <div className="flex items-center justify-between">

//        <StatusButton orderId={order.id} initialStatus={order.orderStatus}/>
//         <Badge variant="destructive" className="uppercase">{order.orderStatus}</Badge>
//       </div>
//       <p>Here are your order details:</p>

//       <Card>
//         <CardContent className="pt-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold">Customer:</span>
//                 <span>{order.user.name}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="h-4 w-4 text-muted-foreground" />
//                 <span className="font-semibold">Order Date:</span>
//                 <span>{formattedDate}</span>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <CreditCard className="h-4 w-4 text-muted-foreground" />
//                 <span className="font-semibold">Payment Method:</span>
//                 <span className="capitalize">{order.paymentMethod}</span>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Order Items</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Item</TableHead>
//                 <TableHead>Brand</TableHead>
//                 <TableHead className="text-right">Quantity</TableHead>
//                 <TableHead className="text-right">Price</TableHead>
//                 <TableHead className="text-right">Sub total</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {order.orderItems.map((item:any, index:any) => (
//                 <TableRow key={index}>
//                   <TableCell className="font-medium">{item.title}</TableCell>
//                   <TableCell className="font-medium">{item.brand}</TableCell>
//                   <TableCell className="font-medium">
//                     <img src={item.imageUrl} className="w-12 h-12"></img>
//                   </TableCell>
//                   <TableCell className="text-right">{item.qty}</TableCell>
//                   <TableCell className="text-right">{item.salePrice}</TableCell>
//                   <TableCell className="text-right">{item.salePrice*item.qty}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div className="flex justify-end mt-6">
//             <div className="text-right">
//               {/* <div className="font-semibold text-lg">
//                 Total to pay: {formatCurrency(orderDetails.total)}
//               </div> */}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Shipping Address</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between">
//             <div className="space-y-2">
//               <div className="flex items-start gap-2">
//                 <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
//                 <div>
//                   <p>{location.country}</p>
//                   <p>{location.state}</p>
//                   <p>{location.street}</p>
//                   <p>{location.address}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone className="h-4 w-4 text-muted-foreground" />
//                 <p>{location.altPhone}</p>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, MapPin, Phone } from "lucide-react";
// import StatusButton from "./status-button";
import { format } from "date-fns";

export default function OrderDetails({ order,orderItems }: { order: any ,orderItems:any}) {

  console.log(orderItems);
 const items=orderItems.data.filter((i:any)=>i.orderId===order.id)

  const formattedDate = order.createdAt
    ? format(new Date(order.createdAt), "PPP")
    : "Date not available";

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      {/* Status section */}
      <div className="flex items-center justify-between">
        {/* <StatusButton orderId={order.id} initialStatus={order.status} /> */}
        <Badge variant="destructive" className="uppercase">{order.status}</Badge>
      </div>

      <p>Here are your order details:</p>

      {/* Order Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Customer:</span>
                <span>{order.user?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">Order Date:</span>
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">Payment Method:</span>
                <span className="capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Delivery Method:</span>
                <span>{order.deliveryMethod}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                {/* <TableHead>Brand</TableHead> */}
                <TableHead>Image</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.product?.name ?? "N/A"}</TableCell>
                  {/* <TableCell>{item.product?.brandId?? "N/A"}</TableCell> */}
                  <TableCell>
                    <img
                      src={item.product?.imageUrl ?? "/placeholder.png"}
                      alt={item.product?.title ?? "Product Image"}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{(item.total).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6">
            <div className="text-right font-semibold text-lg">
              Total to Pay: {order.total.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p>{order.shippingAddress}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p>{order.shippingPhone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
