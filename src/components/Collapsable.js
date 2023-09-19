import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { GoProjectSymlink } from 'react-icons/go'

export default function Collapsable({ title, subTitles }) {
    const [expand, setExpand] = useState(false);

    return (
        <div>
            <motion.header
                initial={false}
                onClick={() => setExpand(!expand)}
            >
                <div className={`flex items-center  ${expand?' hover:bg-slate-900 hover:text-slate-300 text-slate-900 bg-slate-300' : 'hover:bg-slate-300 hover:text-slate-900 text-slate-300'}  mt-2 cursor-pointer text-lg transition-all p-3 rounded-t-lg ease-in-out
                        transform-gpu`}>
                    <GoProjectSymlink size={20} />
                    <h1 className='ml-2 text-lg'>{title}</h1>
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
                            className='bg-slate-300 rounded-b-lg'
                        >
                            <motion.div
                                variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                                transition={{ duration: 0.8 }}
                                className='bg-slate-300 rounded-lg p-1 '
                            >
                                {subTitles?.map((item, index) => (
                                    <h3 className='mb-4 mt-2 text-lg text-slate-900 p-2 rounded-lg hover:bg-slate-900 hover:text-slate-300 transition-all'
                                        key={index}>{item}</h3>
                                ))}
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </motion.header>
        </div>
    );
}
