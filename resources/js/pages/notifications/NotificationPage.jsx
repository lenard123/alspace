import { useState } from 'react'
import { Badge, Button, List } from 'antd'
import { DotsHorizontalOutlined } from '@/js/components/icons'
import useNotificationsQuery from '@/js/query/queries/useNotificationsQuery'
import classNames from 'classnames'
import Item from './components/Item'
import Option from '@/js/components/Option'
import NotificationOption from './components/NotificationOption'


export default function NotificationPage()
{
    const [unreadOnly, setUnreadOnly] = useState(false)
    const filter = unreadOnly ? 'unread':null
    const { data, isLoading } = useNotificationsQuery(filter)

    return (
        <div className='max-w-lg mx-auto sm:rounded-lg bg-white my-4 border border-gray-300 p-6 flex-grow'>
            <div className="flex justify-between">
                <div className="font-bold text -xl sm:text-2xl text-gray-700">Notifications</div>
                <NotificationOption filter={filter}/>
            </div>

            <div className="mt-4 flex gap-2">
                <button onClick={() => setUnreadOnly(false)} className={classNames('btn btn-secondary rounded-full', { 'active': !unreadOnly })}>All</button>
                <button onClick={() => setUnreadOnly(true)} className={classNames('btn btn-secondary rounded-full', { 'active': unreadOnly })}>Unread</button>
            </div>

            <div className='mt-4 flex flex-col -mx-6'>
                <List
                    dataSource={data}
                    loading={isLoading}
                    renderItem={(notification) => (
                        <List.Item className={classNames({'bg-slate-50': notification.read_at === null})}>
                            <Item notification={notification}/>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}