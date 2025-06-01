"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { useOrders } from "@/hooks/useOrders";
import { useSession } from "next-auth/react";

export default function page() {
  const {orders, error, isLoading } = useOrders();
   const { data: session } = useSession();
  const userRoles = session?.user?.roles ?? [];
  const isAdmin = userRoles.some((role: any) => role.roleName === "admin");
  if (isLoading) {
    return (
      <div className="p-8">
        <div>Loading Car orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div>Error loading orders</div>
      </div>
    );
  }
  const userOrder=orders.filter((order) => order.userId === session?.user?.id);
  return (
   <>
   {/* admin orders */}
    <div className="p-8">
       {isAdmin && (
        <TableHeader
          title="Car Orders"
          linkTitle="Add order"
          href="/dashboard/orders/new"
          data={orders}
          model="order"
        />
      )}
      <h2 className="font-bold text-xl">your orders <span className="text-red-600"> {userOrder.length}</span></h2>
      <div className="py-8">
        <DataTable 
         data={
            isAdmin
              ? orders // admin sees all
              : orders.filter((order) => order.userId === session?.user?.id) // user sees only their own
          }
         columns={columns} />
      </div>
    </div>
    {/* user orders component*/}
   </>
  );
}
