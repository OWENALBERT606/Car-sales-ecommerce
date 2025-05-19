// "use client"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { ArrowLeft, Plus, Upload } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"

// export default function BarterTradePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-red-700 text-white p-4">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-between">
//             <h1 className="text-xl font-bold">Barter Trade</h1>
//             <div className="flex items-center gap-4">
//               <Button variant="ghost" className="text-white hover:bg-red-800">
//                 My Trades
//               </Button>
//               <Button variant="ghost" className="text-white hover:bg-red-800">
//                 Notifications
//               </Button>
//               <div className="relative">
//                 <Image
//                   src="/placeholder.svg?height=40&width=40"
//                   width={40}
//                   height={40}
//                   alt="User avatar"
//                   className="rounded-full border-2 border-white"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-4 py-8">
//         <Link href="#" className="flex items-center text-red-700 hover:text-red-900 mb-6">
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Dashboard
//         </Link>

//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-2">Create Barter Trade Request</h2>
//           <p className="text-gray-600">
//             Fill in the details of what you have to offer and what you're looking for in exchange.
//           </p>
//         </div>

//         <Tabs defaultValue="offer" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-8">
//             <TabsTrigger
//               value="offer"
//               className="text-lg py-3 data-[state=active]:bg-red-700 data-[state=active]:text-white"
//             >
//               What You're Offering
//             </TabsTrigger>
//             <TabsTrigger
//               value="want"
//               className="text-lg py-3 data-[state=active]:bg-red-700 data-[state=active]:text-white"
//             >
//               What You Want
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="offer">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Your Item Details</CardTitle>
//                 <CardDescription>
//                   Provide detailed information about the item you're offering for trade.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="item-name">
//                         Item Name <span className="text-red-500">*</span>
//                       </Label>
//                       <Input id="item-name" placeholder="e.g. iPhone 13 Pro" />
//                     </div>

//                     <div>
//                       <Label htmlFor="category">
//                         Category <span className="text-red-500">*</span>
//                       </Label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="electronics">Electronics</SelectItem>
//                           <SelectItem value="vehicles">Vehicles</SelectItem>
//                           <SelectItem value="furniture">Furniture</SelectItem>
//                           <SelectItem value="clothing">Clothing</SelectItem>
//                           <SelectItem value="books">Books</SelectItem>
//                           <SelectItem value="sports">Sports Equipment</SelectItem>
//                           <SelectItem value="tools">Tools</SelectItem>
//                           <SelectItem value="other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="condition">
//                         Condition <span className="text-red-500">*</span>
//                       </Label>
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select condition" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="new">Brand New</SelectItem>
//                           <SelectItem value="like-new">Like New</SelectItem>
//                           <SelectItem value="excellent">Excellent</SelectItem>
//                           <SelectItem value="good">Good</SelectItem>
//                           <SelectItem value="fair">Fair</SelectItem>
//                           <SelectItem value="poor">Poor</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="estimated-value">
//                         Estimated Value <span className="text-red-500">*</span>
//                       </Label>
//                       <div className="flex">
//                         <Select className="w-24 rounded-r-none">
//                           <SelectTrigger>
//                             <SelectValue placeholder="UGX" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="ugx">UGX</SelectItem>
//                             <SelectItem value="usd">USD</SelectItem>
//                             <SelectItem value="eur">EUR</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <Input className="rounded-l-none" placeholder="e.g. 500000" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="description">
//                         Description <span className="text-red-500">*</span>
//                       </Label>
//                       <Textarea
//                         id="description"
//                         placeholder="Describe your item in detail including brand, model, age, any defects, etc."
//                         className="min-h-[150px]"
//                       />
//                     </div>

//                     <div>
//                       <Label>
//                         Item Photos <span className="text-red-500">*</span>
//                       </Label>
//                       <div className="grid grid-cols-3 gap-4 mt-2">
//                         <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center h-32 bg-gray-50 hover:bg-gray-100 cursor-pointer">
//                           <Upload className="h-8 w-8 text-gray-400 mb-2" />
//                           <span className="text-xs text-gray-500">Main Photo</span>
//                         </div>
//                         <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center h-32 bg-gray-50 hover:bg-gray-100 cursor-pointer">
//                           <Plus className="h-8 w-8 text-gray-400" />
//                         </div>
//                         <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center h-32 bg-gray-50 hover:bg-gray-100 cursor-pointer">
//                           <Plus className="h-8 w-8 text-gray-400" />
//                         </div>
//                       </div>
//                       <p className="text-xs text-gray-500 mt-2">
//                         Upload up to 5 photos. First photo will be the main image.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="location">
//                     Location <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select city" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="kampala">Kampala</SelectItem>
//                         <SelectItem value="entebbe">Entebbe</SelectItem>
//                         <SelectItem value="jinja">Jinja</SelectItem>
//                         <SelectItem value="mbarara">Mbarara</SelectItem>
//                         <SelectItem value="gulu">Gulu</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select area" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="nakawa">Nakawa</SelectItem>
//                         <SelectItem value="ntinda">Ntinda</SelectItem>
//                         <SelectItem value="bukoto">Bukoto</SelectItem>
//                         <SelectItem value="kololo">Kololo</SelectItem>
//                         <SelectItem value="kiira">Kiira</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button variant="outline">Save as Draft</Button>
//                 <Button
//                   className="bg-red-700 hover:bg-red-800"
//                   onClick={() => document.querySelector('[data-value="want"]')?.click()}
//                 >
//                   Continue
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>

//           <TabsContent value="want">
//             <Card>
//               <CardHeader>
//                 <CardTitle>What You Want in Exchange</CardTitle>
//                 <CardDescription>Specify what you're looking for in exchange for your item.</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div>
//                   <Label className="text-base font-medium">Trade Preferences</Label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//                     <div className="flex items-start space-x-3">
//                       <Checkbox id="specific-item" />
//                       <div>
//                         <Label htmlFor="specific-item" className="font-normal">
//                           I want a specific item
//                         </Label>
//                         <p className="text-sm text-gray-500">I know exactly what I want in exchange</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start space-x-3">
//                       <Checkbox id="open-offers" defaultChecked />
//                       <div>
//                         <Label htmlFor="open-offers" className="font-normal">
//                           I'm open to offers
//                         </Label>
//                         <p className="text-sm text-gray-500">I'll consider different items in these categories</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t pt-6">
//                   <Label className="text-base font-medium mb-4 block">Interested Categories</Label>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-electronics" />
//                       <Label htmlFor="cat-electronics" className="font-normal">
//                         Electronics
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-vehicles" />
//                       <Label htmlFor="cat-vehicles" className="font-normal">
//                         Vehicles
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-furniture" />
//                       <Label htmlFor="cat-furniture" className="font-normal">
//                         Furniture
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-clothing" />
//                       <Label htmlFor="cat-clothing" className="font-normal">
//                         Clothing
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-books" />
//                       <Label htmlFor="cat-books" className="font-normal">
//                         Books
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-sports" />
//                       <Label htmlFor="cat-sports" className="font-normal">
//                         Sports Equipment
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-tools" />
//                       <Label htmlFor="cat-tools" className="font-normal">
//                         Tools
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="cat-other" />
//                       <Label htmlFor="cat-other" className="font-normal">
//                         Other
//                       </Label>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="value-range">Preferred Value Range</Label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="flex">
//                       <Select >
//                         <SelectTrigger>
//                           <SelectValue placeholder="UGX" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ugx">UGX</SelectItem>
//                           <SelectItem value="usd">USD</SelectItem>
//                           <SelectItem value="eur">EUR</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <Input className="rounded-l-none" placeholder="Minimum value" />
//                     </div>
//                     <div className="flex">
//                       <Select className="w-24 rounded-r-none">
//                         <SelectTrigger>
//                           <SelectValue placeholder="UGX" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="ugx">UGX</SelectItem>
//                           <SelectItem value="usd">USD</SelectItem>
//                           <SelectItem value="eur">EUR</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <Input className="rounded-l-none" placeholder="Maximum value" />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="specific-details">Specific Details (Optional)</Label>
//                   <Textarea
//                     id="specific-details"
//                     placeholder="Describe what you're looking for in detail. Include brands, models, conditions, etc."
//                     className="min-h-[100px]"
//                   />
//                 </div>

//                 <div className="border p-4 rounded-md bg-gray-50">
//                   <div className="flex items-start space-x-3">
//                     <Checkbox id="cash-option" />
//                     <div>
//                       <Label htmlFor="cash-option" className="font-medium">
//                         Cash + Item Option
//                       </Label>
//                       <p className="text-sm text-gray-500">
//                         I'm willing to accept an item of lower value plus cash to make up the difference
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between">
//                 <Button variant="outline" onClick={() => document.querySelector('[data-value="offer"]')?.click()}>
//                   Back
//                 </Button>
//                 <Button className="bg-red-700 hover:bg-red-800">Submit Trade Request</Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   )
// }

import React from 'react'

export default function Page() {
  return (
    <div>Page</div>
  )
}
