
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ProfileImage from '../../public/transparent_profile_photo.webp'
import Cookies from 'js-cookie';
import { AiFillEdit, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '@/redux/Slices/UserSlice';

function Navbar({showSideBar, setSideBar}) {
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false)
    const modalRef = useRef(null);
    const [show, setShow] = useState(false)
    const [userId, setUserId] = useState('')
    const [editInput, setEditInput] = useState({
        name: '',
        email: '',
        password: '',
        designation: '',
    })

    const dispatch = useDispatch()

    const setInputs = () => {
        const profile  = Cookies.get("userProfile")
        if (profile) {
            const parsedProfile = JSON.parse(profile);
            setEditInput({
                name: parsedProfile?.name || "",
                email: parsedProfile?.email || "",
                designation: parsedProfile?.designation || "",
                password: parsedProfile?.password || "",
            })
            setUserId(parsedProfile?._id || "")
            setName(parsedProfile?.name);
        }

    }
    useEffect(() => {
        setInputs()
    }, []);

    const handleInput = (type, value) => {
        setEditInput((prev) => ({ ...prev, [type]: value }))
    }

    const handleEditModel = (event) => {
        event.preventDefault()
        const updatedData = {
            _id: userId,
            userDetails: editInput
        }
        dispatch(updateUserProfile(updatedData))
        Cookies.set("userProfile", JSON.stringify(editInput))
        setEdit(false)
    }
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
                        <div className='mx-2 cursor-pointer text-white p-3 hover:text-slate-700 hover:bg-white rounded-lg transition-all ease-in-out'
                            onClick={() => { setInputs(); setEdit(!edit) }}
                        >
                            <AiFillEdit size={25} />
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`${edit ? 'fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center' : 'hidden'}`}>
                <div ref={modalRef} className={`relative bg-white rounded-3xl shadow w-full max-w-2xl`}>
                    <div className="relative w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow ">
                            <div className="flex items-start justify-between p-4 bg-slate-900 border-b rounded-t ">
                                <h3 className="text-xl font-semibold  text-white ">
                                    Edit User Profile
                                </h3>
                                <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" onClick={() => setEdit(false)}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className='p-4 bg-slate-200 rounded-b'>
                                <form className="space-y-6" onSubmit={handleEditModel}>
                                    <div className="grid grid-cols-2 gap-x-2">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                                            <input type="name" name="text"
                                                value={editInput?.name}
                                                onChange={(e) => { handleInput('name', e.target.value) }}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                placeholder="Full Name" required />
                                        </div>
                                        <div>
                                            <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 ">Your Designation</label>
                                            <input type="designation" name="text"
                                                value={editInput?.designation}
                                                onChange={(e) => { handleInput('designation', e.target.value) }}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                placeholder="designation" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                        <input type="email" name="email"
                                            value={editInput?.email}
                                            autoComplete='false'
                                            onChange={(e) => { handleInput('email', e.target.value) }}
                                            id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            placeholder="name@company.com" required />
                                    </div>
                                    <div >
                                        <label htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                                        <div className='flex items-center'>
                                            <input
                                                type={show ? "text" : "password"}
                                                value={editInput?.password}
                                                name="password"
                                                autoComplete='false'
                                                onChange={(e) => { handleInput('password', e.target.value) }}
                                                id="password"
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                required />
                                            {show ? (<AiOutlineEye size={20} onClick={() => { setShow(!show) }} className='cursor-pointer ml-2' />) :
                                                (<AiOutlineEyeInvisible size={20} onClick={() => { setShow(!show) }} className='cursor-pointer ml-2' />)
                                            }
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Update the Profile</button>

                                </form>
                            </div>
                            {/* 
                            <div className="flex items-center p-6 space-x-2 border-t border-slate-200 rounded-b bg-slate-200">
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                    onClick={() => setEdit(false)}>I accept</button>
                                <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                                    onClick={() => setEdit(false)}
                                >Decline</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
