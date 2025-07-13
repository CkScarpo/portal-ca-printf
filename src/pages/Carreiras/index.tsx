import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  List,
  ListItem,
  ListItemText,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

type Carreira = {
  titulo: string;
  trilha: string;
  oQueFaz: string;
  perfil: string[];
  expectativas: string[];
  comecar: string[];
  cursos?: { nome: string; url: string }[];
  canais?: { nome: string; url: string }[];
};

const carreiras: Carreira[] = [
  {
    titulo: "Desenvolvedor(a) Front-End",
    trilha: "Desenvolvimento",
    oQueFaz:
      "Cria a parte visual que o usuário interage, como páginas, botões e animações. Trabalha com HTML, CSS, JavaScript e frameworks como React, Vue e Angular.",
    perfil: [
      "Criativo e atento a detalhes visuais",
      "Gosta de design e experiência do usuário",
      "Interessado em interfaces e usabilidade",
    ],
    expectativas: [
      "Dominar HTML, CSS e JavaScript",
      "Conhecer frameworks modernos (React, Vue, Angular)",
      "Ser capaz de criar interfaces responsivas e acessíveis",
    ],
    comecar: [
      "Estudar HTML, CSS e JavaScript",
      "Aprender React ou Vue",
      "Criar sites e páginas interativas",
      "Publicar projetos no GitHub",
    ],
    cursos: [
      {
        nome: "Curso em Vídeo – HTML, CSS, JS",
        url: "https://www.cursoemvideo.com",
      },
      {
        nome: "React para Iniciantes – Rocketseat",
        url: "https://www.rocketseat.com.br",
      },
    ],
    canais: [
      {
        nome: "Gustavo Guanabara",
        url: "https://www.youtube.com/user/cursosemvideo",
      },
      {
        nome: "Sujeito Programador",
        url: "https://www.youtube.com/c/SujeitoProgramador",
      },
    ],
  },
  {
    titulo: "Desenvolvedor(a) Back-End",
    trilha: "Desenvolvimento",
    oQueFaz:
      "Constrói a parte lógica dos sistemas, como autenticação, comunicação com banco de dados e regras de negócio. Trabalha com linguagens como Python, Java, Node.js e bancos como PostgreSQL, MongoDB.",
    perfil: [
      "Lógico e orientado a detalhes",
      "Gosta de resolver problemas complexos",
      "Interesse em arquitetura de sistemas e bancos de dados",
    ],
    expectativas: [
      "Dominar uma linguagem back-end",
      "Conhecer bancos de dados relacionais e NoSQL",
      "Ser capaz de criar APIs e serviços escaláveis",
    ],
    comecar: [
      "Aprender Python, Java ou Node.js",
      "Estudar bancos de dados e REST APIs",
      "Criar APIs simples e testar com Postman",
      "Publicar projetos no GitHub",
    ],
    cursos: [
      {
        nome: "Python do Zero – Hashtag Programação",
        url: "https://youtube.com/@hashtagprogramacao",
      },
      { nome: "Java Básico – Alura", url: "https://www.alura.com.br" },
    ],
    canais: [
      {
        nome: "Programador BR",
        url: "https://www.youtube.com/c/Programadorbr",
      },
      {
        nome: "Curso em Vídeo",
        url: "https://www.youtube.com/user/cursosemvideo",
      },
    ],
  },
  {
    titulo: "Desenvolvedor(a) Full Stack",
    trilha: "Desenvolvimento",
    oQueFaz:
      "Une habilidades de front-end e back-end para desenvolver sistemas completos. Entende tanto a interface quanto a lógica e banco de dados, podendo atuar em todas as camadas do sistema.",
    perfil: [
      "Versátil e curioso",
      "Boa comunicação entre áreas técnicas e visuais",
      "Gosta de aprender várias tecnologias",
    ],
    expectativas: [
      "Dominar front-end e back-end básicos",
      "Conhecer frameworks e bancos de dados",
      "Ser capaz de entregar sistemas completos",
    ],
    comecar: [
      "Estudar front-end e back-end juntos",
      "Criar projetos full stack simples",
      "Publicar e documentar no GitHub",
    ],
    cursos: [
      { nome: "Formação Full Stack – DIO", url: "https://www.dio.me" },
      {
        nome: "Curso em Vídeo – HTML, CSS, JS",
        url: "https://www.cursoemvideo.com",
      },
    ],
    canais: [
      {
        nome: "Sujeito Programador",
        url: "https://www.youtube.com/c/SujeitoProgramador",
      },
      {
        nome: "Gustavo Guanabara",
        url: "https://www.youtube.com/user/cursosemvideo",
      },
    ],
  },
  {
    titulo: "Desenvolvedor(a) Mobile",
    trilha: "Desenvolvimento",
    oQueFaz:
      "Cria aplicativos para Android e iOS, usando ferramentas nativas (Kotlin, Swift) ou híbridas (React Native, Flutter). Trabalha com recursos como GPS, câmera e notificações.",
    perfil: ["Gosta de celulares e interfaces", "Detalhista e criativo"],
    expectativas: [
      "Criar apps fluídos e responsivos",
      "Integrar APIs e banco de dados",
    ],
    comecar: [
      "Escolher Flutter ou React Native",
      "Criar apps simples, como listas e conversores",
      "Testar em emuladores ou dispositivos reais",
    ],
    cursos: [
      {
        nome: "Flutter Básico – Rodrigo Rahman",
        url: "https://youtube.com/@rodrigorahman",
      },
      {
        nome: "React Native – Sujeito Programador",
        url: "https://www.youtube.com/c/SujeitoProgramador",
      },
    ],
    canais: [
      {
        nome: "Jamilton Damasceno",
        url: "https://www.youtube.com/user/jamiltondamasceno",
      },
      { nome: "Balta.io", url: "https://www.youtube.com/c/Baltaio" },
    ],
  },
  {
    titulo: "Especialista em Segurança da Informação",
    trilha: "Segurança",
    oQueFaz:
      "Protege sistemas contra ataques, vazamentos e acessos indevidos. Atua com criptografia, firewalls, testes de invasão, auditorias e políticas de segurança.",
    perfil: [
      "Investigativo, ético e disciplinado",
      "Interesse por redes, sistemas operacionais e segurança",
    ],
    expectativas: [
      "Analisar riscos e detectar vulnerabilidades",
      "Conhecer ferramentas de segurança ofensiva e defensiva",
    ],
    comecar: [
      "Estudar fundamentos de redes, Linux e cibersegurança",
      "Praticar com plataformas como TryHackMe e Hack The Box",
      "Aprender fundamentos básicos de segurança da informação",
    ],
    cursos: [
      { nome: "TryHackMe", url: "https://tryhackme.com" },
      { nome: "Fundação Bradesco – Segurança", url: "https://www.ev.org.br" },
    ],
    canais: [
      { nome: "Gabriel Pato", url: "https://www.youtube.com/c/GabrielPato" },
    ],
  },
  {
    titulo: "Analista de Dados",
    trilha: "Dados",
    oQueFaz:
      "Coleta, trata e analisa dados para gerar insights que auxiliem a tomada de decisões. Usa ferramentas como Excel, SQL, Power BI, Python e bibliotecas como Pandas e Matplotlib.",
    perfil: ["Gosta de números e lógica", "Curioso e analítico"],
    expectativas: [
      "Criar dashboards, gráficos e relatórios claros",
      "Trabalhar com grandes volumes de dados",
    ],
    comecar: [
      "Aprender Excel, SQL e Power BI",
      "Estudar análise de dados com Python (Pandas, Matplotlib)",
      "Criar projetos com dados públicos para praticar",
    ],
    cursos: [
      {
        nome: "Excel e Power BI – Hashtag Programação",
        url: "https://youtube.com/@hashtagprogramacao",
      },
      {
        nome: "Python para Dados – Data Science Academy",
        url: "https://www.datascienceacademy.com.br",
      },
    ],
    canais: [
      {
        nome: "Carlos dos Santos",
        url: "https://www.youtube.com/c/CarlosDosSantos",
      },
      {
        nome: "Hashtag Programação",
        url: "https://youtube.com/@hashtagprogramacao",
      },
    ],
  },
  {
    titulo: "Suporte Técnico / Help Desk",
    trilha: "Suporte",
    oQueFaz:
      "Atende usuários e resolve problemas técnicos com computadores, sistemas, redes e dispositivos. Atua diretamente com hardware, software, e-mails e impressoras.",
    perfil: [
      "Comunicativo, prático e calmo",
      "Interesse por funcionamento de computadores e redes",
    ],
    expectativas: [
      "Solucionar chamados com agilidade e clareza",
      "Registrar atendimentos e seguir procedimentos",
    ],
    comecar: [
      "Estudar redes, sistemas operacionais e manutenção básica",
      "Simular atendimentos para treinar comunicação",
    ],
    cursos: [
      { nome: "TI Básica – Fundação Bradesco", url: "https://www.ev.org.br" },
      { nome: "Redes – Curso em Vídeo", url: "https://www.cursoemvideo.com" },
    ],
    canais: [
      { nome: "WR Kits", url: "https://www.youtube.com/c/WRKits" },
      { nome: "Guia do TI", url: "https://www.youtube.com/c/GuiadoTI" },
    ],
  },
  {
    titulo: "QA / Analista de Testes",
    trilha: "Qualidade",
    oQueFaz:
      "Garante a qualidade dos sistemas. Realiza testes manuais e automatizados, documenta bugs, valida funcionalidades e escreve planos de testes.",
    perfil: ["Detalhista, paciente e organizado"],
    expectativas: [
      "Validar funcionalidades dos sistemas",
      "Automatizar testes com ferramentas como Selenium e Cypress",
    ],
    comecar: [
      "Aprender os tipos e técnicas de testes",
      "Criar testes manuais e automatizados em projetos simples",
    ],
    cursos: [
      {
        nome: "Talking About Testing (YouTube)",
        url: "https://www.youtube.com/c/TalkingAboutTesting",
      },
      {
        nome: "Cypress Básico – Walmyr Filho",
        url: "https://www.youtube.com/c/WalmyrFilho",
      },
    ],
    canais: [
      { nome: "Walmyr Filho", url: "https://www.youtube.com/c/WalmyrFilho" },
    ],
  },
  {
    titulo: "UI/UX Designer",
    trilha: "Design",
    oQueFaz:
      "Projeta interfaces (UI) e experiências do usuário (UX). Cria protótipos, define jornadas do usuário, trabalha com acessibilidade, usabilidade e design centrado no usuário.",
    perfil: ["Criativo, empático e atento a detalhes"],
    expectativas: [
      "Usar ferramentas como Figma, Adobe XD",
      "Entender comportamento do usuário",
    ],
    comecar: [
      "Estudar princípios de design e heurísticas de Nielsen",
      "Praticar com redesigns e criar portfólio",
    ],
    cursos: [
      { nome: "UX/UI – Origamid", url: "https://www.origamid.com" },
      {
        nome: "Figma – Aprendendo Design",
        url: "https://www.youtube.com/c/AprendendoDesign",
      },
    ],
    canais: [
      { nome: "UXNOW", url: "https://www.youtube.com/c/UXNOW" },
      { nome: "Rafa Design", url: "https://www.youtube.com/c/RafaDesign" },
    ],
  },
  {
    titulo: "Especialista em Computação em Nuvem (Cloud Engineer)",
    trilha: "Infraestrutura",
    oQueFaz:
      "Gerencia servidores, redes e serviços em plataformas como AWS, Azure e Google Cloud. Cria ambientes escaláveis, seguros e econômicos.",
    perfil: [
      "Organizado, lógico, gosta de infraestrutura",
      "Interesse por automação e arquitetura de sistemas",
    ],
    expectativas: [
      "Automatizar deploys, gerenciar permissões e monitorar sistemas",
    ],
    comecar: [
      "Estudar conceitos de Cloud (IaaS, PaaS, SaaS)",
      "Fazer deploys simples na AWS, Azure ou GCP",
    ],
    cursos: [
      {
        nome: "AWS Practitioner Essentials – SkillBuilder",
        url: "https://explore.skillbuilder.aws",
      },
      {
        nome: "Azure Fundamentals – Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/training/azure/",
      },
    ],
    canais: [
      {
        nome: "Descomplicando Cloud",
        url: "https://youtube.com/@descomplicandocloud",
      },
      { nome: "LinuxTips", url: "https://www.youtube.com/c/LinuxTips" },
    ],
  },
  {
    titulo: "Product Owner (PO) / Gestor de Produto",
    trilha: "Produto",
    oQueFaz:
      "Representa o cliente dentro do time. Define o que será feito no produto, prioriza tarefas, organiza backlog e garante entregas com valor.",
    perfil: ["Comunicativo, estratégico, bom em ouvir"],
    expectativas: [
      "Participar de reuniões ágeis",
      "Escrever histórias de usuário",
    ],
    comecar: [
      "Estudar metodologias ágeis",
      "Simular backlog e práticas de produto",
    ],
    cursos: [
      {
        nome: "Fundamentos de Gestão de Projetos – Fundação Bradesco",
        url: "https://www.ev.org.br",
      },
      { nome: "Scrum Foundation – CertiProf", url: "https://certiprof.com" },
    ],
    canais: [
      { nome: "PO na Prática", url: "https://www.youtube.com/@ponapratica" },
      { nome: "Scrum Talks", url: "https://www.youtube.com/@ScrumTalks" },
    ],
  },
];

export default function Carreiras() {
  const [trilha, setTrilha] = useState<string>("todas");
  const trilhas = [...new Set(carreiras.map((c) => c.trilha))];
  const fimRef = useRef<HTMLDivElement | null>(null);
  const [mostrarTopo, setMostrarTopo] = useState(false);

  const filtradas =
    trilha === "todas"
      ? carreiras
      : carreiras.filter((c) => c.trilha === trilha);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setMostrarTopo(entry.isIntersecting);
      },
      { threshold: 1 }
    );

    if (fimRef.current) observer.observe(fimRef.current);

    return () => observer.disconnect();
  }, [filtradas]);

  const handleTrocaTrilha = (_: unknown, nova: string | null) => {
    if (nova) {
      setTrilha(nova);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Carreiras em Tecnologia da Informação 💼
      </Typography>
      <Typography color="text.secondary" mb={3} maxWidth={720}>
        Explore as possibilidades profissionais da área de TI e descubra como
        iniciar sua jornada.
      </Typography>
      <ToggleButtonGroup
        value={trilha}
        exclusive
        onChange={handleTrocaTrilha}
        sx={{ mb: 3, flexWrap: "wrap" }}
      >
        <ToggleButton value="todas">Todas</ToggleButton>
        {trilhas.map((t) => (
          <ToggleButton key={t} value={t}>
            {t}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Stack spacing={4}>
        {filtradas.map((carreira, index) => (
          <Card
            id={`carreira-${index}`}
            key={carreira.titulo}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {carreira.titulo}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                whiteSpace="pre-line"
                mb={1}
              >
                {carreira.oQueFaz}
              </Typography>

              <Typography variant="subtitle2" fontWeight="bold">
                Perfil ideal:
              </Typography>
              <List dense>
                {carreira.perfil.map((p, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemText primary={`• ${p}`} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                Expectativas:
              </Typography>
              <List dense>
                {carreira.expectativas.map((e, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemText primary={`• ${e}`} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                Como começar:
              </Typography>
              <List dense>
                {carreira.comecar.map((c, i) => (
                  <ListItem key={i} disablePadding>
                    <ListItemText primary={`• ${c}`} />
                  </ListItem>
                ))}
              </List>

              {carreira.cursos && (
                <>
                  <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                    Cursos gratuitos:
                  </Typography>
                  <List dense>
                    {carreira.cursos.map((curso, i) => (
                      <ListItem key={i} disablePadding>
                        <Link
                          href={curso.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          • {curso.nome}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {carreira.canais && (
                <>
                  <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                    Canais recomendados:
                  </Typography>
                  <List dense>
                    {carreira.canais.map((canal, i) => (
                      <ListItem key={i} disablePadding>
                        <Link
                          href={canal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          • {canal.nome}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
      <div ref={fimRef} style={{ height: "1px" }} />
      {mostrarTopo && filtradas.length > 1 && (
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
