import SignIn from '@/pages/SignIn';
import Signup from '@/pages/Signup';
import TasksHome from '@/pages/TasksHome'
import Image from 'next/image'
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
