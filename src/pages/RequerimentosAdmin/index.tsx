import {
  Box,
  Typography,
  Paper,
  Stack,
  Skeleton,
  useTheme,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from "@mui/material";
import { useUserStore } from "../../store/userStore";
import {
  useRequerimentos,
  type Requerimento,
} from "../../hooks/useRequerimentos";
import ResponderRequerimento from "../../components/ResponderRequerimento";
import {
  deletarRequerimento,
  editarRespostaRequerimento,
} from "../../services/requerimentoService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useMemo, useState } from "react";

export default function RequerimentosAdmin() {
  const theme = useTheme();
  const { user, loading, isAdmin } = useUserStore();
  const { requerimentos, carregando, carregarRequerimentos } =
    useRequerimentos();

  const [filtroTipo, setFiltroTipo] = useState<string>("todos");

  const tipos = useMemo(
    () => Array.from(new Set(requerimentos.map((r) => r.tipo))),
    [requerimentos]
  );

  const filtrados =
    filtroTipo === "todos"
      ? requerimentos
      : requerimentos.filter((r) => r.tipo === filtroTipo);

  const ordenados = useMemo(() => {
    const semResposta = filtrados.filter((r) => !r.resposta);
    const comResposta = filtrados.filter((r) => !!r.resposta);

    const sortByDateAsc = (a: Requerimento, b: Requerimento) =>
      new Date(a.enviadoEm).getTime() - new Date(b.enviadoEm).getTime();

    semResposta.sort(sortByDateAsc);
    comResposta.sort(sortByDateAsc);

    return [...semResposta, ...comResposta];
  }, [filtrados]);

  const handleEdit = async (r: Requerimento) => {
    const { value } = await Swal.fire<string>({
      title: "Editar resposta",
      input: "textarea",
      inputLabel: "Resposta",
      inputValue: r.resposta || "",
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
    });
    if (!value) return;
    try {
      await editarRespostaRequerimento(r.id, value);
      Swal.fire("Atualizado!", "Resposta atualizada com sucesso.", "success");
      carregarRequerimentos();
    } catch {
      Swal.fire("Erro", "Não foi possível editar a resposta.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação removerá o requerimento permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: theme.palette.error.main,
    });

    if (result.isConfirmed) {
      try {
        await deletarRequerimento(id);
        await Swal.fire({
          title: "Deletado!",
          text: "O requerimento foi removido.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        carregarRequerimentos();
      } catch {
        Swal.fire({
          title: "Erro",
          text: "Não foi possível deletar. Tente novamente.",
          icon: "error",
        });
      }
    }
  };

  if (loading || carregando) return <Skeleton height={200} />;

  if (!user || !isAdmin)
    return (
      <Typography>Você não tem permissão para acessar esta página.</Typography>
    );

  return (
    <Box maxWidth={900} mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Painel de Requerimentos 📋
      </Typography>

      <Typography mb={2}>
        Use o filtro abaixo para selecionar o tipo de requerimento.
      </Typography>

      <ToggleButtonGroup
        value={filtroTipo}
        exclusive
        onChange={(_, value) => value && setFiltroTipo(value)}
        sx={{ mb: 3, flexWrap: "wrap" }}
      >
        <ToggleButton value="todos">Todos</ToggleButton>
        {tipos.map((tipo) => (
          <ToggleButton key={tipo} value={tipo}>
            {tipo}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Stack spacing={2}>
        {ordenados.length === 0 && (
          <Typography>Nenhum requerimento encontrado.</Typography>
        )}
        {ordenados.map((r: Requerimento) => (
          <Paper
            key={r.id}
            sx={{
              p: 2,
              overflow: "hidden",
              wordBreak: "break-word",
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2" mb={1}>
                  <strong>Tipo: </strong>
                  {r.tipo}
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Assunto: </strong>
                  {r.assunto}
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Descrição: </strong>
                  {r.mensagem}
                </Typography>
                <Typography variant="body2">
                  <strong>Enviado por:</strong> {r.nome ? r.email : "Anônimo"}
                </Typography>
              </Box>
              <Box>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(r.id)}
                  sx={{
                    background: "none",

                    "&:hover": {
                      background: "none",
                      "& .MuiSvgIcon-root": {
                        color: (theme) => theme.palette.error.dark,
                        transform: "scale(1.1)",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      transition: "transform 0.2s, color 0.2s",
                    },
                  }}
                />
              </Box>
            </Box>
            {r.resposta ? (
              <Paper
                sx={{
                  p: 1,
                  mt: 1,
                  display: "flex",
                  alignContent: "space-between",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                }}
              >
                <Typography variant="body2">
                  <strong>Resposta:</strong> {r.resposta}
                </Typography>
                <IconButton
                  size="small"
                  color="warning"
                  onClick={() => handleEdit(r)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Paper>
            ) : (
              <ResponderRequerimento
                requerimento={r}
                onRespondido={carregarRequerimentos}
              />
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
