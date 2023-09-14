import Providers from '@/redux/provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth"
import  SessionProvider  from '../components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task Manager',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
