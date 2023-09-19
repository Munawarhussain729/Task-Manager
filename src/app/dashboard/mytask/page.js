'use client'
import MU_Table from '@/components/MU_Table'
import Spinner from '@/components/Spinner';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function page() {
    const [myTasks, setMyTasks] = useState([])
    useEffect(() => {
        const fetchMyTasks = async () => {
            const parsedProfile = JSON.parse(profile);
            const response = await fetch(`http://localhost:8080/user/my-tasks/${parsedProfile._id}`, { method: 'GET' })
            if (!response.ok) {
                toast.error("Unable to get tasks")
            } else {
                const responseData = await response.json()
                setMyTasks(responseData?.userTasks)
            }
        }
        const profile =Cookies.get("userProfile")
        if (profile) {
            fetchMyTasks()
        } else {
            toast.error("Couldn't find the user")
        }
    }, [])
    return (
        <div className='bg-slate-700 h-[90vh] rounded-lg'>
            {
                myTasks ? (<MU_Table myTasks={myTasks} />) : (<Spinner />)
            }
        </div>
    )
}

export default page
