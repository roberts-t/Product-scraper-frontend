import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

interface IAuthContext {
    accessToken: string;
    isLoading: boolean;
    login?: (code: string, setError: (error: string) => void) => void;
    logout?: () => void;
    checkToken?: () => void;
}

interface IDecodedToken {
    exp: number;
    iat: number;
    id: string;
}

export const AuthContext = createContext<IAuthContext>({
    accessToken: '',
    isLoading: true,
});

const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    let tokenExpirationTimer: NodeJS.Timeout | null = null;

    const updateAccessToken = (token: string) => {
        setAccessToken(token);
        console.log('updateAccessToken token: ', token);
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken: IDecodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                updateAccessToken('');
            } else {
                updateAccessToken(token);
            }
        }
        setIsLoading(false);
    }, []);

    const checkToken = async () => {
        if (accessToken) {
            const decodedToken: IDecodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                await refreshToken();
            }
        }
    }

    const refreshToken = async () => {
        if (!accessToken) {
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/access/refresh',{}, {withCredentials: true});
            if (response.data?.token) {
                updateAccessToken(response.data.token);
            } else {
                updateAccessToken('');
                window.location.href = '/access';
            }
        } catch (error) {
            window.location.href = '/access';
            console.log(error);
        }
    }

    const login = (code: string, setError: (error: string) => void) => {
        axios.post(`http://localhost:5000/api/access`, {
            token: code
        }, {
            withCredentials: true
        }).then((res) => {
            if (res.data?.token) {
                console.log(res.data?.token);
                updateAccessToken(res.data.token);
                window.location.href = '/';
            }
        }).catch((err) => {
            const errorMsg = err?.response?.data?.errorMsg;
            if (errorMsg) {
                if (errorMsg === 'INVALID_REQUEST' || errorMsg === 'INCORRECT_TOKEN') {
                    setError('Nepareizs piekļuves kods');
                } else {
                    setError('Notikusi kļūda, mēģinot pieslēgties');
                }
            } else {
                setError('Notikusi kļūda, mēģinot pieslēgties');
            }
        });
    };

    const logout = () => {
        axios.post(`http://localhost:5000/api/access/logout`, {}, {
            withCredentials: true
        }).then(() => {
            updateAccessToken('');
            clearTimeout(tokenExpirationTimer!);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <AuthContext.Provider value={{ accessToken, isLoading, login, logout, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;