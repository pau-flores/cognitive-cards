import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { PiCardsThree } from "react-icons/pi";
import { LuBrainCircuit } from "react-icons/lu";

const HeroSection = () => (
  <>
    <Box
      sx={{
        backgroundColor: "#03045E",
        padding: "100px 60px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: "bold", color: "white" }}
              gutterBottom
            >
              Welcome to CognitiveCards
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "semi-bold", color: "white" }}
              gutterBottom
            >
              Unlock Your Potential with AI-Generated Flashcards for Smarter
              Learning.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                mr: 2,
                backgroundColor: "#CAF0F8",
                color: "#03045E",
                "&:hover": { backgroundColor: "#90E0EF" },
              }}
              href="/generate"
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <LuBrainCircuit
              style={{
                width: "140px",
                height: "auto",
                color: "white",
              }}
            />
            <PiCardsThree
              style={{
                width: "140px",
                height: "auto",
                color: "white",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <path
        fill="#03045E"
        fillOpacity="1"
        d="M0,256L80,256C160,256,320,256,480,234.7C640,213,800,171,960,160C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      />
    </Box>
  </>
);

export default HeroSection;
