"use client"
import SignIn from '@/pages/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <div>
      {/* <TasksHome /> */}
      <ToastContainer />
      {/* <Signup /> */}
      <SignIn />
    </div>
  )
}
