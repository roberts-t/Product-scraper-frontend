import axios from 'axios';
import { IDecodedToken } from '../types';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/auth/authSlice';
const { store } = require('../app/store');

export const requestPublic = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const requestPrivate = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

requestPrivate.interceptors.request.use(
    async (config) => {
        const user = store?.getState()?.auth?.user;

        if (user) {
            const decodedToken: IDecodedToken = jwtDecode(user);
            if (decodedToken.exp * 1000 < Date.now()) {
                await store.dispatch(refreshToken());
            }
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
