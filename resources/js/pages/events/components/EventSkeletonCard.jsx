import { Skeleton } from 'antd'

export default function EventSkeletonCard() {
    return (
        <div className='border flex flex-col border-gray-200 rounded-lg overflow-hidden w-full'>
            <Skeleton.Image
                style={{ height: '10rem', width: '100%' }}
                className='border-b border-gray-200'
            />
            <div className='p-4'>
                <Skeleton loading active />
                <Skeleton.Button block active />
            </div>
        </div>
    )
}