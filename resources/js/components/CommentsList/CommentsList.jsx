import { Avatar, Comment, List, Skeleton, Spin } from "antd"
import moment from 'moment'
import usePostCommentsQuery from "@/js/queries/usePostCommentsQuery"
import { LoadingOutlined } from "@ant-design/icons"
import WriteComment from "@/js/components/WriteComment"

export default function CommentsList({ id }) {
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = usePostCommentsQuery(id)
    return (
        <List
            className="list-class-ytest"
            size='small'
            header={hasNextPage && (
                <a onClick={fetchNextPage} className='font-bold'>
                    Load Previous <Spin spinning={isFetchingNextPage} indicator={<LoadingOutlined />} />
                </a>
            )}
            footer={
                <WriteComment submitHandler={() => {}} callback={() => {}} />
            }
            locale={{ emptyText: 'Be the first to comment' }}
            dataSource={data}
            renderItem={comment => (
                <List.Item key={comment.id} style={{ padding: 0 }}>
                    <Skeleton rows={1} avatar loading={comment.isLoading}>
                        <Comment
                            actions={[
                                <span key='like'>Like</span>,
                                <span key='reply'>Reply</span>,
                                <span key='view'>View Replies</span>,
                            ]}
                            avatar={<Avatar src={comment.user.avatarUrl} />}
                            author={comment.user.fullname}
                            content={comment.content}
                            datetime={moment(comment.created_at).fromNow()}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}