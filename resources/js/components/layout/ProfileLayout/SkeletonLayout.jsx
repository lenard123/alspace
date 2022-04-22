import { Skeleton } from "antd";
import Helmet from 'react-helmet'


export default function SkeletonLayout() {
    return (
        <>

            <Helmet>
                <title>User Profile</title>
            </Helmet>


            <Skeleton.Input active className='block bg-gray-200' style={{ width: '100%', height: 'min(300px, 60vw)' }} />

            <div className='page-wrapper'>
                <div className='-mt-[60px]'>
                    <div className='flex flex-col items-center sm:flex-row sm:items-end gap-2'>
                        <div className='h-[120px] w-[120px] rounded-full bg-gray-200 border-2 border-white' />
                        <div className='sm:pb-2 flex flex-col sm:flex-row justify-between flex-grow gap-2'>
                            <div className='text-xl md:text-2xl text-center font-bold text-gray-800'>
                                <span className='bg-gray-200 text-gray-200'>Juan Dela Cruz </span>
                            </div>
                            <div className='flex sm:self-end justify-center'>
                                <Skeleton.Button size='large' shape='round'/>
                            </div>
                        </div>
                    </div>
                </div>

                <Skeleton className='mt-4' loading active/>

            </div>


        </>
    )
}