import api from '../utils/api';

export const initAuth = () => {
  if (typeof window === 'undefined') return;

  const token = localStorage.getItem('token');

  if (token) {
    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;
  }
};
