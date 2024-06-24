import { baseUrl } from "@/utils/constant";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    console.log("body")
    const reqBody = await req.json()
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return NextResponse.json({ error: 'Log in again! Server may be crashed!', status: 500 })

    let res = await fetch(`${baseUrl}/media/delete`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify(reqBody)
    })
    res = await res.json()

    console.log(res)

    return NextResponse.json({ res, status: 201 })
}