'use client'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useRouter } from 'next/navigation'


function Signup() {
    const [inputs, setInputs] = useState({
        name: '',
        designation: '',
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)
    const router = useRouter()

    const handleInputChange = (eventValue, type) => {
        try {
            setInputs({ ...inputs, [type]: eventValue })
        } catch (error) {
            console.log("Error is ", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:8080/user/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs)
            })
            setInputs({
                name: '',
                designation: '',
                email: '',
                password: ''
            })
            if (!response.ok) {
                const data = await response.json()
                console.log("Response is ", data.message);
                toast.error(data.message)
            } else {
                toast.success("Signup successful")
                router.push('/dashboard')
            }
        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <div className='h-screen bg-slate-300 flex justify-center items-center'>
            <div className='bg-slate-600 rounded-xl shadow-2xl p-5 text-slate-100'>
                <div className='flex justify-center items-center mt-4'>
                    {/* <h1 className='text-3xl'> <span className='uppercase font-semibold'> Task </span> Manager</h1> */}
                    <h1 className='text-3xl uppercase font-semibold'>  Signup</h1>
                </div>
                <hr className=' g-slate-500 my-4' />
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className='flex flex-col'>
                            <p className='text-lg m-2'>Enter Name: </p>
                            <input
                                value={inputs?.name}
                                onChange={(e) => { handleInputChange(e.target.value, 'name') }}
                                placeholder='Full Name'
                                className='p-2 rounded-lg m-2 bg-slate-200 text-black' />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-lg m-2'>Enter Designation: </p>
                            <input
                                value={inputs?.designation}
                                onChange={(e) => { handleInputChange(e.target.value, 'designation') }}
                                placeholder='Designation in project'
                                className='p-2 rounded-lg m-2 bg-slate-200 text-black' />
                        </div>
                    </div>
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
                    <p className=' ml-2 mt-4'>Already have an account
                        <span 
                        onClick={()=>{router.push('/')}}
                        className='font-semibold text-lg underline cursor-pointer ml-2'>
                            SignIn
                        </span>
                    </p>
                    <button
                        type='submit'
                        className='bg-slate-900 text-white py-4 px-6 my-4 rounded-xl
                        text-md transition-all delay-100 hover:bg-slate-100 hover:text-black font-semibold text-md'
                    >
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
