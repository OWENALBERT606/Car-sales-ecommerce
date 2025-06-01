
"use client";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, MapPin, Phone } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast"; // if you use react-hot-toast
import { updateOrderById } from "@/actions/orders";
import { useSession } from "next-auth/react";

export default function OrderDetails({ order, orderItems }: { order: any, orderItems: any}) {
  const ORDER_STATUS_OPTIONS = ["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"] as const;
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);

  const items = orderItems.data.filter((i: any) => i.orderId === order.id);
  const formattedDate = order.createdAt ? format(new Date(order.createdAt), "PPP") : "Date not available";

   const { data: session,status} = useSession();
  
    const userRole = session?.user?.roles[0].roleName;
    // const isAdmin = userRoles.some((role: any) => role.name === "admin");

  

  const handleStatusChange = async () => {
    setUpdating(true);
    try {
      const res = await updateOrderById(order.id,order);

      toast.success("Order status updated successfully");
      order.status = newStatus;
      setModalOpen(false);
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      {/* Status section */}
      <div className="flex items-center justify-between">
        <Badge variant="destructive" className="uppercase">{order.status}</Badge>
        {status === "loading" ? null : (
  <div className="">
  <Button
    onClick={() => setModalOpen(true)}
    className={userRole==="administrator" ? "block" : "hidden"}
  >
    Change Status
  </Button>
  
  </div>
  
  
)}


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
                  <TableCell>
                    <img
                      src={item.product?.imageUrl ?? "/placeholder.png"}
                      alt={item.product?.title ?? "Product Image"}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.total.toLocaleString()}</TableCell>
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

      {/* Modal for changing status */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="status">Select Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusChange} disabled={updating}>
              {updating ? "Updating..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
