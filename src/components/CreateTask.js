import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
function CreateTask({ tasks, setTasks }) {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "toDo"
    })
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (task?.name?.length < 3) {
            toast.error("Ticket length should be greater then 3 character")
            return
        }
        setTasks((prev) => {
            const list = [...prev, task]
            localStorage.setItem('tasks', JSON.stringify(list))
            toast.success("Toast created");
            return list
        })
        setTask({ id: '', name: '', status: 'toDo' })
    }
    return (
        <div className='container'>
            <ToastContainer />
            <form
                onSubmit={handleOnSubmit}
                className='flex items-center justify-center'>
                <input type='text'
                    value={task?.name}
                    className='border-2 border-slate-400 m-10 py-2 px-2 w-full md:w-72 rounded-xl bg-slate-400 text-black
                     text-xl focus:outline-none '
                    onChange={(e) => { setTask({ ...task, id: uuidv4(), name: e.target.value }) }}
                />
                <button
                    type='submit'
                    className='bg-black rounded-full w-40 h-14 text-white text-xl'
                >
                    Create Task
                </button>
            </form>
        </div>
    )
}

export default CreateTask
