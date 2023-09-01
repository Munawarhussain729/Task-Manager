'use client'
import CreateTask from '@/components/CreateTask'
import ListTasks from '@/components/ListTasks'
import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function TasksHome() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!!localStorage.getItem('tasks')) {
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    }
  }, [])


  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-screen min-h-screen flex flex-col items-center bg-gray-700 text-white'>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  )
}

export default TasksHome
