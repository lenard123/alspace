import { Badge, Button, Input } from 'antd'
import { MenuOutlined, SearchOutlined, MessageOutlined, BellOutlined, CalendarOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { BriefcaseOutlined } from '@/js/components/icons'
import NavLink from './NavLink'
import UserAvatar from './UserAvatar'
import useDrawerVisibleState from '../useDrawerVisibleState'
import { useCurrentUser } from '@/js/queries/useCurrentUserQuery'

export default function Topbar() {

    const [_isDrawerVisible, setIsDrawerVisible] = useDrawerVisibleState()
    const { unread_thread_count } = useCurrentUser()

    return (
        <header className='sticky top-0 z-[1] w-full bg-white header-height shadow px-4'>

            {/* Container */}
            <div className='max-w-5xl mx-auto h-full flex justify-between items-center'>
                {/* Left */}
                <div className='flex w-full lg:w-auto'>
                    {/* Logo */}
                    <div className='flex w-full lg:w-auto justify-between items-center'>
                        <Link to='/' className='flex gap-2 items-center'>
                            <img className='rounded' src='/images/logo.png' height='32' width='auto' />
                            <span className='font-bold text-xl'>Alspace</span>
                        </Link>
                        <Badge dot={unread_thread_count} className='lg:hidden'>
                            <Button onClick={() => setIsDrawerVisible(true)} icon={<MenuOutlined />} />
                        </Badge>
                    </div>{/* End Logo */}
                    {/* Searchbox */}
                    <div className='ml-8 hidden lg:block'>
                        <Input
                            prefix={<SearchOutlined className='text-gray-400' />}
                            className='rounded-lg'
                            size='large'
                            placeholder='Search for users or post'
                        />
                    </div>{/* End Searchbox */}
                </div>{/* End Left */}

                {/* Right */}
                <div className='hidden lg:flex justify-end items-center gap-8'>
                    <nav className='flex gap-2'>
                        <NavLink to='/messages' badge={{ dot: unread_thread_count }} title='Message' icon={<MessageOutlined className='text-gray-500' />} />
                        <NavLink to='/notifications' title='Notifications' icon={<BellOutlined className='text-gray-500' />} />
                        <NavLink to='/jobs' title='Jobs' icon={<BriefcaseOutlined className='text-gray-500' />} />
                        <NavLink to='/events' title='Events' icon={<CalendarOutlined className='text-gray-500' />} />
                    </nav>
                    <UserAvatar />
                </div>{/* End Right */}
            </div> {/* End Container */}
        </header>
    )
}