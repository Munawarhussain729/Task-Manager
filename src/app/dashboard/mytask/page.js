'use client'
import MU_Table from '@/components/MU_Table'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function page() {
    const [myTasks, setMyTasks] = useState([])
    useEffect(async () => {
        const profile = localStorage.getItem('userProfile');
        if (profile) {
            const parsedProfile = JSON.parse(profile);
            const response = await fetch(`http://localhost:8080/user/my-tasks/${parsedProfile._id}`, { method: 'GET' })
            if(!response.ok){
                toast.error("Unable to get tasks")
            }else{
                const responseData = await response.json()
                setMyTasks(responseData?.userTasks)
                console.log("Respose tasks ", responseData);
            }
        } else {
            toast.error("Couldn't find the user")
        }
        return
    }, [])
    return (
        <div>
            <MU_Table myTasks={myTasks} />
        </div>
    )
}

export default page
