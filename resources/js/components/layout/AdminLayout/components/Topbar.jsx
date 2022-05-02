import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useContext } from 'react'
import { AdminLayoutContext } from "../AdminLayout";
import TopbarAvatar from "./TopbarAvatar";

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
                <TopbarAvatar />
            </div>

        </Header>
    )
}