// src/pages/Login.tsx
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, login, checkAdmin } from "../../services/authService";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const setAdmin = useUserStore((s) => s.setAdmin);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const usuario = await loginWithGoogle();
      setUser(usuario);
      const isAdm = await checkAdmin(usuario.uid);
      setAdmin(isAdm);
      navigate(isAdm ? "/painel-admin" : "/requerimentos");
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível fazer login com Google.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!email || !senha) {
      return Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha e-mail e senha.",
      });
    }
    setLoading(true);
    try {
      const usuario = await login(email, senha);
      setUser(usuario);
      const isAdm = await checkAdmin(usuario.uid);
      setAdmin(isAdm);
      navigate(isAdm ? "/painel-admin" : "/requerimentos");
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Falha no login",
        text: "E-mail ou senha inválidos.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Entrar
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleAdminLogin}
            disabled={loading}
          >
            Entrar
          </Button>

          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Button
              variant="text"
              onClick={() => navigate("/esqueci-senha")}
              disabled={loading}
            >
              Esqueci minha senha
            </Button>
            <Button
              variant="text"
              onClick={() => navigate("/cadastro")}
              disabled={loading}
            >
              Ainda não tem conta? Cadastre-se
            </Button>
          </Stack>

          <Divider>ou</Divider>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Entrar com Google
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
