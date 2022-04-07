import { Avatar, Divider, Menu } from 'antd'
import { LogoutOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useMainLayoutLogic from '../useMainLayoutLogic'
import { useCurrentUser } from '@/js/queries/useCurrentUserQuery'

const UserAvatarMenu = ({ setIsOpen }) => {
    const currentUser = useCurrentUser()
    const { showLogoutModal } = useMainLayoutLogic()

    const menuClicked = ({key}) => {
        setIsOpen(false)
        if (key === 'logout') {
            showLogoutModal()
        }
    }
    
    return (
        <div className='bg-white p-4 shadow'>
            <div className='flex items-center gap-4'>
                <Avatar src={currentUser.avatarUrl} size={60}/>
                <div className='flex flex-col leading-3 text-gray-700'>
                    <span className='text-lg font-bold'>{currentUser.firstname} {currentUser.lastname}</span>
                    <Link onClick={() => setIsOpen(false)} to={`/profile/${currentUser.id}`}>See your profile</Link>
                </div>
            </div>

            <Divider className='my-4'/>

            <Menu onClick={menuClicked}>
                <Menu.Item key='settings' icon={<SettingOutlined />}>
                    <Link to='/settings'>Settings</Link>
                </Menu.Item>
                <Menu.Item key='questions' icon={<QuestionCircleOutlined />}>
                    <Link to='/questions'>Questions</Link>
                </Menu.Item> 
                <Menu.Item key='logout' icon={<LogoutOutlined />}>Logout</Menu.Item>
            </Menu>


        </div>
    )    
}

export default UserAvatarMenu