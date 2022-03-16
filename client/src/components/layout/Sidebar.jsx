import { 
    MessageOutlined, 
    BellOutlined,
    QuestionCircleOutlined,
    CalendarOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    HomeOutlined
} from '@ant-design/icons'
import { 
    Newspaper,
    BriefcaseOutlined
} from '/src/components/icons'
import Item from './SidebarItem'

export default function()
{
    return (
        <div className='hidden lg:block max-h-full -ml-4'>
            <div className='py-4'>
                <div className='flex flex-col'>

                    <Item 
                        title="Discussion" 
                        icon={<HomeOutlined style={{fontSize: '1.375rem'}}/>} 
                    /> 

                    <Item 
                        title="Chats" 
                        icon={<MessageOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                    <Item 
                        title="Notifications" 
                        icon={<BellOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                    <Item 
                        title="Questions" 
                        icon={<QuestionCircleOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                    <Item 
                        title="Jobs" 
                        icon={<BriefcaseOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                    <Item 
                        title="Event" 
                        icon={<CalendarOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                    <Item 
                        title="Profiles" 
                        icon={<UserOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                    <Item 
                        title="Settings" 
                        icon={<SettingOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                    <Item 
                        title="Logout" 
                        icon={<LogoutOutlined style={{fontSize: '1.375rem'}}/>} 
                    />

                </div>

            </div>
        </div>
    )
}