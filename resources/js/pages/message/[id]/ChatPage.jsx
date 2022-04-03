import useThread from "@/js/recoil/selectors/useThread";
import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input, PageHeader, Spin } from "antd";
import { useParams } from "react-router-dom";
import ScrollToBottom from 'react-scroll-to-bottom'
import { useEffect } from 'react'
import useApi from "@/js/hooks/useApi";
import { fetchThread } from "@/js/apis/ThreadApi";
import useThreadsAction from "@/js/recoil/actions/useThreadsAction";
import useMessages from "@/js/recoil/selectors/useMessages";
import MessagesList from "./components/MessagesList";
import WriteMessage from "./components/WriteMessage";

export default function ChatPage() {

    const { id } = useParams()
    const { execute, status, data, isLoading } = useApi(fetchThread)
    const thread = useThread(id)
    const messages = useMessages(id)
    const { setThread } = useThreadsAction()

    useEffect(() => {
        if (status === 'success') {
            setThread(data)
        }
    }, [status])

    useEffect(() => {
        execute(id)
    }, [id])

    if (!thread) {
        return <div className='bg-white z-[5] flex h-full items-center justify-center fixed sm:static inset-0'><Spin spinning /></div>
    }

    return (
        <div className='bg-white z-[5] flex flex-col h-full fixed sm:static inset-0'>
            <PageHeader
                className='border-b border-gray-200'
                title={thread.title}
                avatar={{ src: thread.avatar }}
            />

            {
                messages.length <= 0 && isLoading
                    ? <div className='flex flex-grow items-center justify-center'><Spin spinning /></div>
                    : <ScrollToBottom className='child-scroller flex-grow pl-2 max-h-full overflow-y-hidden'>
                        <MessagesList messages={messages} />
                      </ScrollToBottom>
            }

            <WriteMessage id={id}/>

        </div>
    )
}