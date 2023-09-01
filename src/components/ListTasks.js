import React, { useEffect, useState } from 'react'
import ListSection from './ListSection'

function ListTasks({ tasks, setTasks }) {
    const [todos, setTodos] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [closed, setclosed] = useState([])
  

    useEffect(() => {
        const tempTodos = tasks?.filter((item) => item?.status === "toDo")
        const tempInProgress = tasks?.filter((item) => item?.status === "inProgress")
        const tempClosed = tasks?.filter((item) => item?.status === "closed")
        setTodos(tempTodos)
        setInProgress(tempInProgress)
        setclosed(tempClosed)
    }, [tasks])

    const status = ['toDo', 'inProgress', 'closed']
    return (
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
                />
            ))}
        </div>
    )
}



export default ListTasks
