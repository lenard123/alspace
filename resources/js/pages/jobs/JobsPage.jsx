import useJobsQuery from '@/js/query/queries/useJobsQuery'
import { EditOutlined } from '@ant-design/icons'
import { Button, PageHeader, Typography } from 'antd'
import JobList from './components/JobList'
import PostJobModal from './components/PostJobModal'
import { useState } from 'react'

const { Title } = Typography


export default function JobsPage() {
    const [isOpen, setIsOpen] = useState(false)
    const { data, isLoading } = useJobsQuery()

    return (
        <div className='page-wrapper'>
            <PageHeader 
                title={<Title className='mx-4 sm:mx-0' level={2}>Available Jobs</Title>}
                extra={[
                    <Button key='create' onClick={() => setIsOpen(true)} type='text' shape='circle' icon={<EditOutlined />} />
                ]}
            />
            

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <JobList loading={isLoading} jobs={data}/>
            </div>

            <PostJobModal isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}