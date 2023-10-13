import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    projects: [],
    tasks: [],
    users: [],
    status: '',
    taskUpdate: false,
    removeTask: false,
    taskStatus: false,
    projectUsersStatus: ''
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
export const updateProjectTaskStatus = createAsyncThunk('/task/updateTaskStatus', async (payload, thunkAPI) => {
    try {
        const response =
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}task/udpate-status`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                },
            )

        const data = await response.json();
        return data?.updatedTask
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

export const addProjectTask = createAsyncThunk('/projects/addTask', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/add-task`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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

export const RemoveProjectTask = createAsyncThunk('/projects/removeTask', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/remove-task`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
})

export const fetchProjectTasks = createAsyncThunk('/projects/fetchProjectTasks', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/project-tasks/${payload}`, { method: 'GET' })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        return data.tasks
    } catch (error) {
        return error
    }
})

export const fetchProjectUser = createAsyncThunk('/projects/fetchProjectUsers', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/project-users/${payload}`, { method: 'GET' })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        return data.users
    } catch (error) {
        return error
    }
})

export const addProjectUser = createAsyncThunk('/project/addProjectUser', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/add-user`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        if (!response.ok) {
            return {}
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
        builder.addCase(fetchProjectTasks.pending, (state, action) => {
            state.status = "pending"
        }),
            builder.addCase(fetchProjectTasks.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.tasks = action.payload || []
                state.taskUpdate = false
                state.removeTask = false
            }),
            builder.addCase(fetchProjectTasks.rejected, (state, action) => {
                state.status = "rejected"
            }),
            builder.addCase(fetchProjectUser.pending, (state, action) => {
                state.status = "pending"
            }),
            builder.addCase(fetchProjectUser.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.projectUsersStatus = "fulfilled"
                state.users = action.payload || []
            }),
            builder.addCase(fetchProjectUser.rejected, (state, action) => {
                state.status = "rejected"
            }),
            builder.addCase(addProjectUser.pending, (state, action) => {
                state.status = "pending"
            }),
            builder.addCase(addProjectUser.fulfilled, (state, action) => {
                const project = action?.payload
                state.status = "fulfilled"
                state.projectUsersStatus = "pending"
            }),
            builder.addCase(addProjectUser.rejected, (state, action) => {
                state.status = "rejected"
            })
        builder.addCase(updateProjectTaskStatus.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(updateProjectTaskStatus.fulfilled, (state, action) => {
            const indexToUpdate = state.tasks.findIndex(item => item?._id === action?.payload?._id);
            state.taskUpdate = true;
            state.status = 'succeeded';
        })
        builder.addCase(updateProjectTaskStatus.rejected, (state, action) => {
            state.status = 'rejected'
        })
        builder.addCase(addProjectTask.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(addProjectTask.fulfilled, (state, action) => {
            if (action?.payload?.tasks) {
                state.taskUpdate = true
            }
            state.status = 'succeeded';
        })
        builder.addCase(addProjectTask.rejected, (state, action) => {
            state.status = 'rejected'
        })
        builder.addCase(RemoveProjectTask.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(RemoveProjectTask.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.removeTask = true
        })
        builder.addCase(RemoveProjectTask.rejected, (state, action) => {
            state.status = 'rejected'
        })

    }
})

export const getProjectUsers = (state) => (state.projectReducer.users)
export const getProjectTasks = (state) => (state.projectReducer.tasks)
export const removeProjectTasks = (state) => (state.projectReducer.removeTask)
export const getProjectTaskUpdate = (state) => (state.projectReducer.taskUpdate)
export const getAllProjects = (state) => (state.projectReducer.projects)
export default ProjectSlice.reducer