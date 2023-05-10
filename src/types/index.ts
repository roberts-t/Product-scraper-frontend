export interface AuthState {
    accessToken: string | null;
    errorMsg: string | null;
    isLoading: boolean;
    isRefreshing: boolean;
}

export interface ProductsState {
    products: IProduct[];
    productsSorted: IProduct[];
    isLoading: boolean;
    query: string | null;
    updateAvailable: boolean;
    isSearched: boolean;
    errorMsg: string | null;
    sortType: keyof IProductSortTypes;
}

export interface IDecodedToken {
    exp: number;
    iat: number;
    id: string;
}

export interface IState {
    auth: AuthState;
    products: ProductsState;
}

export interface IProduct {
    site?: string;
    name?: string;
    price?: string | number;
    image?: string;
    url?: string;
    currency?: string;
    available?: boolean;
    description?: string;
    brand?: string;
    country?: string;
    manufacturer?: string;
    amount?: string;
    dealDuration?: string;
}

export interface IProductSortTypes {
    default: string
    priceAsc: string;
    priceDesc: string;
    nameAsc: string;
    nameDesc: string;
    relevance: string;
}

export interface IProductSearch {
    query: string;
    updateProducts: boolean;
}