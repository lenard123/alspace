import {List, PageHeader } from "antd";

export default function ConversationPanel({ isLoading = false, conversations = [], renderItem, extra, children }) {
    return (
        <div className='lg:py-4' style={{ height: 'calc(100vh - var(--header-height))' }}>
            <div className='bg-white border flex border-gray-200 rounded-lg flex-grow w-full h-full max-w-5xl mx-auto'>
                <div className='border-r border-gray-200 w-full min-w-[300px] sm:w-[300px]'>
                    <PageHeader
                        className='border-b border-gray-200'
                        title='Conversations'
                        extra={[extra]}
                    />

                    <List
                        loading={isLoading}
                        dataSource={conversations}
                        renderItem={renderItem}
                    />


                </div>

                <div className='flex-grow'>
                    {children}
                </div>

            </div>
        </div>
    )
}