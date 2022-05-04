import ConversationPanel from "@/js/components/ConversationPanel";
import useSupportThreadsQuery from "@/js/query/queries/useSupportThreadsQuery";
import { Avatar, List } from "antd";
import classNames from "classnames";
import { Link, Route, Routes } from "react-router-dom";
import ChatPage from "@/js/components/ConversationPanel/components/ChatPage";

export default function MessageIndexPage()
{

    const { isLoading, data } = useSupportThreadsQuery()

    return (
        <ConversationPanel
            isLoading={isLoading}
            conversations={data}
            renderItem={thread => (
                <List.Item>
                    <Link to={`/admin/messages/${thread.id}`} className='w-full px-4 flex gap-2 items-center'>
                        <Avatar size='large' src={thread.avatar} />
                        <div className='flex flex-col h-full flex-grow leading-4'>
                            <span className='font-semibold'>{thread.title}</span>
                            <span className={classNames({'font-bold': thread.unread_messages_count})}>{thread.unread_messages_count ? thread.unread_messages_count : 'No'} unread messages</span>
                        </div>
                    </Link>
                </List.Item>
            )}
            >
            <Routes>
                <Route index element={
                    <span>index</span>
                }/>
                <Route path=":id" element={<ChatPage admin/>} />
            </Routes>
        </ConversationPanel>
    )
}
