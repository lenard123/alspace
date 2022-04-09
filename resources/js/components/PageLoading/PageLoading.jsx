import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function PageLoading() {
    return (
        <div className='h-screen flex flex-col gap-4 justify-center items-center'>
            <Spin indicator={<LoadingOutlined />} />
            <span className='text-md'>A Great Place to Start.</span>
        </div>
    )
}