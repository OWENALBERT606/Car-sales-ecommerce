// "use client"
import FarmForm from "@/components/Forms/Farm-form";
import { authOptions } from "@/config/auth";
import { useFarms } from "@/hooks/useFarms";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  
    const session = await getServerSession(authOptions);
  return (
    <div className="p-8">
      <FarmForm session={session}/>
    </div>
  );
}
