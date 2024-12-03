import React, { useState, useContext } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import {UserContext} from "../UserContext.jsx";
import { shadows } from '@mui/system';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function PaymentPage() {
  const location = useLocation();
  const { place, checkIn, checkOut, numberOfGuests, name, phone, numberOfNights } = location.state || {};
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  const serviceFee = 100 * numberOfNights;
  const cleaningFee = 200 * numberOfNights;
  const totalBookingFee = numberOfNights * place.price + serviceFee + cleaningFee;

  async function bookThisPlace() {
    if (!user) {
      alert('Please log in to book this place');
      setRedirect('/login');
      return;
    }
    // Replace this with your API call
    const response = await axios.post(`/places/${place.id}/bookings`, {
      checkIn,
      checkOut,
      numberOfGuests: Number(numberOfGuests),
      name,
      phone,
      price: numberOfNights * place.price,
    });

    const bookingId = response.data.id;
    setRedirect(`/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '16px' }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        variant="text"
        href="/previous-page"
        sx={{ marginBottom: 2 }}
      >
        Confirm & pay
      </Button>

      <Grid2 container spacing={2}>
        {/* Left Column */}
        <Grid2 item xs={12} lg={6}>
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Box sx={{ marginBottom: 1, boxShadow: shadows[2] }}>
              <Card variant="outlined" sx={{ padding: 2, display: 'flex', alignItems: 'center', boxShadow: shadows[2], borderRadius: 2 }}>
                <CardMedia
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Mastercard"
                    sx={{
                        width: 40,
                        height: 40,
                        marginRight: 2,
                        objectFit: 'contain',
                        borderRadius: '50%',
                    }}
                />
                <Box>
                  <Typography>Visa ending in 1234</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Expiry 06/2024
                  </Typography>
                </Box>
              </Card>
            </Box>
            <Box sx={{ marginBottom: 1 }}>
              <Card variant="outlined" sx={{ padding: 2, display: 'flex', alignItems: 'center', borderRadius: 2 }}>
              <CardMedia
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    sx={{
                        width: 40,
                        height: 40,
                        marginRight: 2,
                        objectFit: 'contain',
                        borderRadius: '50%',
                    }}
                />
                <Box>
                  <Typography>Mastercard ending in 1234</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Expiry 06/2024
                  </Typography>
                </Box>
              </Card>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AddIcon />}
            >
              Add New Payment
            </Button>
          </Box>

          {/* Cancellation Policy */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>
              Cancellation Policy
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Free cancellation before Nov 30. After that, the reservation is non-refundable.{' '}
              <Link to="/*notfound" style={{ color: '#3f51b5', textDecoration: 'underline' }}>
                Learn more
              </Link>
            </Typography>
          </Box>

          {/* Ground Rules */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Ground rules
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              We ask every guest to remember a few simple things about what makes a great guest.
            </Typography>
            <ul>
              <li>Follow the house rules</li>
              <li>Treat your Host&apos;s home like your own</li>
            </ul>
          </Box>
        </Grid2>

        {/* Right Column */}
        <Grid2 item xs={12} lg={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={place.photos?.[0]}
              alt="Property"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Booking Summary
              </Typography>
              <Box sx={{ marginBottom: 2 }} >
                <Typography>Check-in: {checkIn}</Typography>
                <Typography>Check-out: {checkOut}</Typography>
                <Typography>Guests: {numberOfGuests}</Typography>
              </Box>

              <Divider sx={{ marginY: 2 }} />

              <Typography variant="h6" gutterBottom>
                Pricing Breakdown
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <Typography>Price per night: Ksh {place.price}</Typography>
                <Typography>Number of nights: {numberOfNights}</Typography>
                <Typography>Cleaning Fee: Ksh {cleaningFee}</Typography>
                <Typography>Service Fee: Ksh {serviceFee}</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                  Total before taxes: Ksh {(totalBookingFee * 0.85).toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={bookThisPlace}
              >
                Confirm & Pay Ksh {totalBookingFee}
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}
