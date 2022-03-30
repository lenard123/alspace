import { Skeleton } from "antd";

export default function PostSkeleton(){
    return (
        <div className='p-4 flex flex-col'>
            
            <div className='flex gap-2 items-center'>
                <Skeleton.Avatar active size='large'/>
                <div className='h-full flex flex-col justify-evenly'>
                    <Skeleton.Input size={16} active/>
                    <Skeleton.Input width={50} size={14} active/>
                </div>
            </div>

            <Skeleton loading={true} avatar active/>

        </div>
    )
}