import Logo from '/assets/logo.png'
import { Avatar, Button, Input, } from 'antd'
import { MenuOutlined, SearchOutlined, UserOutlined, MessageOutlined, BellOutlined } from '@ant-design/icons'

export default function()
{
    return (
        <div className='sticky top-0 w-full bg-white grid gap-2 lg:grid-cols-12 h-15 px-4 shadow'>
            
            {/* Logo */}
            <div className='col-span-3 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img className='rounded' src={Logo} height='32' width='auto' />
                    <span className='font-bold text-xl'>Alspace</span>
                </div>
                <Button className='lg:hidden' icon={<MenuOutlined/>} />
            </div>

            {/* Search */}
            <div className='col-span-5 hidden lg:flex'>
                <Input 
                    prefix={<SearchOutlined className='text-gray-500'/>}
                    className='my-auto rounded' 
                    placeholder='Search for posts, jobs, or events' 
                />
            </div>
            
            {/* Right */}
            <div className='col-span-4 hidden lg:flex justify-end items-center gap-8'>
                <div className='flex gap-2'>
                    <Button className='rounded-lg' icon={<MessageOutlined className='text-gray-500' />} /> 
                    <Button className='rounded-lg' icon={<BellOutlined className='text-gray-500' />} /> 
                </div>

                <Avatar icon={<UserOutlined />} />
            </div>

        </div>
    )
}