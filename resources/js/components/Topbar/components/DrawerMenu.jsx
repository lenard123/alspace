import { Avatar, Badge, Button, Drawer, Menu } from "antd"
import { ArrowLeftOutlined, BellOutlined, CalendarOutlined, LogoutOutlined, MessageOutlined, QuestionCircleOutlined, SearchOutlined, SettingOutlined } from "@ant-design/icons"
import { BriefcaseOutlined } from "@/js/components/icons"
import { Link } from "react-router-dom"
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery"
import { useLogout } from "@/js/hooks"

export default function DrawerMenu({isDrawerVisible, setIsDrawerVisible}) {

    const { showLogoutModal } = useLogout()
    const {id, fullname, avatarUrl, unread_thread_count, unread_notifications_count } = useCurrentUser()

    const menuClicked = ({key}) => {
        setIsDrawerVisible(false)
        if (key === 'logout') {
            showLogoutModal()
        }
    }

    return (
        <Drawer 
            bodyStyle={{padding:'0 .5rem'}} 
            width={300} 
            extra={<Button type='text' icon={<SearchOutlined />}/>} 
            closeIcon={<ArrowLeftOutlined />} 
            title="Menu" 
            placement="right"
            onClose={() => setIsDrawerVisible(false)} 
            visible={isDrawerVisible}
            >
            <Link onClick={() => setIsDrawerVisible(false)} to={`/profile/${id}`} className='flex gap-2 items-center p-2 border-b border-gray-200'>
                <Avatar size='large' src={avatarUrl}/>
                <div className='flex flex-col flex-grow h-full leading-4'>
                    <div className='font-semibold'>{fullname}</div>
                    <div>View your profile</div>
                </div>
            </Link>
            <Menu size='large' onClick={menuClicked}>
                
                <Menu.Item key='messages' icon={<MessageOutlined />}>
                    <Link to='/messages'>Message</Link>
                    <Badge dot={unread_thread_count} />
                </Menu.Item>
                
                <Menu.Item key='notifications' icon={<BellOutlined />}>
                    <Link to='/notifications'>Notifications</Link>
                    <Badge dot={unread_notifications_count} />
                </Menu.Item>
                
                <Menu.Item key='jobs' icon={<BriefcaseOutlined />}>
                    <Link to='/jobs'>Jobs</Link>
                </Menu.Item>
                
                <Menu.Item key='events' icon={<CalendarOutlined />}>
                    <Link to='/events'>Events</Link>
                </Menu.Item>
                
                <Menu.Item key='questions' icon={<QuestionCircleOutlined />}>
                    <Link to='/questions'>Questions</Link>
                </Menu.Item>
                
                <Menu.Item key='settings' icon={<SettingOutlined />}>
                    <Link to='/settings'>Settings</Link>
                </Menu.Item>
                
                <Menu.Item key='logout' icon={<LogoutOutlined />}>Logout</Menu.Item>
            </Menu>
        </Drawer>
    )
}