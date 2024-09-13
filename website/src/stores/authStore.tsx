import { createStore } from "zustand/vanilla";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export type AuthStore = AuthState & AuthActions;

export const initialState: AuthStore = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
};

export const createAuthStore = (initState: AuthStore = initialState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    login: (user, token) =>
      set({ user, isAuthenticated: true, accessToken: token }),
    logout: () =>
      set({ user: null, isAuthenticated: false, accessToken: null }),
    updateUser: (updatedUser) =>
      set((state) => ({
        user: state.user ? { ...state.user, ...updatedUser } : null,
      })),
  }));
};
