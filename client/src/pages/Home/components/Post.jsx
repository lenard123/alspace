import { Avatar,  } from 'antd'
import { UserOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons'

export default function () 
{
    return (
        <div className='flex flex-col gap-4 w-full sm:rounded-lg bg-white border border-solid p-4 pb-1 border-gray-300'>
                
            <div className='flex gap-2 items-center'>
                <Avatar size='large' icon={<UserOutlined />} />
                <div className='flex justify-between'>
                    <div className='flex flex-col leading-3'>
                        <span className='font-bold'>Lenard Mangay-ayam</span>
                        <span className='text-sm'>2 hours ago</span>
                    </div>
                </div>
            </div>

            <div>
                lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, 
            </div>

            <div className='flex gap-2 text-lg pt-1 border-t border-gray-300'>
                <button className='flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'><LikeOutlined /></button>
                <button className='flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'><CommentOutlined /></button>
            </div>


        </div>
    )
}