import { DesktopOutlined, FileOutlined, HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useContext } from 'react'
import { AdminLayoutContext } from "../AdminLayout";

const getItem = (label, key, icon, children) => ({label, key, icon, children})

const items = [
    getItem('Dashboard', '1', <HomeOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

export default function SidebarMenu() {

    const { collapsed } = useContext(AdminLayoutContext)

    return (
        <Menu
            theme='dark'
            mode='inline'
            inlineCollapsed={collapsed}
            defaultSelectedKeys={['1']}
            items={items}
        />
    )
}