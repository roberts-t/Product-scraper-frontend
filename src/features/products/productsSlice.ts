import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import productsService from './productsService';
import { IProductSearch, ProductsState } from '../../types';

const initialState: ProductsState = {
    products: [],
    productsSorted: [],
    isLoading: false,
    query: null,
    isSearched: false,
    errorMsg: null,
    rateLimited: false,
    rateLimitReset: null,
    updateAvailable: false,
    sortType: "default"
}

interface IRejectedValue {
    status: number | undefined;
    message: string;
    rateLimitReset?: number;
}

export const searchProducts = createAsyncThunk('products/searchProducts', async (searchData: IProductSearch, thunkAPI) => {
    try {
        const { query, updateProducts } = searchData;
        return await productsService.searchProducts(query, updateProducts);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const errorStatus = err?.response?.status;
            if (errorStatus === 429) {
                const rateLimitReset = err?.response?.headers?.["ratelimit-reset"];
                const rejectedValue: IRejectedValue = { status: errorStatus, rateLimitReset, message: "Too many requests, try again later!" };
                return thunkAPI.rejectWithValue(rejectedValue);
            } else {
                const message = err?.response?.data?.errorMsg || "Something went wrong, try again later!";
                const rejectedValue: IRejectedValue = { status: errorStatus, message };
                return thunkAPI.rejectWithValue(rejectedValue);
            }
        } else {
            return thunkAPI.rejectWithValue("Unexpected error occurred!");
        }
    }
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: () => initialState,
        changeProductSort: (state, action) => {
            const sortType = action.payload;
            state.sortType = sortType;
            state.productsSorted = productsService.sortProducts([...state.products], sortType, state.query);
        },
        resetProductError: (state) => {
            state.errorMsg = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = null;
            state.rateLimited = false;
            state.rateLimitReset = null;
            state.updateAvailable = false;
        });
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.errorMsg = null;
            state.products = action.payload.products;
            state.productsSorted = action.payload.products;
            state.updateAvailable = action.payload.updateAvailable;
            state.isSearched = true;
            state.query = action.meta.arg.query;
            if (action.payload.products && Array.isArray(action.payload.products)) {
                if (state.sortType !== "default") {
                    state.productsSorted = productsService.sortProducts([...action.payload.products], state.sortType, state.query);
                } else {
                    state.productsSorted = [...action.payload.products];
                }
            } else {
                state.productsSorted = [];
            }
        });
        builder.addCase(searchProducts.rejected, (state, action) => {
            state.isLoading = false;
            const payload = action.payload as IRejectedValue;

            // 429 is the status code for rate limiting
            if (payload.status === 429) {
                state.rateLimitReset = payload.rateLimitReset || null;
                state.rateLimited = true;
                state.updateAvailable = true;
            } else {
                state.errorMsg = payload.message;
            }
        });
    }
});

export const {
    changeProductSort,
    resetProducts,
    resetProductError
} = productsSlice.actions;
export default productsSlice.reducer;