"use client";
import { CarMakeCarousel } from '@/components/frontend/car-make-carousel';
import AgriCategorySidebar from '@/components/frontend/shop/category-sidebar';
import FeaturedCategories from '@/components/frontend/shop/featured-categories'
import FeaturedProducts from '@/components/frontend/shop/featured-products'
import HeroSlider from '@/components/frontend/shop/hero-slider'
import LatestDeals from '@/components/frontend/shop/latest-deals'
import LatestNews from '@/components/frontend/shop/latest-news'
import NewsletterSubscription from '@/components/frontend/shop/news-letter-subscription'
import ProductGridWithSidebar from '@/components/frontend/shop/product-grid-with-sidebar'
import PromotionalBanners from '@/components/frontend/shop/promotional-banners'
import TrendingProductCarousel from '@/components/frontend/shop/trending';
import UserReviews from '@/components/frontend/shop/user-reviews'
import { useBanners } from '@/hooks/useBanners';
import { useCategories } from '@/hooks/useCategories'
import { useMakes } from '@/hooks/useMake';
import { useProducts } from '@/hooks/useProducts';
import React from 'react'

export default function page() {
  const { categories, error, isLoading } = useCategories();
   const {products}=useProducts();
  const { banners} = useBanners();
  const { makes} = useMakes();


  return (
    <div>
      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-6">
        <div className="flex flex-col gap-6 md:flex-row">
         
          <div className="flex-1 sm:w-full">
            <HeroSlider />
          </div>
           <AgriCategorySidebar makes={makes} />
        </div>
        <div className="my-6">
          <FeaturedCategories categories={categories} />
        </div>
        <TrendingProductCarousel products={products}/>
        <CarMakeCarousel carMakes={makes} />
        <div className="">
          <h2 className="mb-6 text-2xl font-bold">Special Offers</h2>
          <PromotionalBanners banners={banners}/>
        </div>
        <div className="">
      <div className="container mx-auto px-4 py-4 mt-6">
        <h1 className="mb-4 text-3xl mt-5 font-bold text-red-600">Latest Category drives</h1>
        <section className="mb-12">
          <FeaturedProducts products={products} categories={categories} />
        </section>
      </div>
        </div>
        <div className="my-8">
          <LatestDeals products={products}/>
        </div>
        <div className="my-12">
          <h2 className="mb-6 text-2xl font-bold">Discounted Fruits & Vegetables</h2>
          <ProductGridWithSidebar products={products} />
        </div>
      {/* <UserReviews /> */}
        <NewsletterSubscription/>
      </div>
     
    </div>
  )
}
