import { Spin } from "antd";

export default function PageLoading() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <Spin />
            <span className='text-md'>Display tagline</span>
        </div>
    )
}