import { BriefcaseOutlined } from "@/js/components/icons";
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { CalendarOutlined, DesktopOutlined, FileOutlined, HomeOutlined, SettingOutlined, ShoppingCartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { AdminLayoutContext } from "../AdminLayout";

const getItem = (label, key, icon, children) => ({label, key, icon, children})

const items = (role) => [
    getItem('Dashboard', '/admin', <HomeOutlined />),
    getItem('Users', 'sub1', <UserOutlined />, [
        getItem('Pending Users', '/admin/users/pending'),
        getItem('Alumni', '/admin/users/alumni'),
        role === 'super' && getItem('Moderator', '/admin/users/moderator')
    ]),
    getItem('Events', 'sub2', <CalendarOutlined />, [
        getItem('Requires Approval', '/admin/events?filter=require-approval'),
        getItem('Upcoming Events', '/admin/events?filter=active'), 
        getItem('Past Events', '/admin/events?filter=past'),
        getItem('Cancelled Events', '/admin/events?filter=cancelled'),
    ]),
    getItem('Job Ads', 'sub3', <BriefcaseOutlined />, [
        getItem('Requires Approval', '/admin/jobs/pending'),
        getItem('Posted Jobs', '/admin/jobs/')
    ]),
    getItem('Alumni Items', 'sub4', <ShoppingCartOutlined />, [
        getItem('Alumni T-shirt', '/admin/items/tshirt'),
        getItem('Requests', '/admin/items/requests'),
    ]),
    getItem('Reports', 'sub5', <FileOutlined />),
    getItem('System Settings', '/admin/settings', <SettingOutlined />, [
        getItem('Manage FAQs','/admin/settings/faqs'),
    ]),
];

export default function SidebarMenu() {

    const { role } = useCurrentUser()
    const { collapsed } = useContext(AdminLayoutContext)
    const { pathname, search } = useLocation()
    const navigate = useNavigate()

    const handleClick = ({key}) => { 
        navigate(key)
    }

    return (
        <Menu
            theme='light'
            mode='inline'
            inlineCollapsed={collapsed}
            selectedKeys={[`${pathname}${search}`, pathname]}
            items={items(role)}
            onClick={handleClick}
        />
    )
}