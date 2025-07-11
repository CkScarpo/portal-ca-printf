import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly }: Props) {
  const { user, isAdmin } = useUserStore();

  if (!user) return <Navigate to="/nao-autorizado" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return children;
}
