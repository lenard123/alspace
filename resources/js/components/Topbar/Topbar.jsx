import { MessageOutlined, BellOutlined } from '@ant-design/icons'
import NavLink from '../layout/MainLayout/components/NavLink'
import UserAvatar from '../layout/MainLayout/components/UserAvatar'
import { useCurrentUser } from '@/js/query/queries/useCurrentUserQuery'
import { useState } from 'react'
import DrawerMenu from './components/DrawerMenu'
import NavbarLinks from './components/NavbarLinks'
import NavbarLogo from './components/NavbarLogo'

export default function Topbar() {

    const { unread_thread_count, unread_notifications_count } = useCurrentUser()
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)
    const showDot = Boolean(unread_thread_count + unread_notifications_count)

    return (
        <>
            <header className='sticky top-0 z-10 w-full bg-white header-height border-b border-gray-200 px-4 sm:px-8'>

                <div className='max-w-screen-lg mx-auto h-full flex justify-between items-center'>

                    <div className='flex w-full lg:w-auto'>
                        <NavbarLogo showDot={showDot} showDrawer={() => setIsDrawerVisible(true)}/>
                        <NavbarLinks />
                    </div>

                    <div className='hidden md:flex justify-end items-center gap-4'>
                        <nav className='flex gap-2'>
                            <NavLink to='/messages' badge={{ dot: unread_thread_count }} title='Message' icon={<MessageOutlined className='text-gray-500' />} />
                            <NavLink to='/notifications' badge={{ dot: unread_notifications_count }} title='Notifications' icon={<BellOutlined className='text-gray-500' />} />
                        </nav>
                        <UserAvatar />
                    </div>
                </div>
            </header>
            <DrawerMenu isDrawerVisible={isDrawerVisible} setIsDrawerVisible={setIsDrawerVisible} />
        </>
    )
}