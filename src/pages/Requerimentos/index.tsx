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
import { useEffect, useMemo, useRef, useState } from "react";

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
  const [mostrarTopo, setMostrarTopo] = useState(false);
  const fimRef = useRef<HTMLDivElement | null>(null);

  const tipos = useMemo(
    () => Array.from(new Set(requerimentos.map((r) => r.tipo))),
    [requerimentos]
  );

  const filtrados =
    filtroTipo === "todos"
      ? requerimentos
      : requerimentos.filter((r) => r.tipo === filtroTipo);

  const ordenados = useMemo(() => {
    const getTimestamp = (val: string | Date) =>
      val instanceof Date ? val.getTime() : new Date(val).getTime();

    const comResposta = filtrados
      .filter((r) => !!r.resposta)
      .sort((a, b) => getTimestamp(a.enviadoEm) - getTimestamp(b.enviadoEm));

    const semResposta = filtrados
      .filter((r) => !r.resposta)
      .sort((a, b) => getTimestamp(a.enviadoEm) - getTimestamp(b.enviadoEm));

    return [...comResposta, ...semResposta];
  }, [filtrados]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setMostrarTopo(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    if (fimRef.current) observer.observe(fimRef.current);

    return () => observer.disconnect();
  }, [ordenados.length, filtroTipo]);

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
        {ordenados.length === 0 && (
          <Typography>Nenhum requerimento encontrado.</Typography>
        )}
        {ordenados.map((r: Requerimento, index) => (
          <Paper
            key={r.id}
            ref={
              index === ordenados.length - 1 && ordenados.length > 1
                ? fimRef
                : null
            }
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
            <Typography variant="body2">
              {r.nome ? r.email : "Anônimo"}
            </Typography>

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
      {mostrarTopo && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            px: 2,
            py: 1,
            zIndex: 10,
          }}
        >
          <Button
            size="small"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Voltar ao topo
          </Button>
        </Box>
      )}
    </Box>
  );
}
