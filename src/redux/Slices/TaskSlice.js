import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    status: ''
}

export const fetchTasks = createAsyncThunk('/tasks/fetchTasks', async (payload, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:8080/task/get-tasks', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json(); 
            return [...data?.allTasks];
        } else {
            const data = response.json();
            return data?.message
        }
    } catch (error) {
        return error
    }
})
export const addTaskCall = createAsyncThunk('/task/addTask', async (payload, thunkAPI) => {
    try {
        const response =
            await fetch('http://localhost:8080/task/create-task',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                },
            )

        const data = await response.json();
        return data


    } catch (error) {
        return error
    }
})

export const updateTask = createAsyncThunk('/task/updateTask', async (payload, thunkAPI) => {
    try {
        const response = await fetch('http://localhost:8080/task/update-task',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

        const data = await response.json();
        return data?.updatedTask
    } catch (error) {
        return error
    }
})

export const updateTaskStatus = createAsyncThunk('/task/updateTaskStatus', async (payload, thunkAPI) => {
    try {
        const response =
            await fetch('http://localhost:8080/task/udpate-status',
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

export const RemoveTask = createAsyncThunk('/tasks/removeTask', async (payload, thunkAPI) => {
    try {
        const response = await fetch(`http://localhost:8080/task/remove-task/${payload}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
               
            })
        if (!response.ok) {
            return 'Unable to remove'
        }
        return payload
    } catch (error) {
        return error
    }
})

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        UpdatePriority: (state, action) => {
            state.tasks = [...action?.payload]
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload || [];
            state.status = 'succeeded';
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.status = 'rejected'
        })

        builder.addCase(addTaskCall.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(addTaskCall.fulfilled, (state, action) => {
            if (action.payload) {
              state.tasks.push(action.payload);
            }
            state.status = 'succeeded';
        });
        builder.addCase(addTaskCall.rejected, (state, action) => {
            state.status = 'rejected'
        })

        builder.addCase(updateTask.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {

            const indexToUpdate = state.tasks.findIndex(item => item._id === action?.payload?._id);
            if (indexToUpdate !== -1) {
                state.tasks[indexToUpdate] = action?.payload;
            }
            state.status = 'succeeded';
        })
        builder.addCase(updateTask.rejected, (state, action) => {
            state.status = 'rejected'
        })

        builder.addCase(updateTaskStatus.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            const indexToUpdate = state.tasks.findIndex(item => item?._id === action?.payload?._id);
            if (indexToUpdate !== -1) {
                state.tasks[indexToUpdate] = action.payload;
            }
            state.status = 'succeeded';
        })
        builder.addCase(updateTaskStatus.rejected, (state, action) => {
            state.status = 'rejected'
        })

        builder.addCase(RemoveTask.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(RemoveTask.fulfilled, (state, action) => {
            const filteredTask = state.tasks.filter((item) => item._id !== action?.payload)
            state.tasks = [...filteredTask]
            state.status = 'succeeded';
        })
        builder.addCase(RemoveTask.rejected, (state, action) => {
            state.status = 'rejected'
        })
    }
})

export const getAllTasks = (state) => (state.taskReducer.tasks)
export const { UpdatePriority } = taskSlice.actions
export default taskSlice.reducer