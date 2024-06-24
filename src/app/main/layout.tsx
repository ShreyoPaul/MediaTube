'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { HiMenuAlt1 } from "react-icons/hi";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [toggle, setToggle] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")
    const [accessToken, setAccessToken] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {

        const name: any = Cookies.get("user_name")
        const token: any = Cookies.get("access_token")

        if (!token) {
            setAccessToken(true)
            router.push('/')
        }
        if (name) setUserName(name)
    }, [])

    const Logout = () => {
        Cookies.remove("user_name")
        Cookies.remove("access_token")
        setAccessToken(false)
    }
    // !accessToken && userName
    if (!accessToken && userName) return (
        <body >
            <div className='flex flex-col w-full bg-[#0a1420]  overflow-hidden h-screen'>
                <div className='w-full py-3 px-6 text-lg flex flex-row items-center justify-between text-gray-400 font-semibold bg-[#07101b] shadow-sm shadow-gray-600 z-[100]'>
                    <div className='flex'>
                        <div className='md:hidden flex md:animate-none animate-wiggle ' onClick={() => setToggle(!toggle)}>
                            <HiMenuAlt1 />
                        </div>
                        <div className='transition ease-in-out duration-300 relative md:left-0 translate-x-10 md:translate-x-0 '>
                            Hey, <span className='text-gray-200 text-xl drop-shadow-glow '>{userName[0]?.toUpperCase() + userName.slice(1,)}</span> what's up
                        </div>
                    </div>
                    {/* {
                    !accessToken && (
                        <div className='text-sm flex items-center gap-x-5'>
                            <div className='py-2 px-3 cursor-pointer rounded-sm bg-slate-200 text-gray-900'>Sign up</div>
                            <div className='py-2 px-3 cursor-pointer '>Log in</div>
                        </div>
                    )
                } */}
                </div>
                <div className='overflow-hidden flex md:flex-row text-gray-200 text-sm'>
                    <div className={`w-[20%] min-w-[185px] md:flex hidden transition ease-in-out duration-300 absolute md:relative ${toggle ? '-translate-x-60' : 'translate-x-0'} md:translate-x-0 min-h-screen bg-[#07101b] z-10 text-gray-200`}>
                        <div className='w-full  flex flex-col p-2'>
                            <Link href={"/main"} className='hover:text-gray-900 hover:bg-slate-200 transform duration-300 ease-in-out p-3 w-full rounded-sm '>Home</Link>
                            <Link href={"/main/upload"} className='hover:text-gray-900 hover:bg-slate-200 transform duration-300 ease-in-out p-3 w-full rounded-sm '>Upload Video</Link>
                            <Link href={"/main/myvideos"} className='hover:text-gray-900 hover:bg-slate-200 transform duration-300 ease-in-out p-3 w-full rounded-sm '>My Videos</Link>
                            <Link href={"/"} className='hover:text-gray-900 hover:bg-slate-200 transform duration-300 ease-in-out p-3 w-full rounded-sm ' onClick={Logout}>Log out</Link>
                        </div>
                    </div>

                    <div className=" text-white min-h-screen overflow-auto w-full min-w-auto lg:p-10 p-8 z-1 relative">
                        {children}
                    </div>

                    <div className={`${toggle ? '-translate-x-64' : 'translate-x-0'} z-10  transition ease-in-out duration-300 md:hidden flex min-w-[185px] min-h-screen bg-[#07101b] absolute`}>dfhg</div>

                </div>
            </div>

        </body>
    )
    else return (
        <body >
            <div className='text-gray-200 font-semibold inset-0 w-full h-screen flex justify-center items-center bg-[#0a1420]'>
                <div className='inline-flex justify-center text-lg items-center gap-2 drop-shadow-glow'>
                    <div className='border-gray-500 h-6 w-6 animate-spin rounded-full border-2 border-t-gray-200 drop-shadow-glow'></div>
                    Loading...
                </div>
            </div>
        </body>
    )
}

