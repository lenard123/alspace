import { List, Skeleton, Spin } from "antd"
import usePostCommentsQuery, { useCommentsQuery } from "@/js/queries/usePostCommentsQuery"
import { LoadingOutlined } from "@ant-design/icons"
import WriteComment from "@/js/components/WriteComment"
import Comment from "../Comment"

export default function CommentsList({ type, id, fullname }) {
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } = useCommentsQuery(type, id)

    if (isLoading) {
        return <Skeleton className="p-4" loading={true} avatar active/>
    }

    return (
        <List
            size='small'
            header={hasNextPage && (
                <a onClick={fetchNextPage} className='font-bold'>
                    Load Previous <Spin spinning={isFetchingNextPage} indicator={<LoadingOutlined />} />
                </a>
            )}
            footer={
                <WriteComment type={type} id={id} fullname={fullname}/>
            }
            locale={{ emptyText: type === 'post' ? 'Be the first to comment' : <span/> }}
            dataSource={data}
            renderItem={comment => (
                <List.Item key={comment.id} style={{ padding: 0 }}>
                    <Comment comment={comment} />
                </List.Item>
            )}
        />
    )
}