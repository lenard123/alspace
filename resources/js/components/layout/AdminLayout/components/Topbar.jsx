import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useContext } from 'react'
import { Link } from "react-router-dom";
import { AdminLayoutContext } from "../AdminLayout";
import TopbarAvatar from "./TopbarAvatar";

export default function Topbar() {
    const { collapsed, setCollapsed } = useContext(AdminLayoutContext)


    return (
        <Header className='px-4 bg-white flex justify-between items-center sticky top-0'>
            <Button
                onClick={() => setCollapsed(collapsed => !collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                type='text'
            />

            <div className='flex justify-end items-center gap-8'>
                <nav className='flex gap-2'>
                    
                    <Link to='/admin/notifications'>
                        <Button className='rounded-lg' icon={<BellOutlined className='text-gray-500' />} />
                    </Link>

                    <Link to='/admin/messages'>
                        <Button className='rounded-lg' icon={<MessageOutlined className='text-gray-500' />} />
                    </Link>

                </nav>
                <TopbarAvatar />
            </div>

        </Header>
    )
}