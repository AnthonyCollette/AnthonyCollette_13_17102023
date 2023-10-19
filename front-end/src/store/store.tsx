import { createSlice, configureStore, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        user: {
            firstName: '',
            lastName: '',
            email: ''
        }
    },
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = { firstName: action.payload.firstName, lastName: action.payload.lastName, email: action.payload.email };
        },
        disconnect: (state) => {
            state.token = '';
            state.user = { firstName: '', lastName: '', email: '' };
        }
    }
})

export const getToken = createAsyncThunk('user/getToken', async (data: object) => {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data.body.token
})

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch