import { RemoveTask, getAllTasks } from '@/redux/Slices/TaskSlice'
import React from 'react'
import { useDrag } from 'react-dnd'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
function Task({ task, setSelectedTask }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { _id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const tasks = useSelector(getAllTasks)
    const dispatch = useDispatch()


    const handleRemove = () => {
        dispatch(RemoveTask(task._id))
        toast.success("Task removed")
    }
    return (
        <>
            {task.title && (
                <div ref={drag} className={`relative p-4 mt-8  shadow-md cursor-grab bg-slate-300 rounded-md text-black ${isDragging ? 'opacity-25' : 'opacity-100'}`}>
                    <div className='flex justify-between'>
                        <h1 className='text-lg flex-1' onClick={() => { setSelectedTask(task) }}>{task?.title}</h1>
                        <IoMdRemoveCircleOutline color='black' className='cursor-pointer' size={20} onClick={() => { handleRemove() }} />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Task
