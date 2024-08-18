"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import Header from "../components/Header";

export default function Flashcard() {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const flashcardSetDocRef = doc(
        collection(firestore, "users", user.id, "flashcardSets"),
        search
      );

      const flashcardSetDoc = await getDoc(flashcardSetDocRef);
      const { flashcards } = flashcardSetDoc.data();

      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Header />

      <Container maxWidth="md">
        {flashcards.length === 0 && (
          <Box sx={{ textAlign: "center", padding: "100px 0 20px" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Please provide the ID of the flashcard set you want to view.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 6,
                backgroundColor: "#0077B6",
                color: "#FFF",
                "&:hover": { backgroundColor: "#00B4D8" },
              }}
              href="/flashcards"
            >
              View Flashcard Sets
            </Button>
          </Box>
        )}
        <Grid container spacing={3} sx={{ my: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                  <CardContent>
                    <Box
                      className="flip-container"
                      sx={{
                        perspective: "1000px",
                      }}
                    >
                      <Box className="flipper">
                        <Box className="front">
                          <Typography
                            variant="h5"
                            component="div"
                            textAlign={"center"}
                          >
                            {flashcard.front}
                          </Typography>
                        </Box>
                        <Box className="back">
                          <Typography
                            variant="h6"
                            component="div"
                            textAlign={"center"}
                          >
                            {flashcard.back}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
