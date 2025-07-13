/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { useUserStore } from "../../store/userStore";
import { changePassword } from "../../services/authService";
import Swal from "sweetalert2";

export function MeuPerfil() {
  const { user } = useUserStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) return null;

  const isGoogleUser = user.providerData.some(
    (pd) => pd.providerId === "google.com"
  );

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Erro",
        text: "As senhas não conferem",
      });
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      return Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Senha alterada com sucesso",
      });
    } catch (err: any) {
      return Swal.fire({
        icon: "error",
        title: "Erro",
        text: err?.message || "Falha ao alterar senha",
      });
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: 1, maxWidth: 600, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Meu Perfil
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="E-mail (login)"
            value={user.email || ""}
            disabled
            fullWidth
          />
        </Box>

        {isGoogleUser ? (
          <Box sx={{ mt: 4 }}>
            <Typography color="textSecondary">
              Você está conectado via Google. Para alterar sua senha, gerencie-a
              nas configurações da sua conta Google.
            </Typography>
            <MuiLink
              href="https://myaccount.google.com/intro/signinoptions/password"
              target="_blank"
              rel="noopener"
            >
              Alterar senha na conta Google
            </MuiLink>
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Alterar senha
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Senha atual"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
              />
              <TextField
                label="Nova senha"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
              />
              <TextField
                label="Confirmar nova senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
              >
                Salvar nova senha
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
