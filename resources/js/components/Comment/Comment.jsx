import moment from 'moment'
import { Avatar,  Comment as AntComment, Tooltip} from 'antd'
import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import useUser from '@/js/recoil/selectors/useUser'
import LikeButton from './components/LikeButton'
import { useCommentLikersCount } from '@/js/recoil/selectors/useComment'

export default function Comment({comment})
{

    const author = useUser(comment.user_id)
    const likersCount = useCommentLikersCount(comment.id)

    return (
        <AntComment 
            actions={[
                <LikeButton id={comment.id} key='like' />,
                <span key='reply'>Reply</span>,
                <span key='view-replies'>View Replies</span>,
                likersCount > 0 && <span>
                    <LikeFilled /> {likersCount}
                </span>
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