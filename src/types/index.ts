export interface AuthState {
    accessToken: string | null;
    errorMsg: string | null;
    isLoading: boolean;
}

export interface IDecodedToken {
    exp: number;
    iat: number;
    id: string;
}