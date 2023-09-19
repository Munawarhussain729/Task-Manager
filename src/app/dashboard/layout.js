'use client'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

import SideBar from '@/components/SideBar'

function layout({ children }) {
    const [showSideBar, setSideBar] = useState(true)

    return (
        <div className='overflow-hidden bg-slate-200 min-h-screen'>
            <Navbar showSideBar={showSideBar} setSideBar={setSideBar} />
            <SideBar showSideBar={showSideBar} />
            <div className={` ${showSideBar ? 'w-[82.9vw] ml-[16vw]' : 'ml-[1vw] w-[98vw]'}`}>
                {children}
            </div>
        </div>
    )
}

export default layout
