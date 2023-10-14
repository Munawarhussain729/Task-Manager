import { useDrop } from "react-dnd"
import Task from "./Task"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import {  getAllTasks, updateTaskStatus } from "@/redux/Slices/TaskSlice"
import { fetchProjectTasks, getProjectTasks, getTaskStatus, updateProjectTaskStatus } from "@/redux/Slices/ProjectSlice"
import { useEffect } from "react"


const ListSection = ({ status, todos, inProgress, closed, setSelectedTask, projectId }) => {
    let text = "ToDo"
    let background = "bg-slate-500"
    let tasksToMap = todos
    const dispatch = useDispatch()
    const tasks = useSelector(getProjectTasks)
    const taskStatus = useSelector(getTaskStatus)

    const UpdateItemPriority = async (taskId, taskStatus) => {
        
        dispatch(updateProjectTaskStatus({ _id: taskId, status: taskStatus }))
    }

    const addItemToSection = (id) => {
        console.log("Taska are ", tasks);
        const mTasks = tasks.map((t) => {
                // console.log("Task id ", t);
                console.log("Drooped one is ", id);
                if (t._id === id) {
                    UpdateItemPriority(id, status)
                    return { ...t, status, status: status }
                }
                return t
        })
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item._id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    if (status === "inProgress") {
        text = "In Progress"
        background = "bg-purple-600"
        tasksToMap = inProgress
    }
    if (status === "closed") {
        text = "Done"
        background = "bg-green-600"
        tasksToMap = closed
    }

    useEffect(()=>{
        if(taskStatus){
            dispatch(fetchProjectTasks(projectId))
        }
    },[taskStatus])

    return (
        <>
            <div ref={drop} className={`w-80 rounded-md p-2 ${isOver ? "bg-slate-500" : ""}`}>
                <Header text={text} background={background} count={tasksToMap?.length} />
                {
                    tasksToMap?.length > 0 && (
                        tasksToMap.map((task, index) => (
                            <div key={index}>
                                <Task key={task.id} task={task} setSelectedTask={setSelectedTask} projectId={projectId} />
                            </div>
                        ))
                    )
                }
            </div>

        </>
    )
}

export default ListSection

const Header = ({ text, background, count }) => {
    return (
        <div className={`flex p-2 items-center w-full h-12 text-lg justify-center rounded-md ${background}`}>
            {text}
            <div className="w-5 h-5 flex justify-center bg-white rounded-full mx-2 text-black text-sm text-center items-center">
                {count}
            </div>
        </div>
    )
}

