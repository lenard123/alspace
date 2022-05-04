import Post from "@/js/components/Post"
import usePostQuery from "@/js/query/usePostQuery"
import { Skeleton } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { Helmet } from 'react-helmet'
import CommentsList from "@/js/components/CommentsList"


export default function ViewPostPage() {
    const { id } = useParams()
    const { isLoading, data, isSuccess } = usePostQuery(id)
    const navigate = useNavigate()

    const onDelete = () => {
        navigate('/')
    }

    return (
        <>
            <Helmet>
                <title>{isSuccess ? data.author.fullname : 'Alspace'}</title>
            </Helmet>
            <div className='max-w-xl mx-auto sm:pt-4 pb-4'>
                <Skeleton className='p-4' loading={isLoading} avatar active>
                    <Post post={data} onDelete={onDelete}>
                        <CommentsList type='post' id={id} />
                    </Post>
                </Skeleton>
            </div>
        </>
    )
}