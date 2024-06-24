'use client'

import { baseUrl } from '@/utils/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const AllVideos = () => {
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
        console.log(result)
        return result;
    }


    const fetchAllVideo = async () => {
        try {
            const videos = await (await fetch(`${baseUrl}/media/videos`, {
                method: 'POST',
                mode: 'cors'
            })).json()
            console.log(await videos)
            setVideos(await mergeArraysById(videos.result, videos.thumbnail))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllVideo()
    }, [])
    return (
        <div className="flex flex-wrap lg:gap-x-4 lg:gap-y-6 gap-x-4 gap-y-4 ">
            {
                videos?.map((video: any, i: any) => {
                    // console.log(video)
                    return (
                        <Link href={`/main/watch/${video.video._id}?thumbnail=${video.thumbnail.filename}`} key={i} className='hover:bg-[#bdbdbd1f] lg:p-4 p-3 rounded duration-300 ease-in-out group hover:cursor-pointer hover:scale-105 z-10'>
                            <div className='bg-yellow-100 rounded min-w-[224px] min-h-[126px] w-[20.8vw] h-[11.7vw] mb-2 group-hover:bg-yellow-300 duration-300 ease-in-out '>
                                <Image src={`${baseUrl}/media/thumbnail/${video.thumbnail._id}`} alt='thumbnail' width={300} height={300} className='w-full h-full object-cover' />
                            </div>
                            <div>{video.video.metadata.title} {i + 1}</div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default AllVideos