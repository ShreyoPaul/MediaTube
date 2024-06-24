import { baseUrl } from "@/utils/constant"
import { cookies } from "next/headers"
import { permanentRedirect, redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  // const { }
  console.log("REQ bODY",)
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(await req.json())
  })
  const res2 = await res.json()
  console.log()
  cookieStore.set('access_token', res2.token)
  cookieStore.set('user_name', res2.user.name)
  cookieStore.set('email', res2.user.email)
  if (res2) {
    // redirect("/")

    return NextResponse.json({ msg: res2.msg, status: 201 })
  }
  return NextResponse.json({ msg: res2.msg, status: 401 })
}
