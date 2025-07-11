/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "../../services/authService";
import { useState } from "react";

export default function EsqueciSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "E-mail necessário",
        text: "Digite seu e-mail para receber o link de recuperação.",
      });
    }
    try {
      setLoading(true);
      await resetPassword(email);
      await Swal.fire({
        icon: "success",
        title: "Link enviado",
        text: "Verifique sua caixa de entrada.",
      });
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível enviar o link. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Recuperar senha
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="E-mail cadastrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleReset}
            disabled={loading}
          >
            Enviar link de recuperação
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Voltar ao login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
