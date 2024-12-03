import { Button, Card } from '@mui/material'
import { Image } from 'lucide-react'
import { ArrowLeft, Plus } from 'lucide-react'
import {differenceInCalendarDays} from "date-fns";
import { Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'


export default function PaymentPage() {

    const location = useLocation();
    const { place, checkIn, checkOut, numberOfGuests, name, phone, numberOfNights } = location.state || {};
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    const serviceFee = 100 * numberOfNights;
    const cleaningFee = 200 * numberOfNights;
    const totalBookingFee = (numberOfNights * place.price) + serviceFee + cleaningFee;

    
      async function bookThisPlace() {
        if (!user) {
          alert('Please log in to book this place');
          setRedirect('/login');
          return;
        }
        const response = await axios.post(`/places/${place.id}/bookings`, {
          checkIn,
          checkOut,
          numberOfGuests: Number(numberOfGuests),
          name,
          phone,
          price:numberOfNights * place.price,
        });

        


        const bookingId = response.data.id;
        setRedirect(`/bookings/${bookingId}`);
        }
        if (redirect) {
          return <Navigate to={redirect} />
        }

    
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
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                          alt="Visa"
                          width={32}
                          height={32}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
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
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
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
                <Button variant="outline" className="w-full primary">
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
                <Link to={'/*notfound'} className="text-primary underline">
                  Learn more
                </Link>
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
                  src={place.photos?.[0]}
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
                  <h2 className="text-xl font-semibold mb-4">Your Booking Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Check-in</span>
                      <span>{checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out</span>
                      <span>{checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests</span>
                      <span>{numberOfGuests}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Pricing Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span> {place.price} X {numberOfNights} night</span>
                      <span>Ksh {numberOfNights * place.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning Fee</span>
                      <span>Ksh {cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>Ksh {serviceFee}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <span>Total before taxes</span>
                      <span>Ksh. {(totalBookingFee) * 0.85 } </span>
                    </div>
                  </div>
                </div>

                <button className="w-full primary mt-4" size="lg">
                  Confirm & pay Ksh. {totalBookingFee}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}