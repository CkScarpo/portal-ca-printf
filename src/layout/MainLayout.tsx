import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useObserveUser } from "../hooks/useObserveUser";

export default function MainLayout() {
  useObserveUser();
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        color: "text.primary",
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ pt: "80px" }}>
        <Outlet />
      </Container>
    </Box>
  );
}
