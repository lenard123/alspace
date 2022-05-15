import useJobsQuery from '@/js/query/queries/useJobsQuery'
import { Divider, Typography } from 'antd'
import JobCard from './components/JobCard'
import JobCardSkeleton from './components/JobCardSkeleton'

const { Title } = Typography


export default function JobsPage() {

    const { data, isLoading } = useJobsQuery()

    return (
        <div className='page-wrapper my-8'>
            <Title level={2}>Available Jobs</Title>

            <Divider />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

                {isLoading && (
                    <>
                        <JobCardSkeleton />
                        <JobCardSkeleton />
                        <JobCardSkeleton />
                        <JobCardSkeleton />
                        <JobCardSkeleton />
                    </>
                )}
                {data && data.map(job => <JobCard key={job.id} job={job} />)}
            </div>

        </div>
    )
}