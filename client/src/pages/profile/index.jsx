import { Avatar, Input } from 'antd'
import { CameraFilled, UserOutlined } from '@ant-design/icons'

import Post from '/src/components/Post/Post'
import CoverImage from '/assets/cover.png'
import './index.css'

export default function()
{
    return (
        <div className="profile">
            <div className="profile-cover">
                <img src={CoverImage} className='absolute inset-0 object-cover' width='100%' height='100%'/>
                <img 
                    className='profile-avatar' 
                    src='https://avatars.dicebear.com/api/initials/Lenard+Mangay-ayam.svg' />
            </div>

            <div className="text-center">
                <span className="text-xl font-bold block">Lenard Mangay-ayam</span>
                <span className="text-gray-700">Hello there!!</span>
            </div>

            {/* Wrapper */}
            <div className='flex mt-8'>

                <div className='w-full lg:w-2/3'>

                    {/* Write Post */}
                    <div className='flex gap-2 max-w-xl mx-auto sm:rounded-lg bg-white border border-solid p-4 border-gray-300'>
                        <Avatar size='large' icon={<UserOutlined />} />
                        <div className='flex-grow flex flex-col gap-2'>
                            <Input.TextArea className='rounded-lg' rows={2} placeholder='Write something...'/>
                            <div className='flex justify-between'>
                                <div className='space-x-2'>
                                    <CameraFilled/>
                                    <span>Attach a photo</span>
                                </div>
                                <button className='py-1 px-4 text-white bg-green-500 border-none hover:bg-green-600 rounded transition'>Share</button>
                            </div>

                        </div>
                    </div>

                    <div className='my-4 flex flex-col gap-4 max-w-xl mx-auto'>
                        <Post />
                        <Post />
                        <Post />
                    </div>

                </div>
            </div>

        </div>
    )
}