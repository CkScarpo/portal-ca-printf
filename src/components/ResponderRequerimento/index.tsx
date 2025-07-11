import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import type { Requerimento } from "../../hooks/useRequerimentos";
import { responderRequerimento } from "../../services/requerimentoService";
import Swal from "sweetalert2";

interface Props {
  requerimento: Requerimento;
  onRespondido: () => void;
}

export default function ResponderRequerimento({
  requerimento,
  onRespondido,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [resposta, setResposta] = useState(requerimento.resposta || "");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (!resposta.trim()) {
      setErro("A resposta não pode ficar em branco.");
      return Swal.fire({
        icon: "error",
        title: "Resposta em branco",
        text: "Por favor, escreva algo antes de salvar.",
      });
    }
    setSalvando(true);
    try {
      await responderRequerimento(requerimento.id, resposta);
      onRespondido();
      handleClose();
      await Swal.fire({
        icon: "success",
        title: "Resposta enviada!",
        showConfirmButton: false,
        timer: 1200,
      });
      onRespondido();
      handleClose();
    } catch {
      setErro("Erro ao salvar resposta. Tente novamente.");
      Swal.fire({
        icon: "error",
        title: "Falha ao salvar",
        text: "Ocorreu um erro ao salvar a resposta. Tente novamente.",
      });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <>
      {requerimento.resposta ? null : (
        <Button size="small" onClick={handleOpen}>
          Responder
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          overflow: "hidden",
          wordBreak: "break-word",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Responder Requerimento</DialogTitle>
        <DialogContent>
          <Typography variant="body2" mb={2}>
            <strong>Tipo: </strong> {requerimento.tipo}
          </Typography>
          <Typography variant="body2" mb={2}>
            <strong>Assunto: </strong> {requerimento.assunto}
          </Typography>
          <Typography variant="body2" mb={2}>
            <strong>Descrição: </strong> {requerimento.mensagem}
          </Typography>
          <Typography variant="body2" mb={2}>
            <strong>Enviado por: </strong>{" "}
            {requerimento.email ? requerimento.email : "Anônimo"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Sua resposta *"
              multiline
              rows={4}
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
            />
            {erro && <Alert severity="error">{erro}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={salvando}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={salvando}>
            {salvando ? "Salvando…" : "Salvar resposta"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
