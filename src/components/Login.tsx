'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    email: string,
    password: string,
}

interface ModalProps {
    handleModalClose: () => void
}

const Modal: React.FC<ModalProps> = ({ handleModalClose }) => {
    const [user, setUser] = useState<User>({
        email: "",
        password: ""
    })
    const router = useRouter()

    const HandleModal = () => {
        setUser({
            email: "",
            password: ""
        })
        handleModalClose()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    console.log(user)

    const HandleLogin = async () => {
        try {
            if (!user.email || !user.password) {
                console.log('Fill up all fields')
                alert('Fill up all fields!')
                return
            }
            const res = await fetch('/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            })
            const res2 = await res.json()
            console.log(res2)
            if (res2.status === 201) router.push('/main')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "auto";
        }
    }, []);
    return (
        <div className=" absolute z-100 top-0 left-0 " >
            <div className="w-screen h-screen bg-[#07101b] opacity-80 blur-2xl" onClick={HandleModal} />
            <div className="w-[80vw] md:w-[30vw] md:max-w-[40vw]  md:h-[300px] h-[300px] rounded bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-400 text-white  absolute md:top-[50%] top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-10 md:p-12 flex flex-col justify-between items-end shadow-2xl">
                <div className="w-full flex flex-col gap-4  ">
                    <div className="text-lg  w-full">
                        <div className="w-full text-sm">Email: </div>
                        <div className="text-xl font-semibold w-full">
                            <input className=" bg-transparent border-b outline-none border-gray-800 px-2 py-1 text-lg w-full" value={user?.email} type="text" name="email" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="text-lg  w-full">
                        <div className="w-full text-sm">Password: </div>
                        <div className="text-xl font-semibold w-full">
                            <input className=" bg-transparent border-b outline-none border-gray-800 px-2 py-1 text-lg w-full" value={user?.password} type="password" name="password" onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="bg-gray-800 hover:bg-gray-900 text-white rounded-md p-2 px-4 w-auto cursor-pointer" onClick={HandleLogin}>Log in</div>
                </div>
            </div>
        </div>
    )
}

export default Modal