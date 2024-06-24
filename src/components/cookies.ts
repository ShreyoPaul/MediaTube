import { cookies } from "next/headers";

export default function (user: any) {
    const cookieStore = cookies()
    cookieStore.set('email',user)
}