import { useDrop } from "react-dnd"
import Task from "./Task"

const ListSection = ({ status, todos, inProgress, closed, setTodos, setInProgress, setclosed, setTasks, tasks }) => {
    let text = "ToDo"
    let background = "bg-slate-500"
    let tasksToMap = todos
    const addItemToSection = (id) => {
        setTasks((prev) => {
            const mTasks = prev.map((t) => {
                if (t.id === id) {
                    return { ...t, status, status: status }
                }
                return t
            })
            localStorage.setItem('tasks', JSON.stringify(mTasks))
            return mTasks
        })
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
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

    return (
        <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-500" : ""}`}>
            <Header text={text} background={background} count={tasksToMap?.length} />
            {
                tasksToMap?.length > 0 && (
                    tasksToMap.map((task) => (
                        <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
                    ))
                )
            }
        </div>
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

