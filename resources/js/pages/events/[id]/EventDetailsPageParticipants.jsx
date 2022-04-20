import { Card, Empty } from "antd";


export default function EventDetailsPageParticipants({ type })
{
    return (
        <div className='page-wrapper my-6'>
            <Card className='max-w-2xl' title={<span className='text-lg font-bold capitalize'>{type}</span>}>
                <Empty />
            </Card>
        </div>
    )
}