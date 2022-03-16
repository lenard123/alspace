import moment from 'moment'
import { Avatar,  Comment, Tooltip} from 'antd'
import { LikeOutlined } from '@ant-design/icons'

export default function()
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
                <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully
                and efficiently.
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    )
}