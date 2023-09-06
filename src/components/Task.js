import React from 'react'
import { useDrag } from 'react-dnd'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { toast } from 'react-toastify'
function Task({ task, tasks, setTasks }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { _id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleRemove = (id) => {
        const fTasks = tasks.filter((item) => item.id !== id)
        setTasks(fTasks)
        localStorage.setItem('tasks', JSON.stringify(fTasks))
        toast.success("Task removed")
    }
    return (
        <div ref={drag} className={`relative p-4 mt-8  shadow-md cursor-grab bg-slate-300 rounded-md text-black ${isDragging ? 'opacity-25' : 'opacity-100'}`}>
            <div className='flex justify-between'>
                <h1 className='text-lg'>{task?.title}</h1>
                <IoMdRemoveCircleOutline color='black' className='cursor-pointer' size={20} onClick={() => { handleRemove(task.id) }} />
            </div>
        </div>
    )
}

export default Task
