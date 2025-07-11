CA Printf Portal
Uma aplicação web para o Centro Acadêmico Printf, oferecendo consulta a documentos, informações de carreira, envio e gerenciamento de requerimentos, com autenticação e separação de permissões entre alunos e administradores.

Sumário
Funcionalidades

Tecnologias

Demonstração

Instalação

Configuração do Firebase

Estrutura de Pastas

Uso

Contribuição

Licença

Funcionalidades
Autenticação com Google e e-mail/senha

Registro de usuário e recuperação de senha

Modo light/dark com persistência

Página pública de documentos com filtro por categoria

Página de carreiras em TI

Seção de requerimentos:

Envio de novos requerimentos (anônimo ou identificado)

Permissão de leitura somente ao autor ou ao administrador

Painel administrativo para visualizar, responder e deletar requerimentos

Filtro por tipo de requerimento

Feedback visual com SweetAlert2

Header responsivo com menu collapse em mobile

Toggle de tema global via Zustand + MUI ThemeProvider

Tecnologias
React 18

Material-UI v5

React Router v6

Firebase Auth & Firestore

Zustand (state management)

SweetAlert2 (modais e alertas)

TypeScript

Demonstração

Instalação
Clone o repositório:

bash
git clone https://github.com/seu-usuario/ca-printf-portal.git
cd ca-printf-portal
Instale as dependências:

bash
npm install

# ou

yarn
Crie um arquivo .env.local na raiz com as credenciais do Firebase:

VITE_FIREBASE_API_KEY=SEU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
VITE_FIREBASE_APP_ID=SEU_APP_ID
Inicie em modo de desenvolvimento:

bash
npm run dev

# ou

yarn dev
Configuração do Firebase
No Console do Firebase:

Crie um projeto e ative Authentication (Google e E-mail/Senha).

Crie a coleção admins no Firestore — adicione documentos cujo id seja o uid do usuário admin.

Configure as regras de segurança do Firestore:

js
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
function isAdmin() {
return exists(/databases/$(database)/documents/admins/$(request.auth.uid));
}
match /requerimentos/{reqId} {
allow create: if request.auth.uid != null;
allow get, list: if request.auth.uid != null
&& (isAdmin() || resource.data.uid == request.auth.uid);
allow update, delete: if isAdmin();
}
}
}
Estrutura de Pastas
src/
├─ components/
│ ├─ Header.tsx
│ ├─ ThemeToggle.tsx
│ ├─ ModalNovoRequerimento.tsx
│ └─ ResponderRequerimento.tsx
├─ hooks/
│ └─ useRequerimentos.ts
├─ pages/
│ ├─ Home.tsx
│ ├─ Documentos.tsx
│ ├─ Carreiras.tsx
│ ├─ Requerimentos.tsx
│ ├─ RequerimentosAdmin.tsx
│ ├─ Login.tsx
│ ├─ Cadastro.tsx
│ └─ EsqueciSenha.tsx
├─ services/
│ ├─ authService.ts
│ └─ requerimentoService.ts
├─ store/
│ ├─ userStore.ts
│ └─ themeStore.ts
├─ theme.ts
├─ Root.tsx
└─ App.tsx
Uso
Navegação

Home: visão geral do portal

Documentos: acesso a estatuto, atas, fotos e vídeos com filtro por categoria

Carreiras: orientações sobre carreiras em TI

Requerimentos: envio e listagem dos seus pedidos

Administração

Faça login como admin para acessar /painel-admin

Responda, filtre e delete requerimentos diretamente pelo painel

Tema

Clique no ícone de sol/lua no header para alternar entre light e dark

Contribuição
Fork este repositório

Crie sua branch (git checkout -b feature/minha-feature)

Commit suas mudanças (git commit -m 'Adiciona nova feature')

Push para a branch (git push origin feature/minha-feature)

Abra um Pull Request

Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para detalhes.
