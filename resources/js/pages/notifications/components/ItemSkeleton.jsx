import { UserOutlined } from "@ant-design/icons";
import { Avatar, Skeleton } from "antd";


export default function ItemSkeleton()
{
    return (
        <div className='flex gap-3 w-full mx-6'>
            <Avatar size='large' icon={<UserOutlined />} />
            <div className="flex flex-col leading-3">
                <span className="text-gray-700 mt-2">
                    <Skeleton.Input size="small" active/>
                </span>
            </div>
        </div>
    )
}