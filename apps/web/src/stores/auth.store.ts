import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload, AuthUser } from "@repo/types/auth";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (accessToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,
  login: (accessToken) => {
    try {
      set({
        accessToken,
        user: decodeToken(accessToken),
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Failed to decode token", error);
      set({ ...initialState });
    }
  },
  logout: () => {
    set({ ...initialState });
  },
  refreshAccessToken: async () => {
    try {
      const { accessToken } = await authService.refresh();
      get().login(accessToken);
    } catch {
      set({ ...initialState });
    }
  },
}));

function decodeToken(accessToken: string): AuthUser {
  const decoded = jwtDecode<JwtPayload>(accessToken);
  const user: AuthUser = {
    id: decoded.sub,
    email: decoded.email,
    username: decoded.username,
  };
  return user;
}
