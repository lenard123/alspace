import moment from 'moment'
import { Avatar,  Comment, Tooltip} from 'antd'
import { LikeOutlined } from '@ant-design/icons'

export default function({comment})
{
    return (
        <Comment 
            actions={[
                <span key='comment-like'>
                    <LikeOutlined />
                    <span className='pl-1'>Like</span>
                </span>,
                <span key='comment-reply'>View Replies</span>
            ]}
            author='Lenard Mangay-ayam'
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p>{comment}</p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    )
}