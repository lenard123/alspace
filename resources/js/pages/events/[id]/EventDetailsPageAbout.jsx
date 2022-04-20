import { FileWordOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Divider } from "antd";

export default function EventDetailsPageAbout() {
    return (
        <div className='page-wrapper my-6 '>
            <Card className='max-w-2xl' title={<span className='text-lg font-bold'>Details</span>}>
                <div className='flex flex-col gap-2'>

                    <div className='flex items-center gap-2'>
                        <UsergroupAddOutlined />
                        <span>27 people are interested</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <UserOutlined />
                        <span>Hosted by: Lenard Mangay-ayam</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <FileWordOutlined />
                        <span>Online</span>
                    </div>

                </div>

                <Divider />

                <p>
                    Lorem ipsum dolor sit amet
                </p>

            </Card>
        </div>
    )
}