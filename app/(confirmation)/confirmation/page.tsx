import Link from "next/link"
import { CheckCircle, Home, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
  return (
    <div className="container max-w-md py-10">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-16 w-16 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>Thank you for your purchase. Your order has been received.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">Order #12345</p>
            <p className="text-muted-foreground">
              We&apos;ve sent a confirmation email to your email address with all the details.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full bg-red-600 hover:bg-red-700">
            <Link href="/profile">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View My Orders
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
