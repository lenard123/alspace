import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useContext } from 'react'
import { AdminLayoutContext } from "../AdminLayout";

export default function Topbar() {
    const {collapsed, setCollapsed} = useContext(AdminLayoutContext)

    
    return (
        <Header className='px-4 bg-white flex justify-between items-center sticky top-0'>
            <Button
                onClick={() => setCollapsed(collapsed => !collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                type='text'
            />

            <div>
                <Avatar icon={<UserOutlined />} />
            </div>

        </Header>
    )
}