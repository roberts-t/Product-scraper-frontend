import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import axios from 'axios';
import { AuthState } from '../../types';

const accessToken = JSON.parse(localStorage?.getItem("user") as string) || null;

const initialState: AuthState = {
    accessToken: accessToken,
    errorMsg: null,
    isLoading: false,
}

export const login = createAsyncThunk('auth/register', async (accessCode: string, thunkAPI) => {
    try {
        return await authService.login(accessCode);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err?.response?.data?.errorMsg || "Something went wrong, try again later!";
            return thunkAPI.rejectWithValue(message);
        } else {
            return thunkAPI.rejectWithValue("Unexpected error occurred!");
        }
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        return await authService.logout();
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err?.response?.data?.errorMsg || "Something went wrong, try again later!";
            return thunkAPI.rejectWithValue(message);
        } else {
            return thunkAPI.rejectWithValue("Unexpected error occurred!");
        }
    }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
    try {
        return await authService.refreshToken();
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const message = err?.response?.data?.errorMsg || "Something went wrong, try again later!";
            return thunkAPI.rejectWithValue(message);
        } else {
            return thunkAPI.rejectWithValue("Unexpected error occurred!");
        }
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.errorMsg = null;
            state.accessToken = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload as string;
        });
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
            state.errorMsg = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.errorMsg = null;
            state.accessToken = null;
            localStorage.removeItem('user');
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.payload as string;
        });
        builder.addCase(refreshToken.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.accessToken = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(refreshToken.rejected, (state) => {
            state.isLoading = false;
            state.accessToken = null;
            localStorage.removeItem('user');
        });
    }
});

export default authSlice.reducer;