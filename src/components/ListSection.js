import { useDrop } from "react-dnd"
import Task from "./Task"


const ListSection = ({ status, todos, inProgress, closed, setTodos, setInProgress, setclosed, setTasks, tasks, setSelectedTask }) => {
    let text = "ToDo"
    let background = "bg-slate-500"
    let tasksToMap = todos
    const UpdateItemPriority = async (taskId, taskStatus) => {
        try {
            const response =
                await fetch('http://localhost:8080/task/udpate-status',
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ _id: taskId, status: taskStatus }),
                    },
                )

            const data = await response.json();
            console.log("Got the response ", data);
        } catch (error) {
            console.log("Found an error ", error);
        }

    }
    const addItemToSection = (id) => {
        console.log("Task Id is ", id);

        setTasks((prev) => {
            const mTasks = prev.map((t) => {
                if (t._id === id) {
                    UpdateItemPriority(id, status)
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

    return (
        <>
            <div ref={drop} className={`w-80 rounded-md p-2 ${isOver ? "bg-slate-500" : ""}`}>
                <Header text={text} background={background} count={tasksToMap?.length} />
                {
                    tasksToMap?.length > 0 && (
                        tasksToMap.map((task, index) => (
                            <div key={index} onClick={() => setSelectedTask(task)}>
                                <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
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

