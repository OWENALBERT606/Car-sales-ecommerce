"use client"
import ShopBanner from '@/components/frontend/shoppage/agriculture-banner';
import Products from '@/components/frontend/shoppage/products'
import { useBanners } from '@/hooks/useBanners';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import React from 'react'

export default function page() {
  const {products,error, isLoading}=useProducts();
  const {banners}=useBanners();
  const {categories}=useCategories();
  return (
    <div className='container mx-auto px-4 py-8 md:px-12 lg:px-24 md:p-6'>
        <ShopBanner banners={banners}/>
        <Products products={products} categories={categories}/>
    </div>
  )
}
