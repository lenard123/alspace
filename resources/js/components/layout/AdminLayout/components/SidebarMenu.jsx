import { DesktopOutlined, FileOutlined, HomeOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { AdminLayoutContext } from "../AdminLayout";

const getItem = (label, key, icon, children) => ({label, key, icon, children})

const items = [
    getItem('Dashboard', '/admin', <HomeOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Users', 'sub1', <UserOutlined />, [
        getItem('Pending Users', '/admin/users/pending'),
        getItem('Alumni', '/admin/users/alumni')
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('System Settings', '/admin/settings', <SettingOutlined />),
];

export default function SidebarMenu() {

    const { collapsed } = useContext(AdminLayoutContext)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleClick = ({key}) => { 
        navigate(key)
    }

    return (
        <Menu
            theme='dark'
            mode='inline'
            inlineCollapsed={collapsed}
            selectedKeys={[pathname]}
            items={items}
            onClick={handleClick}
        />
    )
}