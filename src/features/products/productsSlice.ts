import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import productsService from './productsService';
import { ProductsState } from '../../types';

const initialState: ProductsState = {
    products: [],
    productsSorted: [],
    isLoading: false,
    query: null,
    isSearched: false,
    errorMsg: null,
    sortType: "priceAsc"
}

export const searchProducts = createAsyncThunk('products/searchProducts', async (query: string, thunkAPI) => {
    try {
        return await productsService.searchProducts(query);
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
        });
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.errorMsg = null;
            state.products = action.payload;
            state.productsSorted = action.payload;
            state.isSearched = true;
            state.query = action.meta.arg;
            state.productsSorted = productsService.sortProducts([...action.payload], 'priceAsc', state.query);
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