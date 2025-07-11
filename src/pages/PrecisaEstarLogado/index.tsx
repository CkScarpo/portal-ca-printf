import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Fade,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

export default function PrecisaEstarLogado() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Fade in={show} timeout={600}>
        <Card
          sx={{
            maxWidth: 360,
            mx: "auto",
            textAlign: "center",
            boxShadow: 4,
            borderRadius: 2,
            p: 3,
            bgcolor: "background.paper",
          }}
        >
          <CardContent>
            <LockIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Acesso Restrito
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Você precisa estar logado para visualizar esta seção de
              Requerimentos.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 1 }}
              onClick={() => navigate("/login")}
            >
              Fazer Login
            </Button>
            <Button variant="outlined" fullWidth onClick={() => navigate("/")}>
              Voltar para Início
            </Button>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
}
