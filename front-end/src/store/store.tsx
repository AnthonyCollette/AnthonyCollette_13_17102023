import { createSlice, configureStore, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        user: {
            firstName: null,
            lastName: null,
            email: null,
            password: null
        }
    },
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
}
)

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