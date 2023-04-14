import { requestPrivate, requestPublic } from '../../utils/request';

export const login = async (accessCode: string) => {
    const response = await requestPublic.post('/access',
        { token: accessCode }
    );

    return response.data.token;
}

export const logout = async () => {
    const response = await requestPrivate.post('/access/logout');

    return response.data;
}

const refreshToken = async () => {
    const response = await requestPublic.post('/access/refresh');

    return response.data.token;
}

const authService = {
    login,
    logout,
    refreshToken
}

export default authService;