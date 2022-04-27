import { DesktopOutlined, FileOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Layout, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import classNames from "classnames";
import { useState } from 'react'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];


export default function Dashboard() {

    const [collapsed, setCollapsed] = useState(false)
    const [broken, setBroken] = useState(false)

    return (
        <Layout className='min-h-screen' hasSider>
            <Sider 
                breakpoint="md"
                collapsedWidth={broken ? 0 : 80}
                className='overflow-auto h-screen sticky top-0' 
                collapsible 
                collapsed={collapsed} 
                onBreakpoint={broken => setBroken(broken)}
                onCollapse={(collapsed) => setCollapsed(collapsed)}
                trigger={null}
                >
                <div className='flex justify-center items-center p-4 mb-8 overflow-hidden'>
                    <img className='rounded mr-2' src='/images/logo.png' width={32} />
                    {!collapsed &&
                        <span
                            className='text-base uppercase inline-block font-bold text-transparent text-ellipsis whitespace-nowrap bg-clip-text'
                            style={{
                                backgroundImage: '-webkit-gradient(linear,37.219838% 34.532506%,36.425669% 93.178216%,from(#29cdff),to(#0a60ff),color-stop(.37,#148eff))',
                                textFillColor: 'transparent'
                            }}
                        >Alspace Admin</span>
                    }
                </div>

                <Menu 
                    theme='dark' 
                    mode='inline' 
                    inlineCollapsed={collapsed} 
                    defaultSelectedKeys={['1']} 
                    items={items}
                />

            </Sider>

            <Layout>
                <Header className='px-4 bg-white flex justify-between items-center sticky top-0'>
                    <Button 
                        onClick={() => setCollapsed(collapsed => !collapsed)}
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
                        type='text'
                    />

                    <div>
                        <Avatar icon={<UserOutlined />}/>
                    </div>

                </Header>
                <Content className='mx-4'>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Content>
            </Layout>

        </Layout>
    )
}