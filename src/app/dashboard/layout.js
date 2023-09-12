'use client'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { AiOutlineHome } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
function layout({ children }) {
    const [showSideBar, setSideBar] = useState(true)
    const router = useRouter()
    return (
        <div className='overflow-hidden bg-slate-200 min-h-screen'>
            <Navbar showSideBar={showSideBar} setSideBar={setSideBar} />
            <div className='overflow-hidden py-1 '>
                <div
                    className={`bg-slate-900 p-5 h-[90vh] absolute  text-slate-300 rounded-lg left-0 
                        ${showSideBar ? "w-[15vw] visible" : "w-0 invisible "} overflow-x-hidden transition-all 
                        duration-300 ease-in-out `}>
                    <div className='flex items-center my-4 cursor-pointer transition-all p-5 rounded-lg ease-in-out bg-slate-900 transform-gpu
                 text-slate-300 hover:bg-slate-300 hover:text-slate-900' onClick={() => { router.push('/dashboard/home') }}>
                        <AiOutlineHome size={20} />
                        <h1 className='ml-2 text-lg'>Home</h1>
                    </div>

                    <div className='flex items-center my-4 cursor-pointer transition-all p-5 rounded-lg ease-in-out bg-slate-900 transform-gpu
                 text-slate-300 hover:bg-slate-300 hover:text-slate-900' onClick={() => { router.push('/dashboard/mytask') }}>
                        <IoCheckmarkDoneCircleOutline size={20} />
                        <h1 className='ml-2 text-lg'>My Tasks</h1>
                    </div>
                    <hr className='h-0.5 my-3 bg-slate-400' />

                </div>
            </div>
            <div className={` ${showSideBar ? 'w-[82.9vw] ml-[16vw]' : 'ml-[1vw] w-[98vw]'}`}>
                {children}
            </div>
        </div>
    )
}

export default layout
