import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useState } from 'react'
import NewMessage from "./components/NewMessage";
import useThreadsQuery from "@/js/query/queries/useThreadsQuery";
import classNames from "classnames";
import ConversationPanel from "../../ConversationPanel";

export default function MessageLayout() {
    const [isOpen, setIsOpen] = useState(false)
    const { isLoading, data } = useThreadsQuery()

    return (
        <>
            <ConversationPanel 
                isLoading={isLoading}
                conversations={data}
                renderItem={thread => (
                    <List.Item>
                        <Link to={`/messages/${thread.id}`} className='w-full px-4 flex gap-2 items-center'>
                            <Avatar size='large' src={thread.avatar} />
                            <div className='flex flex-col h-full flex-grow leading-4'>
                                <span className='font-semibold'>{thread.title}</span>
                                <span className={classNames({'font-bold': thread.unread_messages_count})}>{thread.unread_messages_count ? thread.unread_messages_count : 'No'} unread messages</span>
                            </div>
                        </Link>
                    </List.Item>
                )}
                extra={<Button onClick={() => setIsOpen(true)} type='text' shape='circle' key='new-message' icon={<EditOutlined />} />}
                >
                <Outlet/>
            </ConversationPanel>
            {/* <div className='lg:py-4' style={{ height: 'calc(100vh - var(--header-height))' }}>
                <div className='bg-white border flex border-gray-200 rounded-lg flex-grow w-full h-full max-w-5xl mx-auto'>
                    <div className='border-r border-gray-200 w-full min-w-[300px] sm:w-[300px]'>
                        <PageHeader
                            className='border-b border-gray-200'
                            title='Conversations'
                            extra={[
                                <Button onClick={() => setIsOpen(true)} type='text' shape='circle' key='new-message' icon={<EditOutlined />} />
                            ]}
                        />

                        <List
                            loading={isLoading}
                            dataSource={conversations}
                            renderItem={thread => (
                                <List.Item>
                                    <Link to={`/messages/${thread.id}`} className='w-full px-4 flex gap-2 items-center'>
                                        <Avatar size='large' src={thread.avatar} />
                                        <div className='flex flex-col h-full flex-grow leading-4'>
                                            <span className='font-semibold'>{thread.title}</span>
                                            <span className={classNames({'font-bold': thread.unread_messages_count})}>{thread.unread_messages_count ? thread.unread_messages_count : 'No'} unread messages</span>
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
            </div> */}
            <NewMessage isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    )
}