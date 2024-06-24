'use client'

import { useRouter } from "next/navigation"
import { MutableRefObject, useRef, useState } from "react"
import { BiCross } from "react-icons/bi"
import { RxCross2 } from "react-icons/rx"

const page = () => {
    const router = useRouter()

    const [tags, setTags] = useState<string[]>([])
    const [vfile, setVFile] = useState<any>({})
    const [thbmnlfile, setThbmnlFile] = useState<any>({})
    const [tag, setTag] = useState<string>("")
    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)

    console.log(vfile, thbmnlfile)

    const addTag = () => {
        console.log(tags.indexOf(tag))
        if (tag === "" || tag.trim() === "") return alert("Add a tag!")
        if (tags.indexOf(tag) < 0) {
            setTags((prev) => [...prev, tag.toLowerCase()])
            setTag("")
            return
        } else {
            return alert("This tag is already added!")
        }
    }

    const deleteTag = (tag: string) => {
        const updatedTags = tags.filter(x => x !== tag);
        setTags(updatedTags)
    }

    const submit = async () => {
        if (!vfile || !thbmnlfile || !titleRef.current?.value || !descRef.current?.value || tags.length < 1) return
        const formData = new FormData()
        formData.append('file', vfile)
        formData.append('thumbnail', thbmnlfile)
        formData.append('title', titleRef.current?.value)
        formData.append('desc', descRef.current?.value)
        formData.append('tags', tags.join())

        const res = await fetch('/api/upload', {
            mode: 'cors',
            method: 'POST',
            body: formData
        })
        const res2 = await res.json()
        if (res2.status !== 201) {
            router.push('/')
            alert(res2.error)
            return
        }
        console.log(res2)
        router.push('/main')
    }

    return (
        <div className="w-full h-auto flex flex-col justify-center pb-12">
            <div className="flex flex-col lg:flex-row gap-10 justify-between overflow-auto mb-12">
                <div className="w-full lg:w-[35vw] flex flex-col gap-10">
                    <div className="flex flex-row gap-4 items-center">
                        <label className="whitespace-nowrap text-sm font-medium">Upload video</label>
                        <input
                            accept="video/mp4,video/x-m4v,video/*"
                            type="file"
                            size={1}
                            onChange={(e) => { if (e.target.files !== null) setVFile(e.target.files[0]) }}
                            className=" w-full text-sm text-stone-500 file:py-3 bg-white rounded-md file:rounded-l-md file:mr-5 file:px-3 file:border-0 file:text-xs file:font-medium hover:file:cursor-pointer file:bg-slate-700 file:text-white" />
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                        <label className="whitespace-nowrap text-sm font-medium">Title</label>
                        <input
                            ref={titleRef}
                            accept="video/mp4,video/x-m4v,video/*"
                            type="text"
                            className=" w-full text-sm   hover-700 bg-[#ffffff28] border-b border-white py-3 px-6 outline-none text-gray-200" />
                    </div>
                    <div className="flex flex-row gap-4 items-start">
                        <label className="whitespace-nowrap text-sm font-medium py-4">Tags</label>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex flex-row w-full gap-x-3">
                                <input
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    accept="video/mp4,video/x-m4v,video/*"
                                    type="text"
                                    className=" w-full text-sm   hover-700 bg-[#ffffff28] border-b border-white py-3 px-6 outline-none text-gray-200" />
                                <button className="bg-slate-700 text-white px-5 py-3 rounded-md" onClick={addTag}>Add</button>
                            </div>
                            <div className="flex flex-row flex-wrap w-full gap-3 min-h-12">
                                {
                                    tags?.map((tag, i) => {
                                        return (
                                            <div className="flex flex-row items-center cursor-pointer gap-2 px-3 py-1 bg-slate-800 rounded-md hover:bg-slate-600" key={i}
                                                onClick={() => deleteTag(tag)}>
                                                {tag}
                                                <RxCross2 />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full lg:w-[35vw] flex flex-col gap-10">
                    <div className="flex flex-row gap-4 items-center">
                        <label className="whitespace-nowrap text-sm font-medium">Upload thumbnail</label>
                        <input
                            accept="image/png, image/jpeg, image/jpg,"
                            type="file"
                            size={1}
                            onChange={(e) => { if (e.target.files !== null) setThbmnlFile(e.target.files[0]) }}
                            className=" w-full text-sm text-stone-500 file:py-3 bg-white rounded-md file:rounded-l-md file:mr-5 file:px-3 file:border-0 file:text-xs file:font-medium hover:file:cursor-pointer file:bg-slate-700 file:text-white" />
                    </div>
                    <div className="flex flex-row gap-4 items-start">
                        <label className="whitespace-nowrap text-sm font-medium py-4">Description</label>
                        <textarea rows={5} maxLength={200} style={{ resize: 'none' }} ref={descRef}
                            className=" w-full text-sm   hover-700 bg-[#ffffff28] border-b border-white py-3 px-6 outline-none text-gray-200" />
                    </div>
                </div>
            </div>
            <div className="bg-slate-700 text-white px-5 py-3 rounded-md" onClick={submit}>Upload</div>
        </div>

    )
}

export default page