import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Logo({
  variant = "light",
  size = "md",
  full = true,
  href = "/",
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  href?: string;
}) {
  const imageSize = size === "lg" ? 40 : 24;
  
  if (variant === "light") {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-blue-700 rounded-full p-1 flex items-center justify-center">
          <div className="relative" style={{width: imageSize, height: imageSize}}>
            <Image 
              src="/WhatsApp Image 2025-05-18 at 12.50.06_39af19d6.jpg" 
              alt="Nagota Logo"
              width={imageSize}
              height={imageSize}
              className="rounded-full"
            />
          </div>
        </div>
        <span className={cn("font-bold text-xl text-red-600", size === "lg" && "text-4xl")}>
          Nagota {full && <span className="text-blue-700">Motors</span>}
        </span>
      </div>
    );
  } else {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-white rounded-full p-1 flex items-center justify-center">
          <div className="relative" style={{width: imageSize, height: imageSize}}>
            <Image 
              src="/2.png" 
              alt="Farm connect"
              width={imageSize}
              height={imageSize}
              className="rounded-full"
            />
          </div>
        </div>
        <span className="font-bold text-xl">
          Farm<span className="text-blue-100">Connect</span>
        </span>
      </Link>
    );
  }
}