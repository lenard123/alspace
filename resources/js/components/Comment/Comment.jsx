import moment from 'moment'
import { Avatar,  Comment as AntComment, Tooltip} from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import useUser from '@/js/recoil/selectors/useUser'

export default function Comment({comment})
{

    const author = useUser(comment.user_id)

    return (
        <AntComment 
            actions={[
                <span key='like'>
                    <LikeOutlined />
                    <span className='pl-1'>Like</span>
                </span>,
                <span key='reply'>Reply</span>,
                <span key='view-replies'>View Replies</span>
            ]}
            author={author.fullname}
            avatar={<Avatar src={author.avatarUrl} />}
            content={
                <p>{comment.content}</p>
            }
            datetime={
                <Tooltip title={moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(comment.created_at).fromNow()}</span>
                </Tooltip>
            }
        />
    )
}