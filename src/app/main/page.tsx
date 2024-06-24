'use client'

import AllVideos from "@/components/AllVideos";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const getCopkie: any = Cookies.get("access_token")

  console.log("Access token:", getCopkie)
  if (!getCopkie) router.push('/')
  console.log("✓")
  return (
    <div className="flex flex-row pb-12">
      <AllVideos />
    </div>
  );
}
