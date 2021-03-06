import { Button, PageHeader, Spin } from "antd";
import { useParams } from "react-router-dom";
import ScrollToBottom from 'react-scroll-to-bottom'
import MessagesList from "./MessagesList";
import WriteMessage from "./WriteMessage";
import useThreadQuery from "@/js/query/queries/useThreadQuery";
import { Helmet } from 'react-helmet'
import useThreadMessagesQuery from "@/js/query/queries/useThreadMessagesQuery";

export default function ChatPage({ admin = false }) {
    const { id } = useParams()
    const { data: thread, isLoading: loadingThread, } = useThreadQuery(id)
    const { isLoading, data: messages, hasNextPage, fetchNextPage, isFetchingNextPage } = useThreadMessagesQuery(id, {
        staleTime: 0,
        enabled: !!thread?.id
    })

    if (loadingThread) {
        return <div className='bg-white z-[5] flex h-full items-center justify-center fixed sm:static inset-0'><Spin spinning /></div>
    }

    return (
        <>
            <Helmet>
                <title>{thread.title}</title>
            </Helmet>

            <div className='bg-white z-[5] flex flex-col h-full fixed sm:static inset-0'>
                <PageHeader
                    className='border-b border-gray-200'
                    title={thread.title}
                    avatar={{ src: thread.avatar }}
                />

                {
                    isLoading
                        ? <div className='flex flex-grow items-center justify-center'><Spin spinning /></div>
                        : <ScrollToBottom className='child-scroller flex-grow  max-h-full overflow-y-hidden'>
                            {hasNextPage && 
                                <div className=' border-b border-gray-200'>
                                    <Button loading={isFetchingNextPage} onClick={fetchNextPage} className='font-semibold' type='link'>See older messages</Button>
                                </div>
                            }
                            <MessagesList messages={messages} />
                        </ScrollToBottom>
                }

                <WriteMessage id={id} admin={admin}/>

            </div>
        </>
    )
}

