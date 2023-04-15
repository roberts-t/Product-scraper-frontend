import axios from 'axios';
import { IDecodedToken } from '../types';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/auth/authSlice';
import { store } from '../app/store';

export const requestPublic = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

export const requestPrivate = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

requestPrivate.interceptors.request.use(
    async (config) => {
        const user = store?.getState()?.auth?.accessToken;
        if (user) {
            const decodedToken: IDecodedToken = jwtDecode(user);
            if (decodedToken.exp * 1000 < Date.now()) {
                await store.dispatch(refreshToken());
            }
            config.headers.Authorization = `Bearer ${store?.getState()?.auth?.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
