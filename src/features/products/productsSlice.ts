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
    updateAvailable: false,
    sortType: "priceAsc"
}

export const searchProducts = createAsyncThunk('products/searchProducts', async (searchData: IProductSearch, thunkAPI) => {
    try {
        const { query, updateProducts } = searchData;
        return await productsService.searchProducts(query, updateProducts);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err?.response?.data?.errorMsg || "Something went wrong, try again later!";
            return thunkAPI.rejectWithValue(message);
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
            state.productsSorted = productsService.sortProducts(state.products, sortType, state.query);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = null;
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
                state.productsSorted = productsService.sortProducts([...action.payload.products], 'priceAsc', state.query);
            } else {
                state.productsSorted = [];
            }
        });
        builder.addCase(searchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload as string;
        });
    }
});

export const {
    changeProductSort,
    resetProducts
} = productsSlice.actions;
export default productsSlice.reducer;