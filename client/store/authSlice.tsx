import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const parseJSON = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export interface User {
  id: string;
  role: "admin" | "buyer" | "seller";
  permissions: string[];
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginSuccessPayload {
  token: string;
  user: User;
}

interface RegisterPayload extends LoginPayload {
  role: "admin" | "buyer" | "seller";
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: parseJSON("user"),
  isAuthenticated:
    typeof window !== "undefined" &&
    !!localStorage.getItem("token") &&
    !!parseJSON("user"),
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.successMessage = "Login successful";

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      }
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    registerRequest(state, _action: PayloadAction<RegisterPayload>) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    registerSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload;
    },

    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },

    clearMessage(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const selectAuth = (state: any) => state.auth;

export const selectUserRole = (state: any) =>
  state.auth.user?.role;

export const selectUserPermissions = (state: any) =>
  state.auth.user?.permissions || [];

export const hasPermission =
  (permission: string) =>
  (state: any) => {
    const permissions = state.auth.user?.permissions || [];
    return (
      permissions.includes("*") ||
      permissions.includes(permission)
    );
  };

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
