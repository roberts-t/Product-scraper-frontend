export interface AuthState {
    accessToken: string | null;
    errorMsg: string | null;
    isLoading: boolean;
    isRefreshing: boolean;
}

export interface IDecodedToken {
    exp: number;
    iat: number;
    id: string;
}

export interface IState {
    auth: AuthState;
}