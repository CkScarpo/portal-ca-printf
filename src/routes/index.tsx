import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import { ProtectedRoute } from "./ProtectedRoute";
import Carreiras from "../pages/Carreiras";
import Documentos from "../pages/Documentos";
import Requerimentos from "../pages/Requerimentos";
import AuthLayout from "../layout/AuthLayout";
import RequerimentosAdmin from "../pages/RequerimentosAdmin";
import PrecisaEstarLogado from "../pages/PrecisaEstarLogado";
import EsqueciSenha from "../pages/EsqueciSenha";
import { MeuPerfil } from "../pages/MeuPerfil";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "carreiras", element: <Carreiras /> },
      { path: "documentos", element: <Documentos /> },
      {
        path: "requerimentos",
        element: (
          <ProtectedRoute>
            <Requerimentos />
          </ProtectedRoute>
        ),
      },
      {
        path: "meu-perfil",
        element: (
          <ProtectedRoute>
            <MeuPerfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "painel-admin",
        element: (
          <ProtectedRoute adminOnly>
            <RequerimentosAdmin />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      { path: "esqueci-senha", element: <EsqueciSenha /> },
    ],
  },
  {
    path: "/",
    element: "",
    children: [{ path: "nao-autorizado", element: <PrecisaEstarLogado /> }],
  },
]);
