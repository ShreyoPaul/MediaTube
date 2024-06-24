'use client'

import { baseUrl } from "@/utils/constant";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const page = () => {
    const [videos, setVideos] = useState<any>([])

    async function mergeArraysById(videos: any[], thumbnails: any[]) {
        // Create a map from the second array for quick lookup by id
        const array2Map = new Map(thumbnails.map(item => [item.filename, item]));

        // Result array to store merged objects
        const result = [];

        // Iterate through the first array
        for (const item1 of videos) {
            // Check if the id exists in the second array map
            if (array2Map.has(item1.metadata.thumbnail)) {
                // Get the corresponding item from the second array
                const item2 = array2Map.get(item1.metadata.thumbnail);

                // Merge the two objects
                const mergedItem = { video: item1, thumbnail: item2 };

                // Push the merged object to the result array
                result.push(mergedItem);
            }
        }
        return result;
    }

    const deleteVideo = async (videoid: string, thumbnailid: number) => {
        try {
            const videos = await (await fetch('/api/delete-video', {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify({
                    videoid,
                    thumbnailid
                })
            })).json()
            console.log(await videos)
            fetchAllVideo()
        } catch (error) {
            console.log(error)
        }
    }


    const fetchAllVideo = async () => {
        try {
            const videos = await (await fetch('/api/myvideos', {
                method: 'POST',
                mode: 'cors'
            })).json()
            // console.log(await videos)
            setVideos(await mergeArraysById(videos.res2.result, videos.res2.thumbnail))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllVideo()
    }, [])

    console.log(videos)

    return (
        <div className="flex flex-wrap lg:gap-x-4 lg:gap-y-6 gap-x-4 gap-y-4 ">
            {
                videos?.map((video: any, i: any) => {
                    // console.log(video)
                    return (
                        <div key={i} className='hover:bg-[#bdbdbd1f] lg:p-4 p-3 rounded duration-300 ease-in-out group  hover:scale-105 z-10'>
                            <div className='bg-yellow-100 rounded min-w-[224px] min-h-[126px] w-[20.8vw] h-[11.7vw] mb-2 group-hover:bg-yellow-300 duration-300 ease-in-out '>
                                <Link href={`/main/watch/${video.video._id}?thumbnail=${video.thumbnail.filename}`}>
                                    <Image src={`${baseUrl}/media/thumbnail/${video.thumbnail._id}`} alt='thumbnail' width={300} height={300} className='w-full h-full object-cover' />
                                </Link>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div>{video.video.metadata.title}</div>
                                <div className="text-lg hover:cursor-pointer hover:bg-[#bdbdbd4d] p-1 rounded-full duration-300 ease-in-out" onClick={() => deleteVideo(video.video._id, video.thumbnail._id)}><MdDelete /></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default page
