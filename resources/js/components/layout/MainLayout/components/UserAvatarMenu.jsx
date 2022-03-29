import { Modal, Avatar, Divider, Menu } from 'antd'
import { LogoutOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import useApi from '@/js/hooks/useApi'
import { AuthApi } from '@/js/apis'
import useAuthActions from '@/js/recoil/actions/useAuthActions'
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector'

const UserAvatarMenu = ({ setIsOpen }) => {
    const { execute, navigate, message } = useApi(AuthApi.logout)
    const { removeCurrentUser } = useAuthActions()
    const currentUser = useRecoilValue(currentUserSelector)

    const menuClicked = ({key}) => {
        setIsOpen(false)
        if (key === 'logout') {
            Modal.confirm({
                title: 'Confirm logout',
                content: 'Are you sure to logout?',
                async onOk() {
                    await execute()
                    removeCurrentUser()
                    navigate('/login')
                    message.success('Logout successfully')
                }
            })
        }
    }
    
    return (
        <div className='bg-white p-4 shadow'>
            <div className='flex items-center gap-4'>
                <Avatar src={currentUser.avatar} size={60}/>
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