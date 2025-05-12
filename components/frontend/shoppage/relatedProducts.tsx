import React from 'react'
import { Star, Minus, Plus, ShoppingCart, Heart, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function RelatedProducts({products,product}:{product:any,products:any}) {

    const relatedProducts = products.filter(
        (q:any) => q.productId === product?.category?.id);
        console.log(relatedProducts);
           
    
  return (
    <div>
        <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Related Product 1 */}
          {
            relatedProducts.slice(0,4).map((item:any,i:any)=>{
                return(
                    <div className="group rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md">
            <div className="relative">
              <Badge className="absolute left-2 top-2 bg-green-600">10% OFF</Badge>
              <Button variant="outline" size="icon" className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={200}
                height={200}
                className="mx-auto h-auto w-full object-cover"
              />
            </div>

            <div className="mt-4">
              <Badge variant="outline" className="text-xs text-green-700">
                {item.type}
              </Badge>

              <h3 className="mt-2 font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.name}</p>

              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <Star className="h-4 w-4 fill-none text-amber-400" />
                <span className="ml-1 text-xs text-gray-600">4 reviews</span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-500 line-through">{item.price}9</span>
                <span className="text-lg font-semibold text-green-700">{item.discountedPrice}</span>
                <span className="text-sm text-gray-600">4 oz jar</span>
              </div>

              <Button className="mt-3 w-full bg-green-600 hover:bg-green-700">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
                )
            })
          }
        </div>
      </div>
    </div>
  )
}
