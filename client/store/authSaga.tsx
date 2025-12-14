import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../utils/api';

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from './authSlice';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  role: 'admin' | 'buyer' | 'seller';
}

const loginApi = (payload: LoginPayload) =>
  api.post('/api/auth/login', payload).then(res => res.data);

const registerApi = (payload: RegisterPayload) =>
  api.post('/api/auth/register', payload).then(res => res.data);

function* loginSaga(
  action: ReturnType<typeof loginRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(loginApi, action.payload);

    const normalizedUser = {
      id: response.user._id,
      email: response.user.email,
      role: response.user.role.name,        
      permissions: response.user.role.permissions,
    };

    yield put(
      loginSuccess({
        token: response.token,
        user: normalizedUser,
      })
    );
  } catch (err: any) {
    yield put(
      loginFailure(err.response?.data?.message || err.message)
    );
  }
}


function* registerSaga(
  action: ReturnType<typeof registerRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(registerApi, action.payload);
    yield put(registerSuccess(response.message));
  } catch (err: any) {
    yield put(
      registerFailure(
        err.response?.data?.message || 'Registration failed'
      )
    );
  }
}

export default function* authSaga(): Generator {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}
