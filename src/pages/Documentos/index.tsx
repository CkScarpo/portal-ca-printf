import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

type Documento = {
  titulo: string;
  categoria: string;
  descricao?: string;
  url: string;
};

const documentos: Documento[] = [
  {
    titulo: "Estatuto do Centro Acadêmico",
    categoria: "Estatuto",
    descricao: "Documento que define as diretrizes do CA Printf.",
    url: "https://drive.google.com/drive/folders/1r6YdDouxbS9ufukukPLIOgT_jipDV3Pc?usp=sharing",
  },
  {
    titulo: "Atas de Reunião",
    categoria: "Ata",
    descricao: "Registro oficial das decisões tomadas em nossas reuniões.",
    url: "https://drive.google.com/drive/folders/100YPjKN46QoYr1egkX_nn0Ij-vyWh9OQ?usp=sharing",
  },
  {
    titulo: "Eventos do Centro Acadêmico",
    categoria: "Eventos",
    descricao: "Detalhes dos eventos promovidos pelo CA Printf",
    url: "https://drive.google.com/drive/folders/1nPlNboYQIcKFXVDh0FqaV5zY7iKJFsDH?usp=sharing",
  },
  {
    titulo: "Galeria de Fotos",
    categoria: "Fotos",
    descricao: "Registros fotográficos de atividades e eventos.",
    url: "https://drive.google.com/drive/folders/1ULX1Sju8O2nuEkRXyjyxoE8-lHzmyp8m?usp=sharing",
  },
  {
    titulo: "Vídeos do Centro Acadêmico",
    categoria: "Videos",
    descricao: "Vídeos com palestras, workshops e momentos marcantes.",
    url: "https://drive.google.com/drive/folders/1InHSlN88aa3-FVJHapZqG4KiDLnNCbgM?usp=sharing",
  },
];

export default function Documentos() {
  const [filtro, setFiltro] = useState<string>("todos");

  const categorias = [...new Set(documentos.map((d) => d.categoria))];

  const filtrados =
    filtro === "todos"
      ? documentos
      : documentos.filter((d) => d.categoria === filtro);

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Documentos do Centro Acadêmico 📄
      </Typography>
      <Typography color="text.secondary" mb={3} maxWidth={700}>
        Acesse aqui os documentos mais importantes do CA, como estatutos, atas
        de reunião e comunicados oficiais.
      </Typography>

      <ToggleButtonGroup
        value={filtro}
        exclusive
        onChange={(_, value) => value && setFiltro(value)}
        sx={{ mb: 3, flexWrap: "wrap" }}
      >
        <ToggleButton value="todos">Todos</ToggleButton>
        {categorias.map((cat) => (
          <ToggleButton key={cat} value={cat}>
            {cat}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Stack spacing={3}>
        {filtrados.map((doc) => (
          <Card key={doc.titulo} variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {doc.titulo}
              </Typography>
              {doc.descricao && (
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {doc.descricao}
                </Typography>
              )}
              <Button
                variant="outlined"
                component={Link}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visualizar
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
