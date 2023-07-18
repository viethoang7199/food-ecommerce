import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    fullName: null,
    userId: null,
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SET_USER: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.userId = action.payload.userId;
        },
        LOGOUT: (state, action) => {
            state.isLoggedIn = false;
            state.email = null;
            state.fullName = null;
            state.userId = null;
        }
    }
});
