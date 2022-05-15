import { BriefcaseOutlined } from '@/js/components/icons'
import { SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Divider, Tag, Typography } from 'antd'

const { Title, Text, Paragraph } = Typography

const JobCard = () => {
    return (
        <Card>
            <div className='flex gap-4'>
                <Avatar icon={<BriefcaseOutlined />} className='flex-shrink-0' size={48} />
                <div className='mt-1'>
                    <Title style={{ lineHeight: '1rem', marginBottom: '4px' }} level={4}>UI/UX Designer</Title>
                    <Paragraph className='text-xs' style={{ lineHeight: '1rem' }} type='secondary'>Posted by: 2 minutes ago by Lenard Mangay-ayam</Paragraph>
                </div>
            </div>
            <Paragraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda deleniti asperiores aliquid ratione, optio minus non quaerat distinctio vitae aspernatur vero sit adipisci iusto totam doloremque quas illum repudiandae dicta!</Paragraph>

            <div className='mb-4'>
                <Tag color='cyan'>Full time</Tag>
                <Tag color='cyan'>Remote</Tag>
            </div>

            <Button icon={<SendOutlined/>} type='secondary' block shape='round' >Send Message</Button>

        </Card>
    )
}

export default function JobsPage() {
    return (
        <div className='page-wrapper my-8'>
            <Title level={2}>Available Jobs</Title>

            <Divider />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />

            </div>

        </div>
    )
}