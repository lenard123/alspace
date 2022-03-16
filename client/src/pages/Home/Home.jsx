import { Avatar, Input, Divider } from 'antd'
import { UserOutlined, CameraFilled, LikeOutlined, CommentOutlined } from '@ant-design/icons'
import MainLayout from '/src/components/layout/MainLayout'


export default function() {
    return (
        <MainLayout>
            
            <div className='flex gap-2 max-w-xl mx-auto md:rounded-lg bg-white mt-4 border border-solid p-4 border-gray-300'>
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

            <div className='flex flex-col gap-4 max-w-xl mx-auto md:rounded-lg bg-white mt-4 border border-solid p-4 pb-1 border-gray-300'>
                
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
                    lorem ipsum dolor sit amet
                </div>

                <div>
                    <div className='flex gap-2 text-base pt-1 border-t border-gray-300'>
                        <button className='flex-grow py-1 bg-white rounded-full'><LikeOutlined /></button>
                        <button className='flex-grow py-1 bg-white rounded-full'><CommentOutlined /></button>
                    </div>
                </div>


            </div>



        </MainLayout>

    )
}