//import Logo from '../../../images/logo.png'
import { Avatar, Button, Input, } from 'antd'
import { MenuOutlined, SearchOutlined, UserOutlined, MessageOutlined, BellOutlined, CalendarOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { BriefcaseOutlined } from '../icons'

export default function()
{
    return (
        <div className='sticky top-0 z-[1] w-full bg-white header-height shadow px-4'>
            
            <div className='max-w-5xl mx-auto h-full flex justify-between items-center'>
                <div className='flex w-full lg:w-auto'>
                    {/* Logo */}
                    <div className='flex w-full lg:w-auto justify-between items-center'>
                        <Link to='/' className='flex gap-2 items-center'>
                            <img className='rounded' src='/images/logo.png' height='32' width='auto' />
                            <span className='font-bold text-xl'>Alspace</span>
                        </Link>
                        <Button className='lg:hidden' icon={<MenuOutlined/>} />
                    </div>
                    {/* Searchbox */}
                    <div className='ml-8 hidden lg:block'>
                        <Input
                            prefix={<SearchOutlined className='text-gray-400' />}
                            className='rounded-lg'
                            size='large'
                            placeholder='Search for users or post'
                        />
                    </div>
                </div>

                {/* Right */}
                <div className='hidden lg:flex justify-end items-center gap-8'>
                    <div className='flex gap-2'>
                        <Button className='rounded-lg' icon={<MessageOutlined className='text-gray-500' />} /> 
                        <Button className='rounded-lg' icon={<BellOutlined className='text-gray-500' />} /> 
                        <Button className='rounded-lg' icon={<BriefcaseOutlined className='text-gray-500' />} />
                        <Button className='rounded-lg' icon={<CalendarOutlined className='text-gray-500' />} />
                    </div>

                    <Avatar size='large' icon={<UserOutlined />} />
                </div>

            </div>


            


        </div>
    )
}