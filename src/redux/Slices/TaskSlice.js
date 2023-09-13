import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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
            const data = await response.json(); // Parse the response body as JSON
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
        console.log("Action payload is ", payload);
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
export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        // addTasks: (state, action) => {
        //     state.tasks.push(action?.payload)
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.status = 'succeeded';
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.status = 'rejected'
        })
        builder.addCase(addTaskCall.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(addTaskCall.fulfilled, (state, action) => {
            console.log("Got something in action ", action);
            state.tasks.push(action.payload);
            state.status = 'succeeded';
        })
        builder.addCase(addTaskCall.rejected, (state, action) => {
            state.status = 'rejected'
        })

    }
})

export const getAllTasks = (state) => (state.taskReducer.tasks)
// export const { addTask } = taskSlice.actions
export default taskSlice.reducer