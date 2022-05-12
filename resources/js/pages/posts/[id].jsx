import Post from "@/js/components/Post"
import usePostQuery from "@/js/query/queries/usePostQuery"
import { Skeleton } from "antd"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Helmet } from 'react-helmet'
import CommentsList from "@/js/components/CommentsList"
import { useEffect } from 'react'
import useReadNotificationAction from "@/js/query/actions/useReadNotificationAction"

export default function ViewPostPage() {
    const { id } = useParams()
    const { state } = useLocation()
    const { post, notification } = state || {}
    const { isLoading, data, isSuccess, isError, error } = usePostQuery(id, post)
    const { mutate:readNotification } = useReadNotificationAction()
    const navigate = useNavigate()

    useEffect(() => {
        if (!notification) return;

        //has already read
        if (notification.read_at !== null) return;

        readNotification(notification.id)
    }, [notification])

    if (isError) {
        throw error
    }

    return (
        <>
            <Helmet>
                <title>{isSuccess ? data.author.fullname : 'Alspace'}</title>
            </Helmet>
            <div className='max-w-xl mx-auto sm:pt-4 pb-4'>
                <Skeleton className='p-4' loading={isLoading} avatar active>
                    <Post post={data} onDelete={() => navigate('/home', { replace: true })}>
                        <CommentsList type='post' id={id} />
                    </Post>
                </Skeleton>
            </div>
        </>
    )
}