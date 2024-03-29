'use client'

import { DEFAULT_TASKS } from '@/data/global';
import { Id, TaskType, loginProps } from '@/data/types/type';
import { apiCaller } from '@/utils/fetcher';
import { signMessage } from '@/utils/walletHelpers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    logged: Boolean;
}

const initialState: AuthState = {
    logged: false,
}

export const login = createAsyncThunk(
    'auth/login',
    async (
        { publicKey, walletType, provider, next }: loginProps,
        { dispatch }
    ) => {
        console.log('adfasdf');
        let response = false
        try {
            const {
                data: { nonce },
            } = await apiCaller.post('/auth/login', {
                requestNonce: true,
                walletType,
                publicKey,
            })
            const signature = await signMessage(
                walletType,
                nonce,
                provider,
                publicKey
            )

            const {
                data: { profile },
            } = await apiCaller.post('/auth/login', {
                publicKey,
                walletType,
                requestNonce: false,
                signature,
            })

            dispatch(setProfile(profile))
            response = true
            if (next) next()
        } catch (err) {
            console.log(err)
        }
        return response
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setProfile(state, action: PayloadAction<any>) {

        }
    },
})

export const {
    setProfile
} = authSlice.actions

export default authSlice.reducer
