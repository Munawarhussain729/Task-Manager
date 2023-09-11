'use client'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
function layout({ children }) {
    const [showSideBar, setSideBar] = useState(true)
    return (
        <div className='overflow-hidden'>
            <Navbar showSideBar={showSideBar} setSideBar={setSideBar} />
            <div>
                <div
                    className={`bg-slate-900 p-5  min-h-screen absolute  text-slate-300 rounded left-0 
                        ${showSideBar ? "w-[17rem] visible" : "w-0 invisible "} overflow-x-hidden transition-all 
                        duration-300 ease-in-out `}>
                    <div className='flex items-center'>
                        <IoCheckmarkDoneCircleOutline size={20} />
                        <h1 className='ml-2 text-lg'>My Tasks</h1>
                    </div>
                    <hr className='h-0.5 my-3 bg-slate-400' />

                </div>
            </div>
            {children}
        </div>
    )
}

export default layout
