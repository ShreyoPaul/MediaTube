import { baseUrl } from "@/utils/constant";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return NextResponse.json({ error: 'Log in again! Server may be crashed!', status: 500 })

    const res = await fetch(`${baseUrl}/media/myvideos`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    const res2 = await res.json()
    console.log(res2)

    return NextResponse.json({ res2, status: 201 })
}