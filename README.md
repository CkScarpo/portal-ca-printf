# Portal CA Printf

Uma aplicação web para o Centro Acadêmico Printf, oferecendo:

- Consulta a documentos (atas, fotos, vídeos)
- Informações sobre carreiras em TI
- Envio, leitura e gerenciamento de requerimentos
- Autenticação com Google e e-mail/senha
- Permissões diferenciadas entre alunos e administradores
- Suporte a light/dark mode

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Demonstração](#demonstração)
- [Instalação](#instalação)
- [Configuração do Firebase](#configuração-do-firebase)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Usar](#como-usar)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Funcionalidades

- 📦 Autenticação
  - Login com Google
  - Login/registro por e-mail e senha
  - Recuperação de senha
- 🎨 Tema
  - Light / Dark mode via toggle
  - Preferência salva em sessão
- 📄 Documentos
  - Estatuto, atas, fotos e vídeos
  - Filtro por categoria
- 💼 Carreiras
  - Orientações sobre carreiras em TI
- 📨 Requerimentos
  - Envio anônimo ou identificado
  - Autor visualiza apenas os próprios
  - Admin visualiza, filtra, responde e deleta
  - Feedback com SweetAlert2

---

## Tecnologias

- **React 18**
- **Material-UI v5**
- **React Router v6**
- **Firebase Auth & Firestore**
- **Zustand** (state management)
- **SweetAlert2** (modais)
- **TypeScript**

---

## Demonstração

> _Exemplo ilustrativo_

![Portal CA Printf – modo dark mostrando requerimentos](./screenshot.png)

---

## Instalação

```bash
# 1. Clone este repositório
git clone https://github.com/seu-usuario/ca-printf-portal.git
cd ca-printf-portal

# 2. Instale dependências
npm install
# ou
yarn
```

---

## Configuração do Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.
2. No menu **Authentication**, habilite os provedores:
   - Google
   - E-mail/Senha
3. Em **Firestore Database**, crie a coleção `admins` e adicione documentos cujo **ID** seja o `uid` de cada administrador.
4. Em **Rules** do Firestore, substitua pelo código abaixo:

   ```js
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       function isAdmin() {
         return exists(
           /databases/$(database)/documents/admins/$(request.auth.uid)
         );
       }

       match /requerimentos/{reqId} {
         allow create: if request.auth.uid != null;
         allow get, list: if request.auth.uid != null
           && (isAdmin() || resource.data.uid == request.auth.uid);
         allow update, delete: if isAdmin();
       }

       match /admins/{adminId} {
         allow read: if request.auth.uid != null;
         allow write: if false;
       }
     }
   }
   ```

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e defina suas credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY="SUA_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_SENDER_ID"
VITE_FIREBASE_APP_ID="SEU_APP_ID"
VITE_FIREBASE_MEASUREMENT_ID="SEU_MEASUREMENT_ID"
```

---

## Estrutura de Pastas

```plain
src/
├─ components/
│  ├─ Header.tsx
│  ├─ ThemeToggle.tsx
│  ├─ ModalNovoRequerimento.tsx
│  └─ ResponderRequerimento.tsx
├─ hooks/
│  └─ useRequerimentos.ts
├─ pages/
│  ├─ Home.tsx
│  ├─ Documentos.tsx
│  ├─ Carreiras.tsx
│  ├─ Requerimentos.tsx
│  ├─ RequerimentosAdmin.tsx
│  ├─ Login.tsx
│  ├─ Cadastro.tsx
│  └─ EsqueciSenha.tsx
├─ services/
│  ├─ firebase.ts
│  ├─ authService.ts
│  └─ requerimentoService.ts
├─ store/
│  ├─ userStore.ts
│  └─ themeStore.ts
├─ theme.ts
├─ Root.tsx
└─ App.tsx
```

---

## Como Usar

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
2. Abra o navegador em http://localhost:3000.

3. Navegue pelo menu principal:

- Home: visão geral do portal

- Documentos: estatuto, atas, fotos e vídeos (filtro por categoria)

- Carreiras: orientações sobre profissões em TI

- Requerimentos: criação e listagem dos seus pedidos

- Painel Admin: /painel-admin (acesso restrito a administradores)

- Use o ícone de sol/lua no cabeçalho para alternar entre Light e Dark Mode.

## Contribuição

Faça um fork deste repositório.

Crie uma branch para sua feature:

bash
git checkout -b feature/nome-da-sua-feature
Implemente suas alterações e faça commit:

bash
git commit -m "Descrição da feature ou correção"
Envie para o seu fork:

bash
git push origin feature/nome-da-sua-feature
Abra um Pull Request no repositório original, descrevendo as mudanças realizadas.

## Licença

Este projeto está licenciado sob a MIT License. Sinta-se à vontade para usar, modificar e distribuir conforme os termos da licença.
