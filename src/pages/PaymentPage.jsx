import React, { useState, useContext, useCallback } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import {UserContext} from "../UserContext.jsx";
import { shadows } from '@mui/system';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

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
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function PaymentPage() {
  const location = useLocation();
  const { place, checkIn, checkOut, numberOfGuests, name, phone, numberOfNights } = location.state || {};
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const serviceFee = 100 * numberOfNights;
  const cleaningFee = 200 * numberOfNights;
  const totalBookingFee = numberOfNights * place.price + serviceFee + cleaningFee;

  const pollPaymentStatus = useCallback(async (paymentId) => {
    try {
      const response = await axios.get(`/api/payments/${paymentId}`);
      const status = response.data.status;
      setPaymentStatus(status);

      if (status === 'COMPLETED') {
        alert('Payment completed successfully!');
        setRedirect(`/bookings/${response.data.booking_id}`);
      } else if (status === 'FAILED') {
        alert('Payment failed. Please try again.');
      } else {
        setTimeout(() => pollPaymentStatus(paymentId), 5000);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  }, [setRedirect]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleMpesaPayment = async () => {
    if (!user) {
      alert('Please log in to make a payment');
      setRedirect('/login');
      return;
    }

    setIsProcessing(true);
    try {
      const bookingResponse = await axios.post(`/places/${place.id}/bookings`, {
        checkIn,
        checkOut,
        numberOfGuests: Number(numberOfGuests),
        name,
        phone,
        price: totalBookingFee,
      });

      const bookingId = bookingResponse.data.id;

      const paymentResponse = await axios.post('/payments/mpesa', {
        booking_id: bookingId,
        phone_number: phone,
        amount: totalBookingFee,
      });

      if (paymentResponse.data.ResponseCode === "0") {
        alert("Please check your phone for the STK push and enter your PIN to complete the payment");
        
        if (paymentResponse.data.id) {
          setPaymentId(paymentResponse.data.id);
          pollPaymentStatus(paymentResponse.data.id);
        }
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSelect = (paymentType) => {
    setSelectedPayment(paymentType);
    setPaymentMethod(paymentType);
    if (paymentType === 'mpesa') {
      handleMpesaPayment();
    }
  };

  const renderMpesaCard = () => (
    <Card 
      variant="outlined" 
      sx={{ 
        padding: 2, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2,
        cursor: isProcessing ? 'default' : 'pointer',
        borderRadius: 2,
        borderColor: selectedPayment === 'mpesa' ? 'primary.main' : 'grey.300',
        backgroundColor: selectedPayment === 'mpesa' ? 'action.selected' : 'inherit',
        '&:hover': { borderColor: isProcessing ? 'grey.300' : 'primary.main' },
        opacity: isProcessing ? 0.7 : 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          src="https://upload.wikimedia.org/wikipedia/commons/0/03/M-pesa-logo.png"
          alt="Mpesa"
          sx={{
            width: 40,
            height: 40,
            marginRight: 2,
            objectFit: 'contain',
            borderRadius: '50%',
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography>M-Pesa</Typography>
          {isProcessing && (
            <Typography variant="body2" color="textSecondary">
              Processing payment...
            </Typography>
          )}
          {paymentStatus === 'PENDING' && (
            <Typography variant="body2" color="primary">
              Waiting for your confirmation...
            </Typography>
          )}
        </Box>
      </Box>

      {selectedPayment === 'mpesa' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="M-Pesa Phone Number"
            variant="outlined"
            placeholder="e.g., 254712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isProcessing}
            helperText="Enter phone number in format: 254XXXXXXXXX"
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleMpesaPayment}
            disabled={isProcessing || !phoneNumber}
            sx={{ position: 'relative' }}
          >
            {isProcessing ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress
                  size={24}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-12px',
                  }}
                />
                <Typography
                  sx={{
                    visibility: 'hidden', // Maintains button width during loading
                  }}
                >
                  Processing...
                </Typography>
              </Box>
            ) : (
              'Pay with M-Pesa'
            )}
          </Button>
        </Box>
      )}

      {isProcessing && (
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={40} />
            <Typography variant="body2" sx={{ mt: 2 }}>
              {paymentStatus === 'PENDING' 
                ? 'Waiting for M-Pesa confirmation...'
                : 'Processing payment...'}
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );

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
            <Box sx={{ marginBottom: 1 }}>
              <Card 
                variant="outlined" 
                sx={{ 
                  padding: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  borderRadius: 2,
                  borderColor: selectedPayment === 'visa' ? 'primary.main' : 'grey.300',
                  backgroundColor: selectedPayment === 'visa' ? 'action.selected' : 'inherit',
                  '&:hover': { borderColor: 'primary.main' }
                }}
                onClick={() => handlePaymentSelect('visa')}
              >
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
              <Card 
                variant="outlined" 
                sx={{ 
                  padding: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderRadius: 2,
                  borderColor: selectedPayment === 'mastercard' ? 'primary.main' : 'grey.300',
                  backgroundColor: selectedPayment === 'mastercard' ? 'action.selected' : 'inherit',
                  '&:hover': { borderColor: 'primary.main' }
                }}
                onClick={() => handlePaymentSelect('mastercard')}
              >
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
            <Box sx={{ marginBottom: 1 }}>
              {renderMpesaCard()}
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
