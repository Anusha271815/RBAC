import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const parseJSON = (key: string) => {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(key);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    console.warn(`Invalid JSON in localStorage for key "${key}", clearing it`);
    localStorage.removeItem(key);
    return null;
  }
};

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginSuccessPayload {
  token: string;
  user: any;
}

interface RegisterPayload extends LoginPayload {
  role: string;
}

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: parseJSON('user'),
  isAuthenticated: !!parseJSON('user') && !!localStorage.getItem('token'),
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    registerRequest(state, action: PayloadAction<RegisterPayload>) {
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
    clearMessage(state) {
      state.successMessage = null;
      state.error = null;
    },
  },
});
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
  clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
