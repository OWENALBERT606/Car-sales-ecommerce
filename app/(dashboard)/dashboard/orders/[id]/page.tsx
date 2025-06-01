
import { getAllOrderItems } from '@/actions/orderItem';
import { getOrderById } from '@/actions/orders';
import OrderDetails from '@/components/frontend/OrderDetails';
import React from 'react'

export default async function page({params}: {params: Promise<{ id: string }>}):Promise<any>  {
 const {id}= await params
 const order=await getOrderById(id)
 const orderItems=await getAllOrderItems();
 

  return (
    <div>
        <OrderDetails  orderItems={orderItems}  order={order}/>
    </div>
  )
}
