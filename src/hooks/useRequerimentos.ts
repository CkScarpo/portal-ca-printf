import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useUserStore } from "../store/userStore";

export interface Requerimento {
  id: string;
  uid: string;
  nome: string;
  email: string;
  tipo: string;
  assunto: string;
  mensagem: string;
  resposta?: string;
  enviadoEm: Date;
}

export const useRequerimentos = () => {
  const { user, isAdmin } = useUserStore();
  const [requerimentos, setRequerimentos] = useState<Requerimento[]>([]);
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const abrirModal = () => setAberto(true);

  const fecharModal = () => setAberto(false);

  const carregarRequerimentos = async () => {
    if (!user) return;

    setCarregando(true);

    try {
      const col = collection(db, "requerimentos");
      const q = isAdmin ? query(col) : query(col, where("uid", "==", user.uid));

      const snap = await getDocs(q);

      const list = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          uid: data.uid as string,
          nome: (data.nome as string) || "",
          email: data.email as string,
          tipo: data.tipo as string,
          assunto: data.assunto as string,
          mensagem: data.mensagem as string,
          resposta: (data.resposta as string) || undefined,
          enviadoEm: (data.enviadoEm as Timestamp)?.toDate?.() ?? new Date(),
        } as Requerimento;
      });

      setRequerimentos(list);
    } catch (error) {
      console.error("❌ Erro ao carregar requerimentos:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarRequerimentos();
  }, [user, isAdmin]);

  return {
    requerimentos,
    carregando,
    aberto,
    abrirModal,
    fecharModal,
    carregarRequerimentos,
  };
};
