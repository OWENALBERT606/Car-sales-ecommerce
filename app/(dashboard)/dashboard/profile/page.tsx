import UserProfile from '@/components/dashboard/user-profile'
import { authOptions } from '@/config/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <div>
      <UserProfile session={session}/>
    </div>
  )
}
