import { baseUrl } from "@/utils/constant";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("body")
    const reqBody = await req.json()
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return NextResponse.json({ error: 'Log in again! Server may be crashed!', status: 500 })

    const res = await fetch(`${baseUrl}/media/video_details`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify(reqBody)
    })
    let res2 = await res.json()

    
    const email = cookieStore.get('email')?.value
    console.log(email)
    res2.liked = res2.data.like.includes(email)
    console.log(res2)

    return NextResponse.json({ res2, status: res2.error ? 403 : 201  })
}