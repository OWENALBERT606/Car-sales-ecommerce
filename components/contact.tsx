// "use client"

// import type React from "react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { MapPin, Phone, Mail, Clock, Car, Users, Award, Shield, Send, MessageSquare } from "lucide-react"
// import { useState } from "react"

// export default function AboutComponent() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   })

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle form submission here
//     console.log("Form submitted:", formData)
//     alert("Thank you for your message! We'll get back to you soon.")
//     setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       {/* Header */}
//       <div className="bg-slate-900 text-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">Nagota Motors</h1>
//             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
//               Your trusted partner in finding the perfect vehicle. Quality cars, exceptional service, unbeatable prices.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* About Us Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About Nagota Motors</h2>
//             <p className="text-lg text-slate-600 max-w-3xl mx-auto">
//               With over two decades of experience in the automotive industry, we've built our reputation on trust,
//               quality, and customer satisfaction.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
//             <div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Story</h3>
//               <p className="text-slate-600 mb-4">
//                 Founded in 2003, Nagota Motors began as a small family-owned dealership with a simple mission: to
//                 provide quality pre-owned vehicles at fair prices. Over the years, we've grown to become one of the most
//                 trusted names in the region.
//               </p>
//               <p className="text-slate-600 mb-6">
//                 Our commitment to excellence extends beyond just selling cars. We believe in building lasting
//                 relationships with our customers, offering comprehensive after-sales support, and ensuring every vehicle
//                 meets our rigorous quality standards.
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <Badge variant="secondary" className="px-3 py-1">
//                   <Award className="w-4 h-4 mr-1" />
//                   20+ Years Experience
//                 </Badge>
//                 <Badge variant="secondary" className="px-3 py-1">
//                   <Users className="w-4 h-4 mr-1" />
//                   5000+ Happy Customers
//                 </Badge>
//                 <Badge variant="secondary" className="px-3 py-1">
//                   <Shield className="w-4 h-4 mr-1" />
//                   Quality Guaranteed
//                 </Badge>
//               </div>
//             </div>
//             <div className="bg-slate-100 rounded-lg p-8">
//               <img
//                 src="/placeholder.svg?height=400&width=500"
//                 alt="Nagota Motors Showroom"
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />
//               <h4 className="text-lg font-semibold text-slate-900 mb-2">Our Modern Showroom</h4>
//               <p className="text-slate-600">
//                 Visit our state-of-the-art facility featuring the latest inventory and comfortable customer areas.
//               </p>
//             </div>
//           </div>

//           {/* Services Grid */}
//           <div className="grid md:grid-cols-3 gap-8 mb-16">
//             <Card>
//               <CardHeader>
//                 <Car className="w-12 h-12 text-slate-600 mb-2" />
//                 <CardTitle>Quality Vehicles</CardTitle>
//                 <CardDescription>
//                   Every car undergoes thorough inspection and comes with detailed history reports.
//                 </CardDescription>
//               </CardHeader>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <Shield className="w-12 h-12 text-green-600 mb-2" />
//                 <CardTitle>Extended Warranties</CardTitle>
//                 <CardDescription>
//                   Comprehensive warranty options to give you peace of mind with your purchase.
//                 </CardDescription>
//               </CardHeader>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <Users className="w-12 h-12 text-purple-600 mb-2" />
//                 <CardTitle>Expert Service</CardTitle>
//                 <CardDescription>
//                   Our experienced team provides personalized service to help you find your perfect car.
//                 </CardDescription>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-16 bg-slate-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
//             <p className="text-lg text-slate-600">
//               Ready to find your next vehicle? We're here to help you every step of the way.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Form */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MessageSquare className="w-5 h-5" />
//                   Send us a Message
//                 </CardTitle>
//                 <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="name">Full Name *</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Your full name"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email Address *</Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="your.email@example.com"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="(555) 123-4567"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="subject">Subject *</Label>
//                     <Input
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleInputChange}
//                       required
//                       placeholder="What can we help you with?"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="message">Message *</Label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       required
//                       placeholder="Tell us more about what you're looking for..."
//                       rows={5}
//                     />
//                   </div>
//                   <Button type="submit" className="w-full">
//                     <Send className="w-4 h-4 mr-2" />
//                     Send Message
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>

//             {/* Contact Information */}
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Contact Information</CardTitle>
//                   <CardDescription>Multiple ways to reach us for your convenience.</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <MapPin className="w-5 h-5 text-slate-600 mt-1" />
//                     <div>
//                       <p className="font-semibold">Address</p>
//                       <p className="text-slate-600">
//                         1234 Auto Boulevard
//                         <br />
//                         Motor City, MC 12345
//                         <br />
//                         United States
//                       </p>
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-5 h-5 text-green-600" />
//                     <div>
//                       <p className="font-semibold">Phone</p>
//                       <p className="text-slate-600">(555) 123-CARS (2277)</p>
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-5 h-5 text-red-600" />
//                     <div>
//                       <p className="font-semibold">Email</p>
//                       <p className="text-slate-600">info@nagotamotors.com</p>
//                     </div>
//                   </div>
//                   <Separator />
//                   <div className="flex items-start gap-3">
//                     <Clock className="w-5 h-5 text-purple-600 mt-1" />
//                     <div>
//                       <p className="font-semibold">Business Hours</p>
//                       <div className="text-slate-600 text-sm">
//                         <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
//                         <p>Saturday: 9:00 AM - 6:00 PM</p>
//                         <p>Sunday: 11:00 AM - 5:00 PM</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Location Map */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Our Location</CardTitle>
//                   <CardDescription>Visit our showroom to see our inventory in person.</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="bg-slate-200 rounded-lg h-64 flex items-center justify-center">
//                     <div className="text-center text-slate-600">
//                       <MapPin className="w-12 h-12 mx-auto mb-2" />
//                       <p className="font-semibold">Interactive Map</p>
//                       <p className="text-sm">1234 Auto Boulevard, Motor City, MC 12345</p>
//                       <Button variant="outline" className="mt-2" size="sm">
//                         Get Directions
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-slate-900 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
//           <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
//             Browse our extensive inventory or schedule a test drive today. Our team is ready to help you drive away
//             happy.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
//               <Car className="w-5 h-5 mr-2" />
//               View Inventory
//             </Button>
//             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
//               Schedule Test Drive
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Users,
  Award,
  Shield,
  Send,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function AboutComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen">
      {/* About Us Section */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
              About Nagota Motors
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              With over two decades of experience in the automotive industry,
              we've built our reputation on trust, quality, and customer
              satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-red-700 mb-6">
                Our Story
              </h3>
              <p className="text-slate-800 mb-4">
                Founded in 2003, Nagota Motors began as a small family-owned
                dealership with a simple mission: to provide quality pre-owned
                vehicles at fair prices.
              </p>
              <p className="text-slate-800 mb-6">
                We believe in building lasting relationships, offering
                comprehensive after-sales support, and ensuring every vehicle
                meets our quality standards.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600 text-white">
                  <Award className="w-4 h-4 mr-1" />
                  20+ Years Experience
                </Badge>
                <Badge className="bg-red-600 text-white">
                  <Users className="w-4 h-4 mr-1" />
                  5000+ Happy Customers
                </Badge>
                <Badge className="bg-blue-600 text-white">
                  <Shield className="w-4 h-4 mr-1" />
                  Quality Guaranteed
                </Badge>
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-8 border">
              <img
                src="/1726825864979_how-to-set-up-a-car-showroom-for-your-dealership-6_01J87DF81XF3E6E2DPHE4RC3AR.jpg"
                alt="Nagota Motors Showroom"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold text-slate-900 mb-2">
                Our Modern Showroom
              </h4>
              <p className="text-slate-800">
                Visit our state-of-the-art facility featuring the latest
                inventory and comfortable customer areas.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="">
              <CardHeader>
                <Car className="w-12 h-12 text-slate-600 mb-2" />
                <CardTitle>Quality Vehicles</CardTitle>
                <CardDescription className="text-slate-700">
                  Every car undergoes thorough inspection and comes with
                  detailed history reports.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="">
              <CardHeader>
                <Shield className="w-12 h-12 text-red-600 mb-2" />
                <CardTitle>Extended Warranties</CardTitle>
                <CardDescription className="text-red-700">
                  Comprehensive warranty options to give you peace of mind.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="">
              <CardHeader>
                <Users className="w-12 h-12 text-slate-600 mb-2" />
                <CardTitle>Expert Service</CardTitle>
                <CardDescription className="text-slate-700">
                  Our experienced team provides personalized service to help you
                  find your perfect car.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-red-600">
              Ready to find your next vehicle? We're here to help you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <MessageSquare className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-red-600">
                  Fill out the form and we'll get back within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-slate-800">Contact Info</CardTitle>
                  <CardDescription className="text-slate-600">
                    Multiple ways to reach us.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-slate-700">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>Nakawa, Opposite Oxygas, Kampala, Uganda</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p>(+256) 756259340</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>nagotamotors@gmail.com</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <p>Mon-Sat: 9AM - 7PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle className="text-red-700">Our Location</CardTitle>
                  <CardDescription className="text-red-600">
                    Find us on the map below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden">
                    <iframe
                      title="Banda, Kampala"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.225986465173!2d32.6240347!3d0.3362006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb976de2e3ff%3A0x5e62e4e8c8b22b59!2sBanda%2C%20Kampala!5e0!3m2!1sen!2sug!4v1717420800000!5m2!1sen!2sug"
                      width="100%"
                      height="256"
                      allowFullScreen
                      loading="lazy"
                      className="border-2 border-blue-500"
                      style={{
                        filter: "grayscale(20%)",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Browse our inventory or schedule a test drive today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Link className="flex" href="/shop"><Car className="w-5 h-5 mr-2" />
              View Inventory</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-slate-900 hover:bg-white hover:text-slate-900"
            >
              Schedule Test Drive
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
