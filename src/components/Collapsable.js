"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { GoProjectSymlink } from 'react-icons/go'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { addProject, getAllProjects } from '@/redux/Slices/ProjectSlice';
import Link from 'next/link';

export default function Collapsable({ title }) {
    const [expand, setExpand] = useState(false);
    const [add, setAdd] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const subtitles = useSelector(getAllProjects)
    const dispatch = useDispatch()

    const handleAdd = () => {
        setAdd(false);
        dispatch(addProject(newTitle))
        setExpand(true);
    }

    const handleIconClick = () => {
        setAdd(true)
        setExpand(false)
    }
    return (
        <div>
            <motion.header
            initial={false}
            >
                <div className={`flex items-center  justify-between ${expand ? ' hover:bg-slate-900 hover:text-slate-300 text-slate-900 bg-slate-300 rounded-t-lg' : 'hover:bg-slate-300 hover:text-slate-900 text-slate-300 rounded-lg'}  mt-2 cursor-pointer text-lg transition-all p-3  ease-in-out
                        transform-gpu`}>
                    {!add ? (
                        <>
                            <div className='flex items-center' onClick={() => setExpand(!expand)}>
                                <GoProjectSymlink size={20} />
                                <h1 className='ml-2 text-lg'>{title}</h1>
                            </div>
                            <IoIosAddCircleOutline size={23} onClick={handleIconClick} />
                        </>
                    ) : (
                        <div className='flex flex-col'>
                            <input
                                value={newTitle}
                                placeholder='Add new Title'
                                onChange={(e) => { setNewTitle(e.target.value) }}
                                className='w-full p-1 rounded-md text-slate-900'
                            />
                            <button
                                onClick={handleAdd}
                                className='bg-slate-700 w-full h-10 p-2 my-5 rounded-lg text-slate-100'
                            >Add</button>
                        </div>
                    )}
                </div>
                <AnimatePresence initial={false}>
                    {expand && (
                        <motion.section
                            key="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className='bg-slate-300 rounded-b-lg '
                            style={{ overflowY: 'auto' }}
                        >
                            <motion.div
                                variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                                transition={{ duration: 0.8 }}
                                className='bg-slate-300 rounded-lg p-1 h-full max-h-[50vh] flex flex-col'
                                style={{ overflowY: 'auto' }}
                            >
                                {subtitles?.map((item, index) => (
                                    <Link href={`/dashboard/project-tasks/${item._id}`} className='mb-4 mt-2 text-lg text-slate-900 p-2 rounded-lg hover:bg-slate-900 hover:text-slate-300 transition-all'
                                        key={index}>{item?.title}</Link>
                                ))}
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </motion.header>
        </div>
    );
}
