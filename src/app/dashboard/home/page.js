'use client'
import TasksHome from '@/pages/TasksHome'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

function page() {
    const [name, setName] = useState('')
    useEffect(() => {
        const profile = Cookies.get('userProfile')
        if (!!profile) {
            const parsedProfile = JSON.parse(profile)
            setName(parsedProfile?.name)
        }
    }, [])
    return (
        <div className='w-full rounded-lg min-h-[90vh] flex flex-col justify-center items-center bg-slate-700 text-white'>
            <p className='text-5xl'>Welcome <span className='text-6xl font-semibold'>{name}</span></p>
            <div className='flex justify-center flex-wrap mt-10'>
                <div className='bg-slate-400 rounded-xl w-48 h-48 m-5 flex flex-col justify-center text-center text-slate-700'>
                    <p className='text-md'>Completed Tasks</p>
                </div>
                <div className='bg-slate-400 rounded-xl w-48 h-48 m-5 flex flex-col justify-center text-center text-slate-700'>
                    <p className='text-md'>Tasks In Progress</p>
                </div>
                <div className='bg-slate-400 rounded-xl w-48 h-48 m-5 flex flex-col justify-center text-center text-slate-700'>
                    <p className='text-md'>Task pending</p>
                </div>
            </div>
        </div>
    )
}

export default page
