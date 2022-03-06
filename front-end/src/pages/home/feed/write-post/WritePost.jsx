import { PermMedia } from "@mui/icons-material";

import './writePost.css'
import Shadow from '/src/components/shadow'
import Avatar from '/src/components/avatar'
import Divider from '/src/components/divider'

export default function WritePost() {
    return (
        <Shadow className="writePost">
            <div className="flex items-center gap-4">
                <Avatar className="self-start" src="https://avatars.dicebear.com/api/initials/lenard.svg" />
                <div className="flex flex-col w-full gap-2">
                    <textarea 
                        placeholder="What's in your mind?"
                        className="font-light text-gray-800 w-full focus:outline-none focus:border-blue-500 focus:h-[72px] h-[48px] p-2 border border-gray-200 rounded-md transition-all"
                    ></textarea>
                    <div className="flex justify-between">
                        <div className="flex cursor-pointer">
                            <PermMedia className="mr-2" sx={{fontSize:'18px'}} htmlColor="tomato"/>
                            <span className="text-sm">Attach a Photo</span>
                        </div>
                        <button className="bg-green-500 px-3 py-2 text-white text-sm rounded">Share Post</button>
                    </div>
                </div>
            </div>
        </Shadow>
    )
}