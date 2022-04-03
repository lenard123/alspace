import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input, PageHeader } from "antd";
import ScrollToBottom from 'react-scroll-to-bottom'

export default function ChatPage() {
    return (
        <div className='flex flex-col h-full'>
            <PageHeader
                className='border-b border-gray-200'
                title='Alspace Support'
                avatar={{ src: 'https://8000-lenard456-alspace-dllwy24lwr6.ws-eu38.gitpod.io/images/logo.png' }}
            />

            <ScrollToBottom className='child-scroller flex-grow pl-2 max-h-full overflow-y-hidden'>
                {/* <MessagesList messages={messages} /> */}
            </ScrollToBottom>

            <Comment
                className='mx-4'
                avatar={<Avatar src='https://avatars.dicebear.com/api/initials/lenard+mangay-ayam.svg' />}
                content={
                    <Input
                        size='large'
                        className='rounded-full'
                        placeholder='Write a message'
                        suffix={
                            true
                                ? <Button type='text' size='small' icon={<SendOutlined className='text-blue-500' />} />
                                : <span />
                        }
                    />
                }
            />

        </div>
    )
}