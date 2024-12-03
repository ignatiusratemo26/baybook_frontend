import { Button, Card } from '@mui/material'
import { Image } from 'lucide-react'
import { ArrowLeft, Plus } from 'lucide-react'
// import Link  from 'react-router-dom'   

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <div className="container py-6">
        <Button
          href="/previous-page"
          className="inline-flex items-center text-sm text-muted-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Confirm & pay
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Saved Card</h3>
                
                {/* PayPal Card */}
                <Card className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8">
                        <Image
                          src="/placeholder.svg"
                          alt="PayPal"
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Paypal ending in 1234</p>
                        <p className="text-sm text-muted-foreground">Expiry 06/2024</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Mastercard */}
                <Card className="p-4 border rounded-lg border-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8">
                        <Image
                          src="/placeholder.svg"
                          alt="Mastercard"
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard ending in 1234</p>
                        <p className="text-sm text-muted-foreground">Expiry 06/2024</p>
                      </div>
                    </div>
                    <div className="h-4 w-4 rounded-full bg-primary/20">
                      <div className="h-2 w-2 translate-x-1 translate-y-1 rounded-full bg-primary" />
                    </div>
                  </div>
                </Card>

                {/* Add New Payment Button */}
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Payment
                </Button>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Cancellation policy</h2>
              <p className="text-sm text-muted-foreground">
                Free cancellation before Nov 30.
              </p>
              <p className="text-sm text-muted-foreground">
                After that, the reservation is non-refundable.{" "}
                <Button href="#" className="text-primary underline">
                  Learn more
                </Button>
              </p>
            </div>

            {/* Ground Rules */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Ground rules</h2>
              <p className="text-sm text-muted-foreground mb-4">
                We ask every guest to remember a few simple things about what makes
                a great guest.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  • Follow the house rules
                </li>
                <li className="flex items-center">
                  • Treat your Host's home like your own
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <Card>
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg"
                  alt="Property"
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Place to stay</p>
                  <p className="text-sm">Toronto Condo</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Your Trip Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Check-in</span>
                      <span>Fri, Dec 01</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out</span>
                      <span>Tue, Dec 05</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests</span>
                      <span>04</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Pricing Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>$30 X 1 night</span>
                      <span>$30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning Fee</span>
                      <span>$10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>$5</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <span>Total before taxes</span>
                      <span>$45</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Confirm & pay $185
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}