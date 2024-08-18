"use client";

import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_sessions?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        {session.payment_status === "paid" ? (
          <>
            <Typography variant="h4">Thank you for subscribing!</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                We have received your payment and your subscription to
                CognitiveCards is now active. You will receive an email with
                your order details shortly.
              </Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                Happy learning!
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4">Payment failed</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Your payment was not successful. Please try again.
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
