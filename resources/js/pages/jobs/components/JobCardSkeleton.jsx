import { Card, Skeleton } from "antd";


export default function JobCardSkeleton()
{
    return (
        <Card className='shadow'>
            <div className='flex gap-4'>
                <Skeleton.Avatar size={48} active/>
                <Skeleton.Input size='small' active/>
            </div>

            <Skeleton className="mb-4" loading active />

            <Skeleton.Button block active />
        </Card>
    )
}