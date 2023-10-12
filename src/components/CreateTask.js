import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskCall } from '@/redux/Slices/TaskSlice';
import DropDown from './DropDown';
import { fetchAllUsers, getAllUsers } from '@/redux/Slices/UserSlice';
import { addProjectUser, fetchProjectUser } from '@/redux/Slices/ProjectSlice';

function CreateTask({ projectId }) {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "toDo"
    })
    const users = useSelector(getAllUsers) || []
    const [userToAdd, setUserToAdd] = useState('Add User')
    const dispatch = useDispatch()
    const projectStatus = useSelector((state) => (state?.projectReducer?.projectUsersStatus))

    useEffect(() => {
        if (projectStatus === "pending") {
            dispatch(fetchProjectUser(projectId))
        }
    }, [projectStatus])
    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    const addTheUser = () => {
        dispatch(addProjectUser({ userId: userToAdd, projectId: projectId }))
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (task?.name?.length < 3) {
            toast.error("Ticket length should be greater then 3 character")
            return
        }
        const taskPayload = { title: task.name };
        dispatch(addTaskCall(taskPayload))
        setTask({ id: '', name: '', status: 'toDo' })
    }
    return (
        <div className='container flex justify-between'>
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
            <div className='flex items-center justify-center '>
                <div className='w-72 mr-5'>
                    <DropDown value={userToAdd} setValue={setUserToAdd} Useroptions={users} label={'Select user'} />

                </div>
                <button
                    onClick={addTheUser}
                    className='bg-black rounded-full w-40 h-14 text-white text-xl'
                >
                    Add a User
                </button>
            </div>
        </div>
    )
}

export default CreateTask

