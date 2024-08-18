"use client";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import getStripe from "../utils/get_stripe";
import { FaCheckCircle } from "react-icons/fa";

const handleSubscription = async () => {
  const checkoutSession = await fetch("/api/checkout_sessions", {
    method: "POST",
    headers: { origin: "http://localhost:3000" },
  });

  const textResponse = await checkoutSession.text();
  console.log("Raw response:", textResponse);

  const checkoutSessionJson = JSON.parse(textResponse);

  console.log(checkoutSessionJson);

  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  });

  if (error) {
    console.warn(error.message);
  }
};

const PricingSection = () => (
  <Box
    sx={{
      textAlign: "center",
      backgroundColor: "#CAF0F8",
      p: "160px 60px 160px",
    }}
  >
    <Typography
      variant="h4"
      component="h2"
      sx={{
        fontWeight: "bold",
        color: "#03045E",
        textTransform: "uppercase",
        marginBottom: 8,
      }}
      gutterBottom
    >
      Pricing Plans
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            p: "40px 0",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Basic Plan
            </Typography>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              Free Forever
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <FaCheckCircle style={{ marginRight: "5px" }} />
              50 flashcard generation credits
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <FaCheckCircle style={{ marginRight: "5px" }} />
              Save up to 3 flashcard sets
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 6,
                borderColor: "#03045E",
                color: "#03045E",
                "&:hover": { borderColor: "#0077B6", color: "#0077B6" },
              }}
              href="/generate"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            p: "40px 0",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Pro Plan
            </Typography>
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
              $3.99/month
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <FaCheckCircle style={{ marginRight: "5px" }} />
              Unlimited flashcard generation
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <FaCheckCircle style={{ marginRight: "5px" }} />
              Unlimited flashcard sets saves
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 6,
                backgroundColor: "#03045E",
                color: "#FFF",
                "&:hover": { backgroundColor: "#0077B6" },
              }}
              onClick={handleSubscription}
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default PricingSection;
