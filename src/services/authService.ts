import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

setPersistence(auth, browserLocalPersistence).catch(console.error);

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const login = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password).then((c) => c.user);

export const resetPassword = (email: string) =>
  sendPasswordResetEmail(auth, email);

export const logout = () => {
  signOut(auth);
};

export const observeUser = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

export const checkAdmin = async (uid: string): Promise<boolean> => {
  const ref = doc(db, "admins", uid);
  const snap = await getDoc(ref);
  return snap.exists();
};

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordPayload) => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error("Usuário não autenticado");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);

  await updatePassword(user, newPassword);
};
