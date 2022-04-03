import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, List, PageHeader } from "antd";
import { Link, Outlet } from "react-router-dom";

const threads = [
    {
        id: 1,
        title: 'Alspace Support',
        avatar: 'https://8000-lenard456-alspace-dllwy24lwr6.ws-eu38.gitpod.io/images/logo.png',
    },
    {
        id: 2,
        title: 'Lenard Mangay-ayam',
        avatar: 'https://avatars.dicebear.com/api/initials/lenard+mangay-ayam.svg',
    }
]

export default function MessageLayout() {
    return (
        <div className='lg:py-4' style={{ height: 'calc(100vh - var(--header-height))' }}>
            <div className='bg-white border flex border-gray-200 rounded-lg flex-grow w-full h-full max-w-5xl mx-auto'>
                <div className='border-r border-gray-200 w-full md:w-[300px]'>
                    <PageHeader
                        className='border-b border-gray-200'
                        title='Conversations'
                        extra={[
                            <Button type='text' shape='circle' key='new-message' icon={<EditOutlined />} />
                        ]}
                    />

                    <List
                        className='border-b border-gray-200'
                        dataSource={threads}
                        renderItem={thread => (
                            <List.Item>
                                <Link to={`/messages/${thread.id}`} className='w-full px-4 flex gap-2 items-center'>
                                    <Avatar size='large' src={thread.avatar} />
                                    <div className='flex flex-col h-full flex-grow leading-4'>
                                        <span className='font-semibold'>{thread.title}</span>
                                        <span>5 new messages</span>
                                    </div>
                                </Link>
                            </List.Item>
                        )}
                    />


                </div>

                <div className='flex-grow'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}