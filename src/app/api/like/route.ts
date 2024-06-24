import { baseUrl } from "@/utils/constant";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("body")
    const reqBody = await req.json()
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return NextResponse.json({ error: 'Log in again! Server may be crashed!', status: 500 })

    const res = await fetch(`${baseUrl}/media/like`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify(reqBody)
    })
    let res2 = await res.json()
    return NextResponse.json(res2)
}