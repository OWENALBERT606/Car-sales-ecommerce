import CheckoutPage from '@/components/frontend/shoppage/checkout'
import { authOptions } from '@/config/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div className='container px-4 md:px-12 lg:px-24'>
        <CheckoutPage session={session}/>
    </div>
  )
}
