'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { baseUrl } from "@/utils/constant";

interface Data {

}

interface VideoDetails {
    title: string;
    desc: string;
    like: number;
}

const Video = ({ params }: { params: { videoid: string } }) => {
    const router = useRouter()

    const [videoUrl, setVideoUrl] = useState("");
    const [videoDetails, setVideoDetails] = useState({
        title: "",
        desc: "",
        like: [],
        tags: []
    })
    const [likeToggle, setLikeToggle] = useState(false)

    const searchParams = useSearchParams()

    const thumbnail: any = searchParams.get('thumbnail')

    const fetchVideoDetails = async () => {
        let res: any = await fetch(`/api/video_details`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                videoid: params.videoid,
                thumbnailname: parseInt(thumbnail)
            })
        })
        // console.log("param:", params, thumbnail)
        res = await res.json()
        if (res.status !== 201) {
            router.push('/')
            if (res.error) alert(res.error)
            return
        }
        res = res.res2
        // console.log(res)
        if (res) {
            // console.log(res.data)
            setVideoDetails(res?.data)
            setLikeToggle(res.liked)
        } else {
            return new Error("Video details are missing!")
        }
    }

    console.log(videoDetails)

    const fetchVideoPlay = async () => {
        fetch(`${baseUrl}/media/play_try/${params.videoid}`)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a blob URL for the video
                // console.log(blob)
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
            })
            .catch((error) => {
                console.error("Error fetching video:", error);
            });
    }

    useEffect(() => {
        fetchVideoDetails()
        fetchVideoPlay()
        
        // fetch(`${baseUrl}/media/play_try/${params.videoid}`)
        //     .then((response: Response) => {
        //         // Assuming response is a readable stream
        //         const reader: any = response?.body?.getReader();
        //         const contentLength = Number(response.headers.get('Content-Length'));

        //         // Read the stream and convert it to a Blob
        //         return new ReadableStream({
        //             start(controller) {
        //                 async function pump() {
        //                     return await reader.read().then(({ done, value }: { done: any, value: any }) => {
        //                         if (done) {
        //                             controller.close();
        //                             return;
        //                         }
        //                         controller.enqueue(value);
        //                         pump();
        //                     });
        //                 }
        //                 pump();
        //             }
        //         });
        //     })
        //     .then((stream: any) => {
        //         // Now you can use the stream as needed, e.g., to display an image
        //         const url = URL.createObjectURL(new Blob([stream]));
        //         console.log(url)
        //         setVideoUrl(url);
        //         // Use the URL to display the file in your React component
        //     })
        //     .catch(error => {
        //         console.error('Error fetching file:', error);
        //     });

    }, []);



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
            console.log(videoDetails?.tags)
            const videos = await (await fetch(`${baseUrl}/media/videos`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    tags: videoDetails?.tags,
                    thumbnailname: parseInt(thumbnail)
                })

            })).json()
            console.log("Videos:", await videos)
            setVideos(await mergeArraysById(videos.result, videos.thumbnail))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (videoDetails.tags.length > 0) fetchAllVideo()
    }, [videoDetails.tags])

    const likeVideo = async () => {
        try {
            const liked = await (await fetch('/api/like', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    videoid: params.videoid
                })

            })).json()
            console.log(liked)
            if (liked) fetchVideoDetails()
            return setLikeToggle(liked.toggle)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full min-h-screen  flex flex-col lg:flex-row gap-8 justify-center lg:justify-normal'>
            <div className="lg:w-[50vw] w-full flex flex-col items-center pt-3 lg:pt-4">
                <div className={`lg:w-[48vw] md:w-[72vw] w-[80vw] lg:h-[27vw] md:h-[40.5vw] h-[45vw] ${!videoUrl && 'bg-[#bdbdbd1f]'} flex justify-center items-center rounded-lg text-gray-400 z-10 relative`}>
                    {(videoUrl && videoDetails)
                        ? (
                            <video controls autoPlay width={600} height={400} className="w-full h-full flex justify-center items-center rounded-lg object-cover relative z-0">
                                <source src={videoUrl || ""} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            // <div />
                        )
                        : <div className="animate-pulse font-semibold">Loading...</div>
                    }

                </div>
                <div className="p-3 flex flex-col item-start w-full">
                    <div className="pt-2 pb-4 px-4 md:text-xl text-lg flex flex-row items-center justify-between">
                        <div >{videoDetails?.title}</div>
                        <div className="">
                            {/* <div className="">{videoDetails.title}</div> */}
                            <div onClick={likeVideo} className="p-2 whitespace-nowrap flex flex-row gap-2 items-center rounded hover:bg-[#bdbdbd1f] text-lg cursor-pointer">{likeToggle ? <FcLike /> : <FcLikePlaceholder />}{videoDetails.like.length}</div>
                        </div>
                    </div>
                    <div className="w-full border border-gray-600" />
                    <div className="p-4 text-gray-400 text-sm">{videoDetails.desc}</div>
                </div>
            </div>
            <div className="pt-4">
                <div className="pb-4">Similar videos</div>
                <div className="flex lg:flex-col md:flex-row flex-col items-center flex-wrap lg:gap-x-4 lg:gap-y-4 gap-x-4 gap-y-4 ">
                    {
                        videos?.map((video: any, i: any) => {
                            return (
                                <Link href={`/main/watch/${video.video._id}?thumbnail=${video.thumbnail.filename}`} key={i} className='hover:bg-[#bdbdbd1f] lg:p-4 p-3 rounded duration-300 ease-in-out group hover:cursor-pointer hover:scale-105'>
                                    <div className='bg-yellow-100 rounded  md:w-[224px] w-[80vw] md:h-[126px] h-[45vw] mb-2 group-hover:bg-yellow-300 duration-300 ease-in-out '>
                                        <Image src={`${baseUrl}/media/thumbnail/${video.thumbnail._id}`} alt='thumbnail' width={300} height={300} className='w-full h-full object-cover' />
                                    </div>
                                    <div>{video.video.metadata.title} {i + 1}</div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Video

