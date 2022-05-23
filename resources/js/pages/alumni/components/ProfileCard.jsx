import { FacebookFilled, LinkedinFilled, MessageFilled, TwitterCircleFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Typography } from "antd";

const { Title, Paragraph } = Typography

export default function ProfileCard() {
    return (
        <Card className='shadow-sm' bordered={false}>
            <div className='flex gap-4'>
                <Avatar icon={<UserOutlined />} className='flex-shrink-0' size={48} />
                <div>
                    <Title style={{ marginBottom: '4px' }} level={4}>Lenard Mangay-ayam</Title>
                    <Paragraph className='text-xs' type='secondary'>BSCS Batch 2019</Paragraph>
                </div>
            </div>

            <Paragraph className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid autem, amet reprehenderit odio perferendis dicta illum accusantium veniam sint </Paragraph>

            <div className='flex justify-center gap-2 mt-4'>
                <FacebookFilled size='large' />
                <TwitterCircleFilled />
                <LinkedinFilled />
                <MessageFilled />
            </div>

            <Button className='mt-4' type='secondary' block shape='round' size='large'>View Profile</Button>
        </Card>
    )
}