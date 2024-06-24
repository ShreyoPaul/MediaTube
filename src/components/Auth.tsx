'use client'

import { useRouter } from "next/navigation"

const Auth = () => {
    const router = useRouter()
    const Signup = async () => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: `auth@gamil.com`,
                    // name: "test3",
                    password: "1111"
                })
            })
            const res2 = await res.json()
            console.log(res2)
            if (res2.status === 201) router.push('/main')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-row gap-x-6 justify-center items-center text-sm pt-12">
            <div onClick={Signup} className="rounded-md cursor-pointer duration-300 transform bg-gray-300 hover:bg-gray-50 py-3 px-5 text-gray-900 font-semibold">Sign Up</div>
        </div>
    )
}

export default Auth