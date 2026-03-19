import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/auth";
import api from "../lib/axios";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loading: false,
      accessToken: null,
      user: null,

      // Called from /app/auth/callback after OAuth redirect
      handleOAuthCallback: async (token: string) => {
        set({ loading: true, accessToken: token });
        try {
          const res = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ user: res.data.data, loading: false });
        } catch {
          set({ accessToken: null, user: null, loading: false });
        }
      },

      logout: async () => {
        try { await api.post("/auth/logout"); } catch { /* ignore */ }
        set({ accessToken: null, user: null });
      },

      refresh: async () => {
        try {
          const res = await api.post("/auth/refresh");
          set({
            accessToken: res.data.data.accessToken,
            user: res.data.data.user,
          });
        } catch {
          set({ accessToken: null, user: null });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);
