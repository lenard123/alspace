import { fetchConversations } from "@/js/apis/UserApi";
import useApi from "@/js/hooks/useApi";
import useThreadsAction from "@/js/recoil/actions/useThreadsAction";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, List, PageHeader } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from "recoil";
import threadsState from "@/js/recoil/states/threadsState";
import NewMessage from "./components/NewMessage";

export default function MessageLayout() {
    const [isOpen, setIsOpen] = useState(false)
    const { setThreads } = useThreadsAction()
    const { data, status, isLoading } = useApi(fetchConversations, { executeOnMount: true });
    const threads = useRecoilValue(threadsState)
    const conversations = useMemo(() => Object.values(threads), [threads])

    useEffect(() => {
        if (status === 'success') {
            setThreads(data)
        }
    }, [status])

    return (
        <>
            <div className='lg:py-4' style={{ height: 'calc(100vh - var(--header-height))' }}>
                <div className='bg-white border flex border-gray-200 rounded-lg flex-grow w-full h-full max-w-5xl mx-auto'>
                    <div className='border-r border-gray-200 w-full min-w-[300px] md:w-[300px]'>
                        <PageHeader
                            className='border-b border-gray-200'
                            title='Conversations'
                            extra={[
                                <Button onClick={() => setIsOpen(true)} type='text' shape='circle' key='new-message' icon={<EditOutlined />} />
                            ]}
                        />

                        <List
                            loading={conversations.length <= 0 && isLoading}
                            dataSource={conversations}
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
            <NewMessage isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    )
}