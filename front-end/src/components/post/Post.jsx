import { MoreHoriz, ThumbUp, QuestionAnswerOutlined } from "@mui/icons-material"
import { Link } from 'react-router-dom'

import './post.css'
import Avatar from '/src/components/avatar'

export default function Post() {
    return (
        <div className="post">
            <div className="p-3">

                <div className="flex items-center justify-between mb-2">
                    <Avatar className="mr-2" src="https://avatars.dicebear.com/api/initials/Richard+Veloria.svg" />

                    <div className="leading-3 flex flex-grow justify-between items-center">
                        <div>
                            <span className="block font-bold text-gray-700">Richard Veloria</span>
                            <span className="block text-sm text-gray-600">2 weeks ago</span>
                        </div>
                        <button>
                            <MoreHoriz />
                        </button>
                    </div>
                </div>

                <div className="text-gray-800 font-light">
                    <p>hello world!</p>
                </div>
            </div>

            <div className="font-light flex justify-between text-gray-600 text-sm pb-2 px-3 border-b border-gray-200">
                <div>1 Like</div>
                <div>3 Comments</div>
            </div>

            <div className="grid grid-cols-2 font-semibold text-gray-600">
               <button className="bg-white hover:bg-gray-50 py-2 flex items-center justify-center w-full">
                    <ThumbUp sx={{fontSize: '18px'}} className="mr-1 text-blue-500"/>
                    <span>Liked</span>    
                </button>

                <Link to="/post/1" className="bg-white hover:bg-gray-50 py-2 flex items-center justify-center">
                    <QuestionAnswerOutlined sx={{fontSize: '18px'}} className="mr-1" />
                    <span>Comment</span>
                </Link>
            </div>

        </div>
    )
}