import { Box, Container, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import banner from "../assets/bannerLogin.png";

export default function AuthLayout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <Outlet />
            <Button onClick={() => navigate("/")} variant="text" size="small">
              ← Voltar para Home
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
