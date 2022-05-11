import { Avatar } from 'antd'
import useUserQuery from '@/js/query/queries/useUserQuery'
import moment from 'moment'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ItemSkeleton from './ItemSkeleton'


const formatPostLiked = ({ content, post_id }) => {

    return {
        message: "like your post" +  (content ? `: "${content}"` : '.'),
        link: {
            to: `/posts/${post_id}`
        }
    }
}

const getNotificationType = (type, payload) => {
    switch (type) {
        case "App\\Notifications\\PostLiked": {
            return formatPostLiked(payload)
        }
    }

    throw 'Unknown Notification'
}

export default function Item({ notification }){
    const { created_at, data } = notification
    const { avatar, link, content, } = data
    const fromNow = useMemo(() => moment(created_at).fromNow(), [created_at])

    return(
        <Link className="flex gap-3 w-full mx-6" state={{notification}} to={link}>
            <Avatar className='flex-shrink-0' size='large' src={avatar} />

            <div className="flex flex-col">
                <div className="text-gray-700" dangerouslySetInnerHTML={{__html:content}} />
                <span className="text-gray-500 text-sm">{fromNow}</span>
            </div>
        </Link>
    )
}