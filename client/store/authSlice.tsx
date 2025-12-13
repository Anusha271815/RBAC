import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user:
    typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null,
  isAuthenticated:
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  loading: false,
  error: null,
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
    },
    registerSuccess(state) {
      state.loading = false;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
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
} = authSlice.actions;

export default authSlice.reducer;
