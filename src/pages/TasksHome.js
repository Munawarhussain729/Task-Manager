'use client'
import CreateTask from '@/components/CreateTask'
import ListTasks from '@/components/ListTasks'
import Spinner from '@/components/Spinner';
import React, { useEffect, useState } from 'react'
import { MdCelebration } from 'react-icons/md'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjectTasks, fetchProjectUser, getProjectTaskUpdate, getProjectTasks, removeProjectTasks } from '@/redux/Slices/ProjectSlice';

function TasksHome({ projectId }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const reduxTasks = useSelector(getProjectTasks)
  const TaskUpdate = useSelector(getProjectTaskUpdate)
  const removeTask = useSelector(removeProjectTasks)



  useEffect(() => {
    const fetchTasksTimeout = setTimeout(() => {
      setLoading(false);
    }, 100000); // 50 seconds in milliseconds

    dispatch(fetchProjectTasks(projectId))
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
    if (TaskUpdate || removeTask) {
      dispatch(fetchProjectTasks(projectId))
    }
  }, [TaskUpdate, removeTask])

  useEffect(() => {
    dispatch(fetchProjectUser(projectId))
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      {loading ? (
        <Spinner />
      ) : (
        <div className='w-full rounded-lg min-h-[90vh] flex flex-col items-center bg-slate-700 text-white'>
          <CreateTask projectId={projectId} />
          {reduxTasks.length > 0 ? (
            <>
              {/* <h1 className='text-white font-7xl'>hey there man</h1> */}
              <ListTasks projectId={projectId}/>
            </>
          ) : (
            <div className=' min-h-[90vh] w-full flex justify-center items-center'>
              <p className='text-2xl font-semibold ml-10 mt-2'>No tasks found</p>
              <MdCelebration size={40} color='white' />
            </div>
          )}
        </div>
      )}
    </DndProvider>
  )
}

export default TasksHome
