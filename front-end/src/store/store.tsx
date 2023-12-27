import { createSlice, configureStore, PayloadAction, createAsyncThunk, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import axios from 'axios'
import thunk from 'redux-thunk'
import getStoredState from 'redux-persist/es/getStoredState'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

interface UpdateUser {
    firstName: string,
    lastName: string,
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        remembered: false,
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
        },
        updateUser: (state, action: PayloadAction<UpdateUser>) => {
                state.user.firstName = action.payload.firstName;
                state.user.lastName = action.payload.lastName;
        }
    }
})

const rootReducer = combineReducers({
	user: userSlice.reducer,
})

export type RootReducer = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
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

export const updateUser = createAsyncThunk('user/updateUser', async (data: object) => {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data.body
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch