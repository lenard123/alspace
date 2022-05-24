import { FacebookFilled, LinkedinFilled, MessageFilled, TwitterCircleFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography

export default function ProfileCard({id, avatarUrl, fullname, alumnus, info}) {

    const { year_graduated, course } = alumnus
    const { bio } = info
    // console.log(props)

    return (
        <Card className='shadow-sm' bodyStyle={{ height: '100%' }} bordered={false}>
            <div className='flex flex-col h-full '>
                <div className='flex gap-4'>
                    <Avatar src={avatarUrl} icon={<UserOutlined />} className='flex-shrink-0' size={48} />
                    <div>
                        <Title style={{ marginBottom: '4px' }} level={4}>{ fullname }</Title>
                        <Paragraph className='text-xs' type='secondary'>{ course.toUpperCase() } Batch { year_graduated }</Paragraph>
                    </div>
                </div>

                <Paragraph className='mt-4 flex-grow' italic={!bio} type={bio ? '':'secondary'}>
                    {bio || 'No description set'}
                </Paragraph>

                <div className='flex justify-center gap-2 mt-4'>
                    <Link to='#'>
                        <FacebookFilled />
                    </Link>

                    <Link to='#'>
                        <TwitterCircleFilled />
                    </Link>

                    <Link to='#'>
                        <LinkedinFilled />
                    </Link>

                    <Link to={`/messages?user_id=${id}`}>
                        <MessageFilled />
                    </Link>
                </div>

                <Link to={`/profile/${id}`}>
                    <Button className='mt-4' type='secondary' block shape='round' size='large'>View Profile</Button>
                </Link>
            </div>
        </Card>
    )
}