"use client";

import { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Generate() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(firestore, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(firestore);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Box sx={{ padding: "80px 0 20px" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ marginBottom: 4 }}
            gutterBottom
          >
            Generate Flashcards
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#0077B6",
              "&:hover": { backgroundColor: "#00B4D8" },
            }}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Box>

        {loading && (
          <Box>
            <Typography
              variant="body1"
              fontWeight={"bold"}
              sx={{ textAlign: "center" }}
            >
              Generating flashcards...
            </Typography>
          </Box>
        )}

        {flashcards.length > 0 && (
          <>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
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
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box
              sx={{
                padding: "60px 0 80px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SignedIn>
                <Button
                  variant="contained"
                  onClick={handleOpenDialog}
                  sx={{
                    backgroundColor: "#0077B6",
                    "&:hover": { backgroundColor: "#00B4D8" },
                  }}
                >
                  Save Flashcards
                </Button>
              </SignedIn>
              <SignedOut>
                <Alert variant="filled" severity="error" sx={{ mt: 2, mb: 8 }}>
                  Please{" "}
                  <Link href="/sign-in" style={{ color: "inherit" }}>
                    login
                  </Link>{" "}
                  to save your flashcards, or{" "}
                  <Link href="/sign-up" style={{ color: "inherit" }}>
                    sign up
                  </Link>{" "}
                  if you need an account.
                </Alert>
              </SignedOut>
            </Box>
          </>
        )}

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Save Flashcard Set</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcard set.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Set Name"
              type="text"
              fullWidth
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={saveFlashcards} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
