import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Stack,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SendIcon from "@mui/icons-material/Send";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const atalhos = [
    {
      titulo: "Informações do curso BSI",
      icone: <SchoolIcon fontSize="large" />,
      destino:
        "https://www.ifnmg.edu.br/cursos/272-portal/arinos/arinos-cursos-superiores/bacharelado-em-sistemas-de-informacao",
    },
    {
      titulo: "Carreiras em TI",
      icone: <WorkIcon fontSize="large" />,
      destino: "/carreiras",
    },
    {
      titulo: "Documentos do CA Printf",
      icone: <DocumentScannerIcon fontSize="large" />,
      destino: "/documentos",
    },
    {
      titulo: "Requerimentos ao CA Printf",
      icone: <SendIcon fontSize="large" />,
      destino: "/requerimentos",
    },
  ];

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Bem-vindo ao Portal do Centro Acadêmico 👋
      </Typography>
      <Typography color="text.secondary" mb={4} maxWidth={600}>
        Encontre informações do curso, explore documentos do centro acadêmico,
        envie requerimentos e conheça as possibilidades de carreira.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        justifyContent="flex-start"
      >
        {atalhos.map((item) => (
          <Card
            key={item.titulo}
            sx={{
              width: { xs: "100%", sm: 240 },
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardActionArea
              onClick={() => {
                if (item.destino.startsWith("http")) {
                  window.open(item.destino, "_blank");
                } else {
                  navigate(item.destino);
                }
              }}
              sx={{ height: "100%" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {item.icone}
                <Typography variant="subtitle1" textAlign="center" mt={1}>
                  {item.titulo}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
