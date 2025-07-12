import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useUserStore } from "../../store/userStore";
import {
  enviarRequerimento,
  type NovoRequerimento,
} from "../../services/requerimentoService";
import Swal from "sweetalert2";

interface Props {
  open: boolean;
  onClose: () => void;
  reload: () => void;
}

const tipos = ["Sugestão", "Reclamação", "Solicitação", "Elogio", "Outro"];

export default function ModalNovoRequerimento({
  open,
  onClose,
  reload,
}: Props) {
  const { user } = useUserStore();
  const [form, setForm] = useState<Omit<NovoRequerimento, "uid" | "email">>({
    nome: "",
    tipo: "",
    assunto: "",
    mensagem: "",
  });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setErro("");
    if (!form.tipo || !form.assunto || !form.mensagem) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (!user) {
      setErro("Usuário não autenticado.");
      return;
    }

    setEnviando(true);
    try {
      await enviarRequerimento({ uid: user.uid, email: user!.email!, ...form });
      onClose();
      await Swal.fire({
        icon: "success",
        title: "Requerimento enviado",
        text: "Seu requerimento foi enviado com sucesso!",
      });
      reload();
      setForm({ nome: "", tipo: "", assunto: "", mensagem: "" });
    } catch {
      setErro("Erro ao enviar requerimento. Tente novamente.");
      await Swal.fire({
        icon: "error",
        title: "Erro ao enviar",
        text: "Não foi possível enviar o requerimento. Tente novamente mais tarde.",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Novo Requerimento</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          O campo Nome é opcional. Para enviar anonimamente, deixe-o em branco.
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Nome (opcional)"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Maria Silva ou deixe em branco"
          />
          <TextField
            select
            label="Tipo de requerimento *"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          >
            {tipos.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Assunto *"
            name="assunto"
            value={form.assunto}
            onChange={handleChange}
          />
          <TextField
            label="Mensagem *"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            multiline
            rows={4}
          />
          {erro && <Alert severity="error">{erro}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={enviando}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
