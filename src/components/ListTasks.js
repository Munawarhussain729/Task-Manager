import React, { useEffect, useRef, useState } from 'react'
import ListSection from './ListSection'
import DropDown from './DropDown';

function ListTasks({ tasks, setTasks }) {
    const [todos, setTodos] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [closed, setclosed] = useState([])
    const [isSidebarVisible, setSidebarVisible] = useState(false)
    const [dateValue, setDateValue] = useState(new Date());
    const [priority, setPriority] = useState('')
    const [description, setDescription] = useState('')
    const [assignPerson, setAssignPerson] = useState('')
    const [selectedTask, setSelectedTask] = useState(null)
    const textAreaRef = useRef(null)

    const handleDateChange = newValue => {
        console.log("New value ", newValue);
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
        textAreaRef.current.style.height = "auto"
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
    }, [description])
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
                        setTodos={setTodos}
                        setInProgress={setInProgress}
                        setclosed={setclosed}
                        tasks={tasks}
                        setTasks={setTasks}
                        setSelectedTask={setSelectedTask}
                    />
                ))}
            </div>

            <div
                className={`bg-slate-300 p-5  min-h-screen absolute rounded-xl text-black right-0 
            ${selectedTask ? "w-[45rem] visible" : "w-0 invisible "} overflow-x-hidden transition-all 
            duration-300 ease-in-out `}>
                <button className=" top-2 right-2 p-2 bg-gray-50 hover:bg-gray-600 hover:text-white w-40 rounded-lg" onClick={() => { setSelectedTask(null) }}>
                    Save Task
                </button>
                <hr className='h-1 my-3 bg-slate-400' />
                <h2 className='text-3xl'>Title</h2>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='flex items-center flex-wrap'>
                        <p className='m-0 md:pr-5'>Assign:</p>
                        <div className='flex-1 mx-3'>
                            <DropDown value={assignPerson} setValue={setAssignPerson} options={['User1', 'User2', 'User3']} label={selectedTask?.assignedTo || 'Select Person'} />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <p>Due Date:</p>
                        <input type='date' value={selectedTask ? convertDateFormat(selectedTask.dueDate) : dateValue} onChange={(e) => handleDateChange(e.target.value)} className='py-1 px-2 rounded-lg' />
                    </div>
                </div>
                <div className='max-w-[12rem] my-3'>
                    <DropDown value={selectedTask?.priority || priority} setValue={setPriority} options={['High', 'medium', 'low']} label={'Select Task priority'} />
                </div>
                <div >
                    <h3>Description:</h3>
                    <textarea
                        value={selectedTask?.description || description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        ref={textAreaRef}
                        className='p-2 w-full rounded-lg focus:outline-gray-400'
                        rows={3} />
                </div>
            </div>


        </>
    )
}



export default ListTasks
