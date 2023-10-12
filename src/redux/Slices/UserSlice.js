import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const initialState = {
    users: [],
    status: ''
}

export const fetchAllUsers = createAsyncThunk('/user/fetchUsers', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/users`, { method: 'GET' })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        return data?.users
    } catch (error) {
        return error
    }
})

export const updateUserProfile = createAsyncThunk('/user/updateProfile', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/update-profile`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
        if (!response.ok) {
            return 'unable to update profile'
        }
        const data = await response.json()
        return data?.message
    } catch (error) {
        debugger
        console.log("Error is ", error);
        alert()
        return error
    }
})

export const validateGoogleUser = createAsyncThunk('/user/validate-google-user', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/validate-google-user`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
        if (!response.ok) {
            toast.error("Error in signIn")
            return {}
        }
        const data = await response.json()
        Cookies.set('userProfile', JSON.stringify(data.user[0]))
        return data?.user[0]
    } catch (error) {
        console.log("Error found in API ", error);
        debugger
        return error
    }
})

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.status = 'pending'
        }),
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload || []
            state.status = 'fulfilled'
        }),
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.status = 'rejected'
        }),
        builder.addCase(validateGoogleUser.pending, (state, action) => {
            state.status = 'pending'
        }),
        builder.addCase(validateGoogleUser.fulfilled, (state, action) => {
            // localStorage.setItem("userProfile", JSON.stringify(action.payload))
            state.status = 'fulfilled';
        });

        builder.addCase(validateGoogleUser.rejected, (state, action) => {
            state.status = 'rejected'
        }),
        builder.addCase(updateUserProfile.pending, (state, action) => {
            state.status = 'pending'
        }),
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            toast.success("User updated successfully ")
            state.status = 'fulfilled'
        }),
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.status = 'rejected'
        })
    }
})

export const getAllUsers = (state) => (state?.userReducer?.users)
export default userSlice.reducer