import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { LuBrainCircuit } from "react-icons/lu";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#03045E" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <LuBrainCircuit /> CognitiveCards
          </Link>
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <Link
            href="/generate"
            passHref
            style={{ textDecoration: "none", color: "white", margin: "0 30px" }}
          >
            Generate
          </Link>
          <Link
            href="/flashcards"
            passHref
            style={{ textDecoration: "none", color: "white", margin: "0 30px" }}
          >
            My FLashcards
          </Link>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
