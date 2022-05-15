import { BriefcaseOutlined } from "@/js/components/icons"
import { SendOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Tag, Typography } from "antd"
import { Link } from "react-router-dom"

const { Title, Paragraph } = Typography


export default function JobCard({ job }) {

    const { title, created_at, description, user, user_id } = job
    const { fullname } = user

    return (
        <Card className='shadow min-h-[300px]' bodyStyle={{display:'flex', flexDirection: 'column', height:'100%'}}>
                <div className='flex gap-4'>
                    <Avatar icon={<BriefcaseOutlined />} className='flex-shrink-0' size={48} />
                    <div>
                        <Title style={{ marginBottom: '4px' }} level={4}>{title}</Title>
                        <Paragraph className='text-xs' type='secondary'>Posted by: <Link to={`/profile/${user_id}`}>{fullname}</Link> {moment(created_at).fromNow()}</Paragraph>
                    </div>
                </div>
                <Paragraph className='flex-grow'>{ description }</Paragraph>

                <div className='mb-4'>
                    <Tag color='cyan'>Full time</Tag>
                    <Tag color='cyan'>Remote</Tag>
                </div>

                <Link to={`/messages?user_id=${user_id}`}><Button icon={<SendOutlined/>} type='secondary' block shape='round' size='large'>Send Message</Button></Link>
        </Card>
    )
}