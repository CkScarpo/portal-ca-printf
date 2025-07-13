import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { observeUser, checkAdmin } from "./services/authService";
import { useUserStore } from "./store/userStore";
import { CssBaseline, CircularProgress, Box } from "@mui/material";

export default function Root() {
  const setUser = useUserStore((s) => s.setUser);
  const setAdmin = useUserStore((s) => s.setAdmin);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = observeUser(async (fbUser) => {
      setUser(fbUser);
      if (fbUser) {
        const isAdm = await checkAdmin(fbUser.uid);
        setAdmin(isAdm);
      } else {
        setAdmin(false);
      }
      setAuthReady(true);
    });
    return unsubscribe;
  }, [setUser, setAdmin]);

  if (!authReady) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />
      <App />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
