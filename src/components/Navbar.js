
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ProfileImage from '../../public/transparent_profile_photo.webp'
import Cookies from 'js-cookie';
import { signIn, signOut, useSession } from "next-auth/react"
function Navbar({showSideBar, setSideBar}) {
    const [name, setName] = useState('');
    const { data: session } = useSession()

    useEffect(() => {
        // const profile = localStorage.getItem('userProfile');
        const profile  = Cookies.get("userProfile")
        if (!!profile) {
            const parsedProfile = JSON.parse(profile);
            setName(parsedProfile?.name);
        }

    }, []);
    return (
        <div>
            <nav className="bg-slate-900 h-[9vh]">
                <div className="max-w-screen flex items-center justify-between mx-10 p-4">
                    <div className='flex'>
                        <button className='text-white' onClick={()=>{setSideBar(!showSideBar)}}>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <h1 className='ml-5 text-2xl font-semibold text-white'>Task Manager</h1>
                    </div>

                    <div className="flex items-center" >
                        <Image src={ProfileImage} width={50} height={50} alt='username' className='rounded-full bg-cover' />
                        <h1 className='ml-5 text-xl font-semibold text-white'>{name}</h1>
                        {session ? (<button onClick={() => signOut()}>signOut</button>) : (<button onClick={() => signIn()}>SignIn</button>)}
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
