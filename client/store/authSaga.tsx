import { call, put, takeLatest } from 'redux-saga/effects';
import { CallEffect, PutEffect } from 'redux-saga/effects';

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
  role: string;
}
const loginApi = (payload: LoginPayload) =>
  api.post('/api/auth/login', payload).then(res => res.data);

const registerApi = (payload: RegisterPayload) =>
  api.post('/api/auth/register', payload).then(res => res.data);



function* loginSaga(
  action: ReturnType<typeof loginRequest>
): Generator<CallEffect | PutEffect, void, any> {
  try {
    const data: any = yield call(loginApi, action.payload);
    yield put(loginSuccess(data));
  } catch (err: any) {
    yield put(loginFailure(err.response?.data?.message || err.message));
  }
}


function* registerSaga(
  action: ReturnType<typeof registerRequest>
): Generator<any, void, any> {
  try {
    yield call(registerApi, action.payload);
    yield put(registerSuccess());
  } catch (err: any) {
    yield put(
      registerFailure(err.response?.data?.message || err.message)
    );
  }
}

export default function* authSaga(): Generator {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}
