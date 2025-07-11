import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface NovoRequerimento {
  uid: string;
  nome: string;
  email: string;
  tipo: string;
  assunto: string;
  mensagem: string;
}

export const enviarRequerimento = async (req: NovoRequerimento) => {
  const col = collection(db, "requerimentos");
  await addDoc(col, {
    ...req,
    enviadoEm: serverTimestamp(),
  });
};

export const responderRequerimento = async (id: string, resposta: string) => {
  const ref = doc(db, "requerimentos", id);
  await updateDoc(ref, { resposta });
};

export const deletarRequerimento = async (id: string) => {
  const ref = doc(db, "requerimentos", id);
  await deleteDoc(ref);
};
