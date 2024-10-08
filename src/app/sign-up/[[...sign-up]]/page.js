import React from "react";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Header from "@/app/components/Header";

export default function SignUpPage() {
  return (
    <>
      <Header />
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center", my: 4 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <SignUp />
        </Box>
      </Container>
    </>
  );
}
