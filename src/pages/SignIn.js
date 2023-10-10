'use client'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useSession } from "next-auth/react"
import { signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux'
import { validateGoogleUser } from '@/redux/Slices/UserSlice'

function SignIn() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)
    const router = useRouter()
    const { data: session } = useSession()
    const { data } = useSession()
    const dispatch = useDispatch()
    // const [userProfile, setUserProfile] = useState(localStorage?.getItem('userProfile') || '');

    const handleInputChange = (eventValue, type) => {
        try {
            setInputs({ ...inputs, [type]: eventValue })
        } catch (error) {
            console.log("Error is ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!!session) {
                if (session?.user?.email) {
                    console.log("user details ", session?.user);
                    await dispatch(validateGoogleUser(session.user))
                }
            }
            if (Cookies.get('userProfile')) {
                router.push('/dashboard/home')
            }
        };

        fetchData();
    }, [session]);

    // useEffect(()=>{
    //     if(userProfile.length>0){
    //         toast.success("Inside Signin Successfull")
    //     }
    //     console.log("User prpofile in signin ", userProfile);
    // },[userProfile])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/validate-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
            })
            if (!response.ok) {
                const data = await response.json()
                toast.error(data.message)
            } else {
                const data = await response.json()
                toast.success("User login Successful")
                router.push('/dashboard/home')
                Cookies.set("userProfile", JSON.stringify(data?.userProfile))
                // localStorage.setItem('userProfile', JSON.stringify(data?.userProfile))
            }
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const response = await signIn('google'); // Use 'google' to specify the Google provider
            if (response?.error) {
                // Handle sign-in error
                console.error('Google sign-in error:', response.error);
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <div className='h-screen bg-slate-300 flex justify-center items-center'>
            <div className='bg-slate-600 rounded-xl shadow-2xl p-5 text-slate-100'>
                <div className='flex justify-center items-center mt-4'>
                    {/* <h1 className='text-3xl'> <span className='uppercase font-semibold'> Task </span> Manager</h1>
                    <div className='h-6 w-1 mx-5 border-r-2 border-white'></div> */}
                    <h1 className='text-3xl uppercase font-semibold'>  SignIn</h1>
                </div>
                <hr className=' g-slate-500 my-4' />

                <form onSubmit={handleSubmit}>

                    <div className='flex flex-col'>
                        <p className='text-lg m-2'>Enter Email: </p>
                        <input
                            value={inputs?.email}
                            onChange={(e) => { handleInputChange(e.target.value, 'email') }}
                            type='email'
                            placeholder='email'
                            className='p-2 rounded-lg m-2 bg-slate-200 text-black' />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-lg m-2'>Enter Password: </p>
                        <div className='flex items-center'>
                            <input
                                value={inputs?.password}
                                type={show ? 'text' : 'password'}
                                onChange={(e) => { handleInputChange(e.target.value, 'password') }}
                                placeholder='Password'
                                className='p-2 rounded-lg m-2 bg-slate-200 text-black flex-1' />
                            {show ? (<AiOutlineEye size={20} onClick={() => { setShow(!show) }} className='cursor-pointer' />) :
                                (<AiOutlineEyeInvisible size={20} onClick={() => { setShow(!show) }} className='cursor-pointer' />)
                            }

                        </div>
                    </div>
                    <p className=' ml-2 mt-4'>Don't have an account
                        <span 
                        onClick={()=>{router.push('/auth/signup')}}
                        className='font-semibold text-lg underline cursor-pointer ml-2'>
                            Signup
                        </span>
                    </p>
                    <button
                        type='submit'
                        className='bg-slate-900 text-white py-4 px-6 my-4 rounded-xl
                        text-lg transition-all delay-100 hover:bg-slate-100 hover:text-black 
                        font-semibold text-md w-full'
                    >
                        SignIn
                    </button>

                    {/* <button
                        onClick={() => handleGoogleSignIn()}
                        type='button'
                        className='bg-slate-200 text-black py-4 px-6 my-4 rounded-xl
                        text-lg transition-all delay-100 hover:bg-slate-300 hover:text-black 
                        font-semibold text-md w-full'
                    >
                        SignIn with Google
                    </button> */}

                </form>
            </div>
        </div>
    )
}

export default SignIn
