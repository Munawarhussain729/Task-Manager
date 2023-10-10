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
import { fetchAllProjects } from '@/redux/Slices/ProjectSlice';

function TasksHome() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const reduxTasks = useSelector(getAllTasks)



  useEffect(() => {
    const fetchTasksTimeout = setTimeout(() => {
      setLoading(false);
    }, 50000); // 50 seconds in milliseconds

    dispatch(fetchTasks())
      .then(() => {
        clearTimeout(fetchTasksTimeout);
        setLoading(false);
      })
      .catch((error) => {
        clearTimeout(fetchTasksTimeout);
        setLoading(false);
        console.error("Failed to fetch tasks:", error);
        toast.error("Failed to fetch tasks. Please try again later.");
      });

    return () => {
      clearTimeout(fetchTasksTimeout);
    };
  }, [])

  useEffect(() => {
    dispatch(fetchAllProjects())
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      {loading ? (
        <Spinner />
      ) : (
        <div className='w-full rounded-lg min-h-[90vh] flex flex-col items-center bg-slate-700 text-white'>
          {reduxTasks.length > 0 ? (
            <>
              <CreateTask />
              <ListTasks />
            </>
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      )}
    </DndProvider>
  )
}

export default TasksHome
