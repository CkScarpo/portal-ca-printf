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
import { register, checkAdmin } from "../../services/authService";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";

export default function Cadastro() {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const setAdmin = useUserStore((s) => s.setAdmin);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !senha) {
      return Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha e-mail e senha.",
      });
    }
    if (senha !== confirma) {
      return Swal.fire({
        icon: "error",
        title: "Senhas não conferem",
        text: "Verifique a senha e a confirmação.",
      });
    }

    try {
      setLoading(true);
      const usuario = await register(email, senha);
      setUser(usuario);

      const isAdm = await checkAdmin(usuario.uid);
      setAdmin(isAdm);

      await Swal.fire({
        icon: "success",
        title: "Bem-vindo!",
        text: "Cadastro realizado com sucesso.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(isAdm ? "/painel-admin" : "/requerimentos");
    } catch (err: any) {
      console.error(err);
      const mensagem = err.code?.includes("auth/email-already-in-use")
        ? "E-mail já cadastrado."
        : err.code?.includes("auth/weak-password") || senha.length < 6
        ? "A senha precisa ter pelo menos 6 caracteres."
        : "Tente novamente mais tarde.";

      await Swal.fire({
        icon: "error",
        title: "Erro no cadastro",
        text: mensagem,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Cadastro
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
          <TextField
            label="Confirme a senha"
            type="password"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            disabled={loading}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleRegister}
            disabled={loading}
          >
            Cadastrar
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Já tenho conta
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
