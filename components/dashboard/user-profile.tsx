import { Button } from '@/components/ui/button'
import { authOptions } from '@/config/auth';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input';
import { User } from 'lucide-react';

export default async function UserProfile({session}:{session:any}) {
  
  return (
    <div>
      <div className="bg-white rounded-md p-6 shadow-sm">
              <h1 className="text-xl font-bold mb-6">My Profile</h1>
      
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                   <Image src={session?.user?.image} alt="fdf" width={200} height={200}/>
                  </div>
                  <Button className="bg-red-700 hover:bg-red-800 w-full md:w-auto">Change Photo</Button>
                </div>
      
                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{session?.user?.firstName}</label>
                      <Input defaultValue={session?.user?.firstName} className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{session?.user?.lastName}</label>
                      <Input defaultValue={session?.user?.lastName} className="w-full" />
                    </div>
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input defaultValue={session.user.email} className="w-full" />
                  </div>
      
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{session.user.phone}</label>
                    <Input defaultValue="+256 700 123 456" className="w-full" />
                  </div>
      
                  <div className="pt-4">
                    <Button className="bg-red-700 hover:bg-red-800">Save Changes</Button>
                  </div>
                </div>
              </div>
      
              <div className="mt-8 pt-6 border-t">
                <h2 className="text-lg font-medium mb-4">Password & Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <Input type="password" className="w-full md:w-1/2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <Input type="password" className="w-full md:w-1/2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <Input type="password" className="w-full md:w-1/2" />
                  </div>
                  <div className="pt-2">
                    <Button className="bg-red-700 hover:bg-red-800">Update Password</Button>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}
