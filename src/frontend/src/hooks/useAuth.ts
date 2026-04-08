import { clearSession, getStoredSession, storeSession } from "@/lib/auth";
import type { UserRole } from "@/types";
import { create } from "zustand";

interface AuthStore {
  token: string | null;
  userId: string | null;
  username: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (
    token: string,
    userId: string,
    username: string,
    role: UserRole,
  ) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  token: null,
  userId: null,
  username: null,
  role: null,
  isAuthenticated: false,
  hydrated: false,

  login: (token, userId, username, role) => {
    storeSession({ token, userId, username, role });
    set({ token, userId, username, role, isAuthenticated: true });
  },

  logout: () => {
    clearSession();
    set({
      token: null,
      userId: null,
      username: null,
      role: null,
      isAuthenticated: false,
    });
  },

  initialize: () => {
    const session = getStoredSession();
    if (session) {
      set({
        token: session.token,
        userId: session.userId,
        username: session.username,
        role: session.role,
        isAuthenticated: true,
        hydrated: true,
      });
    } else {
      set({ hydrated: true });
    }
  },
}));
