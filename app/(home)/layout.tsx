import PromoBanner from "@/components/frontend/PromoBanner";
import MainNav from "@/components/frontend/shop/main-nav";
import SecNavigation from "@/components/frontend/shop/secondary-navigation";
import SiteFooter from "@/components/frontend/shop/site-footer";
import TopNavigationBar from "@/components/frontend/shop/top-navigation";
import Footer from "@/components/frontend/site-footer";
import SiteHeader from "@/components/frontend/site-header";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white">
       <TopNavigationBar/>
       <MainNav session={session}/>
      <SecNavigation/>
      <div className="hidden">
      <SiteHeader session={session} />
      </div>
      {children}
      <SiteFooter/>
    </div>
  );
}
