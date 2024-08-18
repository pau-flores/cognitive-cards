import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "white" }}>
            Flashcard SaaS
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
            href="/flashcards"
            passHref
            style={{ textDecoration: "none", color: "white", margin: "0 20px" }}
          >
            My Flashcards
          </Link>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
