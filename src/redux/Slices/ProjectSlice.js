import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    projects: [],
    status: ''
}
export const fetchAllProjects = createAsyncThunk('/projects/fetchProjects', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/projects`, { method: 'GET' })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        return data?.projects
    } catch (error) {
        return error
    }
})

export const addProject = createAsyncThunk('/projects/addProject', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: payload })
            })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        return data?.project
    } catch (error) {
        return error
    }
})

export const ProjectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchAllProjects.pending, (state, action) => {
            state.status = "pending"
        }),
        builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.projects = action.payload || []
        }),
        builder.addCase(fetchAllProjects.rejected, (state, action) => {
            state.status = "rejected"
        }),
        builder.addCase(addProject.pending, (state, action) => {
            state.status = "pending"
        }),
        builder.addCase(addProject.fulfilled, (state, action) => {
            state.status = "fulfilled"
            const tempProjects = [...state.projects]
            tempProjects.push(action.payload)
            state.projects = tempProjects
            
        }),
        builder.addCase(addProject.rejected, (state, action) => {
            state.status = "rejected"
        })
    }
})

export const getAllProjects = (state) => (state.projectReducer.projects)
export default ProjectSlice.reducer