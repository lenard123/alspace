import { useState } from 'react'
import { Button, Avatar, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { DotsHorizontalOutlined } from '/src/components/icons'

const NotificationItem = ({ name, value }) => (
    <div className="flex gap-3 py-2">

        <Avatar size='large' icon={<UserOutlined />} />

        <div className="flex flex-col leading-3">
            <span className="text-gray-700">
                <strong>{name} </strong>
                {value}
            </span>
            <span className="text-gray-500 text-sm">5 hours ago</span>
        </div>
    </div>
)

const NotificatioButton = ({ children, isActive, ...props }) => {

    const className = (isActive 
        ? 'bg-blue-200 text-blue-500 hover:bg-blue-300'
        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
    )

    return (
        <button
            className={`${className} py-2 px-6 font-bold rounded-full text-sm cursor-pointer transition`}
            {...props}
        >{children}</button>
    )
}

export default function ()
{
    const [unreadOnly, setUnreadOnly] = useState(false)

    const notifications = [
        {name: 'Angelica Kristine San Diego', value: 'like your post'},
        {name: 'Richard Veloria', value: 'commented on your post'},
        {name: 'Ivan Delfin', value: 'replied to your comment'},
    ]

    return (
        <div className='max-w-lg mx-auto sm:rounded-lg bg-white my-4 border border-gray-300 p-8'>
            <div className="flex justify-between">
                <div className="font-bold text-xl sm:text-2xl text-gray-700">Notifications</div>
                <Button type='text' icon={<DotsHorizontalOutlined />}/>
            </div>

            <div className="mt-4 flex gap-2">
                <NotificatioButton onClick={() => setUnreadOnly(false)} isActive={!unreadOnly}>All</NotificatioButton>
                <NotificatioButton onClick={() => setUnreadOnly(true)} isActive={unreadOnly}>Unread</NotificatioButton>
            </div>

            <div className='mt-4 flex flex-col'>
                <List
                    dataSource={unreadOnly ? [] : notifications}
                    locale={{emptyText: 'No unread notifications'}}
                    renderItem={(notification) => (
                        <List.Item>
                            <NotificationItem {...notification} />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}