import type { User } from "firebase/auth";
import { create } from "zustand";

interface UserState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAdmin: (admin: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  setUser: (user) => set({ user }),
  setAdmin: (admin) => set({ isAdmin: admin }),
  setLoading: (loading) => set({ loading }),
}));
