import { getAllOrders } from '@/actions/orders';
import ProfilePage from '@/components/user-details'
import { authOptions } from '@/config/auth';
import { getServerSession } from 'next-auth';
import React from 'react'
import toast from 'react-hot-toast';

export default async function Page() {
   const session = await getServerSession(authOptions);
   const allOrders=await getAllOrders();


   
  return (
    <div className='px-4 md:px-12 lg:px-24 py-6'>
        <ProfilePage allOrders={allOrders} session={session}/>
    </div>
  )
}
