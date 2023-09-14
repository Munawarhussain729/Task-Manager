'use client'
import CreateTask from '@/components/CreateTask'
import ListTasks from '@/components/ListTasks'
import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, getAllTasks } from '@/redux/Slices/TaskSlice';

function TasksHome() {
  const [tasks, setTasks] = useState([])
  const dispatch = useDispatch()
  const reduxTasks = useSelector(getAllTasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])


  return (
    <DndProvider backend={HTML5Backend}>

      {
        reduxTasks.length>0 ? (
          <div className='w-full rounded-lg min-h-[90vh] flex flex-col items-center bg-slate-700 text-white'>
            <CreateTask />
            <ListTasks />
          </div>
        ) : (
          <Spinner />
        )
      }
    </DndProvider>
  )
}

export default TasksHome
