"use client";

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
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function Flashcard() {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(firestore, "users"), user.id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcardSets || [];
        console.log(collections);
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <>
      <Header />

      <Container maxWidth="md">
        {flashcards.length === 0 && (
          <Box sx={{ textAlign: "center", padding: "100px 0 20px" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              You haven't created any flashcard sets yet.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 6,
                backgroundColor: "#0077B6",
                color: "#FFF",
                "&:hover": { backgroundColor: "#00B4D8" },
              }}
              href="/generate"
            >
              Create One Now!
            </Button>
          </Box>
        )}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {flashcard.name}
                    </Typography>
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
