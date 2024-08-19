import { Box, Container, Grid, Typography } from "@mui/material";
import { FaBook, FaSave, FaTags } from "react-icons/fa";

const FeaturesSection = () => (
  <Box
    sx={{ backgroundColor: "white", textAlign: "center", p: "60px 60px 160px" }}
  >
    <Container>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#03045E",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Features
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <FaBook size={40} color="#00B4D8" />
            <Typography variant="h6" component="h3" gutterBottom>
              Easy to Use
            </Typography>
            <Typography variant="body1">
              Create and customize flashcards quickly and easily from your text
              for effective studying.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <FaSave size={40} color="#00B4D8" />
            <Typography variant="h6" component="h3" gutterBottom>
              Save Your Flashcards
            </Typography>
            <Typography variant="body1">
              Store your flashcard sets securely and access them whenever you
              need to review or update.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <FaTags size={40} color="#00B4D8" />
            <Typography variant="h6" component="h3" gutterBottom>
              Seamless Organization
            </Typography>
            <Typography variant="body1">
              Keep your flashcards neatly organized with intuitive categories
              and tags for easy navigation.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default FeaturesSection;
