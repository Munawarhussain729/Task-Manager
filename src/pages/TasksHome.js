'use client'
import CreateTask from '@/components/CreateTask'
import ListTasks from '@/components/ListTasks'
import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function TasksHome() {
  const [tasks, setTasks] = useState([])

  // useEffect(() => {
  //   if (!!localStorage.getItem('tasks')) {
  //     setTasks(JSON.parse(localStorage.getItem('tasks')))
  //   }
  // }, [])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:8080/task/get-tasks', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        setTasks(data?.allTasks)
        console.log("API response is ", data);
      } else {
        console.error("API request failed with status", response.status);
      }
    }
    fetchTasks()
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
