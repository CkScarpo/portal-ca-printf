import {
  Box,
  Typography,
  Button,
  Paper,
  Skeleton,
  Stack,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useUserStore } from "../../store/userStore";
import {
  useRequerimentos,
  type Requerimento,
} from "../../hooks/useRequerimentos";
import ModalNovoRequerimento from "../../components/ModalNovoRequerimento";
import ResponderRequerimento from "../../components/ResponderRequerimento";
import { useMemo, useState } from "react";

export default function Requerimentos() {
  const theme = useTheme();
  const { loading, isAdmin } = useUserStore();
  const {
    requerimentos,
    carregando,
    aberto,
    abrirModal,
    fecharModal,
    carregarRequerimentos,
  } = useRequerimentos();

  const [filtroTipo, setFiltroTipo] = useState<string>("todos");

  const tipos = useMemo(
    () => Array.from(new Set(requerimentos.map((r) => r.tipo))),
    [requerimentos]
  );

  const filtrados =
    filtroTipo === "todos"
      ? requerimentos
      : requerimentos.filter((r) => r.tipo === filtroTipo);

  if (loading || carregando) return <Skeleton height={200} />;

  return (
    <Box maxWidth={900} mx="auto">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Requerimentos 📬
      </Typography>

      <Typography mb={2}>
        Você pode enviar anonimamente deixando o campo “Nome” em branco.
        Solicitamos respeito: conteúdos violentos, ofensivos ou inapropriados
        poderão ser removidos pelo CA Printf a critério da equipe.
      </Typography>

      {!isAdmin && (
        <Button variant="contained" onClick={abrirModal} sx={{ mb: 3 }}>
          Novo requerimento
        </Button>
      )}
      <ModalNovoRequerimento
        open={aberto}
        onClose={fecharModal}
        reload={carregarRequerimentos}
      />

      <Typography variant="h6" gutterBottom>
        {isAdmin ? "Todos os requerimentos" : "Meus requerimentos"}
      </Typography>
      {filtrados.length > 0 && (
        <>
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
        </>
      )}
      <Stack spacing={2}>
        {filtrados.length === 0 && (
          <Typography>Nenhum requerimento encontrado.</Typography>
        )}
        {filtrados.map((r: Requerimento) => (
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
            <Typography mb={1}>
              <strong>Tipo: </strong> {r.tipo}
            </Typography>
            <Typography mb={1}>
              <strong>Assunto: </strong> {r.assunto}
            </Typography>
            <Typography mb={1}>
              <strong>Descrição: </strong> {r.mensagem}
            </Typography>
            <Typography variant="body2">Anônimo</Typography>

            {r.resposta ? (
              <Paper
                sx={{
                  p: 1,
                  mt: 1,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                }}
              >
                <Typography variant="body2">
                  <strong>Resposta:</strong> {r.resposta}
                </Typography>
              </Paper>
            ) : isAdmin ? (
              <ResponderRequerimento
                requerimento={r}
                onRespondido={carregarRequerimentos}
              />
            ) : (
              <Typography variant="subtitle1" mt={1}>
                Aguardando resposta
              </Typography>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
