import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ListSection from './ListSection'
import DropDown from './DropDown';
import { MdCancel } from 'react-icons/md'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, getAllTasks, updateTask } from '@/redux/Slices/TaskSlice';
import {  getProjectTasks, getProjectUsers } from '@/redux/Slices/ProjectSlice';

function ListTasks() {
    const [todos, setTodos] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [closed, setclosed] = useState([])
    const [dateValue, setDateValue] = useState(new Date());
    const [priority, setPriority] = useState('')
    const [description, setDescription] = useState('')
    const [assignPerson, setAssignPerson] = useState('')
    const [selectedTask, setSelectedTask] = useState(null)
    const textAreaRef = useRef(null)

    const tasks = useSelector(getProjectTasks)
    const dispatch = useDispatch()
    const allUsers = useSelector(getProjectUsers)
    const handleDateChange = newValue => {
        setDateValue(newValue);
    };

    const convertDateFormat = (oldFormat) => {
        const originalDate = new Date(oldFormat);
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const newDateStr = `${year}-${month}-${day}`;
        return newDateStr
    }

    useEffect(() => {
        const tempTodos = tasks?.filter((item) => item?.status === "toDo")
        const tempInProgress = tasks?.filter((item) => item?.status === "inProgress")
        const tempClosed = tasks?.filter((item) => item?.status === "closed")
        setTodos(tempTodos)
        setInProgress(tempInProgress)
        setclosed(tempClosed)
    }, [tasks])

    useEffect(() => {
        textAreaRef.current.style.height = "auto";
        const scrollHeight = textAreaRef.current.scrollHeight;
        const maxHeight = 200;

        if (scrollHeight > maxHeight) {
            textAreaRef.current.style.height = `${maxHeight}px`;
        } else {
            textAreaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [description])

    useEffect(() => {
        if (!!selectedTask) {
            setDescription(selectedTask.description)
            setAssignPerson(selectedTask.assignedTo)
            setPriority(selectedTask.priority)
            setDateValue(convertDateFormat(selectedTask.dueDate))
            if (textAreaRef.current) {
                textAreaRef.current.style.height = "auto";
            }
        }
    }, [selectedTask])

 
    const handleSaveClick = async (taskId) => {
        try {
            const detailObject = {
                assignedTo: assignPerson,
                dueDate: dateValue,
                priority: priority,
                description: description
            }
            setSelectedTask(null)
            dispatch(updateTask({ _id: taskId, details: detailObject }))
        } catch (error) {
            console.log("unable to update: ", error);
        }
    }

    const status = ['toDo', 'inProgress', 'closed']
    return (
        <>
            <div className='flex gap-16'>
                {status.map((item, index) => (
                    <ListSection
                        key={index}
                        status={item}
                        todos={todos}
                        inProgress={inProgress}
                        closed={closed}
                        setSelectedTask={setSelectedTask}
                    />
                ))}
            </div>

            <div
                className={`bg-slate-300 p-5 h-[90vh]  absolute rounded-xl text-black right-0 
            ${selectedTask ? "w-[45rem] visible" : "w-0 invisible "} overflow-x-hidden transition-all 
            duration-300 ease-in-out `}>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl'>{selectedTask?.title}</h1>
                    <MdCancel size={30}
                        className='cursor-pointer'
                        onClick={() => { setSelectedTask(null) }} />
                </div>
                <hr className='h-1 my-3 bg-slate-400' />
                <div className='flex items-center flex-wrap w-full md:w-1/2 my-5'>
                    <p className='m-0 md:mr-10'>Assign:</p>
                    <div className='flex-1 mx-3'>
                        <DropDown value={assignPerson || ''} setValue={setAssignPerson} Useroptions={allUsers} label={'Select Person'} />
                    </div>
                </div>
                <div className='flex items-center flex-wrap w-full md:w-1/2 my-5'>
                    <p className='m-0 md:mr-10'>Due Date:</p>
                    <input
                        type='date'
                        value={dateValue}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className='p-3 rounded-lg' />
                </div>

                <div className='flex items-center flex-wrap w-full md:w-1/2 my-5'>
                    <p className='m-0 md:mr-4'>Task priority:</p>
                    <div className='flex-1'>
                        <DropDown value={priority|| ''} setValue={setPriority} options={['High', 'medium', 'low']} label={'Select Task priority'} />
                    </div>
                </div>
                <div >
                    <h3 className='my-3'>Description:</h3>
                    <textarea
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        ref={textAreaRef}
                        className='p-2 w-full rounded-lg focus:outline-gray-400'
                        rows={3} />
                </div>
                <hr className='h-1 my-3 bg-slate-400' />
                <button
                    className=" top-2 right-2 p-2 bg-gray-50 hover:bg-gray-600 hover:text-white w-40 rounded-lg cursor-pointer"
                    onClick={() => { handleSaveClick(selectedTask._id) }}>
                    Save Task
                </button>
            </div>


        </>
    )
}



export default ListTasks
