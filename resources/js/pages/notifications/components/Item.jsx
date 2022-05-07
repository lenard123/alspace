import { Avatar } from 'antd'
import useUserQuery from '@/js/query/queries/useUserQuery'
import moment from 'moment'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'


const getNotificationType = (type, payload) => {
    switch (type) {
        case "App\\Notifications\\PostLiked": {
            return {
                message: 'like your post.',
                link: {
                    to: `/posts/${payload.post_id}`
                }
            }
        }
    }

    throw 'Unknown Notification'
}

export default function Item({ notification }){
    const { created_at, type, data, read_at } = notification
    const { message, link } = getNotificationType(type, data)
    const { data:user, isLoading } = useUserQuery(data.notifier_id)
    const fromNow = useMemo(() => moment(created_at).fromNow(), [created_at])

    if (isLoading) {
        return 'Loading'
    }

    return(
        <Link className="flex gap-3 w-full mx-6" {...link}>
            <Avatar size='large' src={user.avatarUrl} />

            <div className="flex flex-col leading-3">
                <span className="text-gray-700 mt-2">
                    <strong>{user.fullname} </strong>
                    {message}
                </span>
                <span className="text-gray-500 text-sm">{fromNow}</span>
            </div>
        </Link>
    )
}