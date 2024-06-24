"use client";
import { cn } from "@/utils/constant";
import React, { ReactNode, useState } from "react";
import Auth from "@/components/Auth";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Signup from '@/components/Signup'
import Login from '@/components/Login'

export default function Home() {
  const router = useRouter()
  const [signupModalClose, setSignupModalClose] = useState<any>(true)
  const [loginModalClose, setLoginModalClose] = useState<any>(true)
  const handleModalClose = () => {
    setSignupModalClose(true)
    setLoginModalClose(true)
  }
  return (
    <main className="flex  overflow-hidden flex-col bg-[#07101b]">

      {/* <AllVideos /> */}
      <div className="w-full h-screen overflow-hidden bg-[#07101b] flex flex-col md:items-center p-8 md:justify-center justify-start items-start duration-300 transform ease-in-out">
        <div className=" sm:text-[50px] text-[35px] font-extrabold text-white drop-shadow-glow2 animate-pulse">{/* <Auth /> */}
          Deep dive into MediaTube
        </div>
        <div className="flex sm:flex-row flex-col flex-wrap gap-x-3 text-gray-100 font-extralight text-lg md:justify-center justify-start pt-5">
          A
          <div className="flex flex-row flex-wrap sm:gap-x-1 gap-x-2 sm:items-center">
            <div className="font-semibold">NextJS</div>
            <div className="rounded-full w-1 h-1 hidden sm:flex mx-1 bg-gray-50  " />
            <div className="font-semibold">Tailwind</div>
            <div className="rounded-full w-1 h-1 hidden sm:flex mx-1 bg-gray-50  " />
            <div className="font-semibold">NodeJS</div>
            <div className="rounded-full w-1 h-1 hidden sm:flex mx-1 bg-gray-50  " />
            <div className="font-semibold">ExpressJS</div>
            <div className="rounded-full w-1 h-1 hidden sm:flex mx-1 bg-gray-50  " />
            <div className="font-semibold">MongoDB</div>
          </div>
          Project
        </div>

        <div className="flex flex-row gap-x-6 justify-center items-center text-sm pt-12">
          <div onClick={() => setSignupModalClose(false)} className="rounded-md cursor-pointer duration-300 transform bg-gray-300 hover:bg-gray-50 py-3 px-5 text-gray-900 font-semibold">Sign Up</div>
          <div onClick={() => setLoginModalClose(false)} className="rounded-md cursor-pointer duration-300 transform border hover:bg-gray-50 hover:text-gray-900 border-gray-200 py-3 px-5 text-gray-200 font-semibold">Log In</div>
        </div>
        {!signupModalClose && <Signup handleModalClose={handleModalClose} />}
        {!loginModalClose && <Login handleModalClose={handleModalClose} />}
      </div>


    </main >
  );
}


