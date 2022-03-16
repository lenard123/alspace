import { Avatar, Input } from 'antd'
import { UserOutlined, CameraFilled } from '@ant-design/icons'
import Post from './components/Post'

export default function() {
    return (
        <>
            
            <div className='flex gap-2 max-w-xl mx-auto sm:rounded-lg bg-white mt-4 border border-solid p-4 border-gray-300'>
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

        </>

    )
}