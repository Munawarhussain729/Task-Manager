import React from 'react'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { AiOutlineHome } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';
import Collapsable from './Collapsable'

function SideBar({ showSideBar }) {
    const router = useRouter()
    let { data: session } = useSession()
    const handleSignout = async () => {
        await signOut();
        Cookies.remove("userProfile")
        router.push('/')

    }
    return (
        <div className='overflow-hidden py-1 '>
            <div
                className={`bg-slate-900 p-5 h-[90vh] absolute flex flex-col justify-between text-slate-300 rounded-lg left-0 
                ${showSideBar ? "w-[15vw] visible" : "w-0 invisible "} overflow-x-hidden transition-all 
                duration-300 ease-in-out `}
            >   <div>
                    <div className='flex items-center my-4 cursor-pointer transition-all p-3 rounded-lg ease-in-out bg-slate-900 
                        transform-gpu text-slate-300 hover:bg-slate-300 hover:text-slate-900'
                        onClick={() => { router.push('/dashboard/home') }}>
                        <AiOutlineHome size={20} />
                        <h1 className='ml-2 text-lg'>Home</h1>
                    </div>

                    <div className='flex items-center my-4 cursor-pointer transition-all p-3 rounded-lg ease-in-out bg-slate-900
                         transform-gpu text-slate-300 hover:bg-slate-300 hover:text-slate-900'
                        onClick={() => { router.push('/dashboard/mytask') }}>
                        <IoCheckmarkDoneCircleOutline size={20} />
                        <h1 className='ml-2 text-lg'>My Tasks</h1>
                    </div>
                    <hr className='h-0.5 my-3 bg-slate-400' />
                    <Collapsable title={"Title project "} subTitles={["project 1", "project 2", "project 3"]} />
                </div>
                <div>
                    <hr className='h-0.5 my-3 bg-slate-400' />
                    <div className='flex items-center mb-4 mt-2 cursor-pointer transition-all p-3 rounded-lg ease-in-out bg-slate-900 
                        transform-gpu text-slate-300 hover:bg-slate-300 hover:text-slate-900'
                        onClick={handleSignout}>
                        <GoSignOut size={20} />
                        <h1 className='ml-2 text-lg'>Sign out</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
