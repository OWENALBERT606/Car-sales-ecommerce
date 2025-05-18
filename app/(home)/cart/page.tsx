import ShoppingCart from '@/components/frontend/shoppage/cart'
import Providers from '@/components/Providers'
import React from 'react'

export default function page() {
  return (
    <div className='px-4 md:px-12 lx:px-24'>
      <Providers>
         <ShoppingCart/>
      </Providers>
       
    </div>
  )
}
