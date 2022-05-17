import { Empty } from "antd";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";


export default function JobList({ jobs, loading }) {
    if (loading) {
        return (
            <>
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
            </>
        )
    }

    if (jobs.length <= 0) {
        return <Empty className='col-span-3' />
    }

    return jobs.map(job => <JobCard job={job} key={job.id} />)
}