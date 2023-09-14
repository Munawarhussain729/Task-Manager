import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    status: ''
}

export const fetchAllUsers = createAsyncThunk('/user/fetchUsers', async (payload, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:8080/user/users', { method: 'GET' })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        return data?.users
    } catch (error) {
        return error
    }
})

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchAllUsers.pending,(state, action)=>{
            state.status = 'pending'
        }),
        builder.addCase(fetchAllUsers.fulfilled, (state, action)=>{
            state.users = [...action?.payload]
            state.status ='fulfilled'
        }),
        builder.addCase(fetchAllUsers.rejected, (state, action)=>{
            state.status = 'rejected'
        })
    }
})

export const getAllUsers = (state) => (state.userReducer.users)
export default userSlice.reducer