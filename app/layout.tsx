import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import CartProviders from "@/redux/CartProviders";
// import FooterBanner from "@/components/Footer";
const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nagota Motors",
  description: "Join Nagota Motors",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProviders>
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ReactQueryProvider>
        <Providers>{children}</Providers>
      </ReactQueryProvider>
        
      </body>
    </html>
    </CartProviders>
  );
}
