import { BriefcaseOutlined } from "@/js/components/icons";
import { CalendarOutlined, DesktopOutlined, FileOutlined, HomeOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { AdminLayoutContext } from "../AdminLayout";

const getItem = (label, key, icon, children) => ({label, key, icon, children})

const items = [
    getItem('Dashboard', '/admin', <HomeOutlined />),
    getItem('Users', 'sub1', <UserOutlined />, [
        getItem('Pending Users', '/admin/users/pending'),
        getItem('Alumni', '/admin/users/alumni')
    ]),
    getItem('Events', 'sub2', <CalendarOutlined />, [
        getItem('Requires Approval', '/admin/events?filter=pending'),
        getItem('Upcoming Events', '/admin/events?filter=upcoming'), 
        getItem('Past Events', '/admin/events?filter=past'),
        getItem('Cancelled Events', '/admin/events?filter=cancelled'),
    ]),
    getItem('Job Posting', '/admin/jobs', <BriefcaseOutlined />),
    // getItem('Alumni Items', 'sub3'),
    getItem('System Settings', '/admin/settings', <SettingOutlined />),
];

export default function SidebarMenu() {

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
            items={items}
            onClick={handleClick}
        />
    )
}