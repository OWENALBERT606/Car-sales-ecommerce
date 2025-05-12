// "use client"
import FarmForm from "@/components/Forms/Farm-form";
import LocationForm from "@/components/Forms/Location-form";
import { authOptions } from "@/config/auth";
import { useFarms } from "@/hooks/useFarms";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  
  return (
    <div className="p-8">
      <LocationForm/>
    </div>
  );
}
