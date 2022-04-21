import { EnvironmentOutlined, FileWordOutlined, LaptopOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Divider } from "antd";

export default function EventDetailsPageAbout({ event }) {

    const { interested_count, user, is_online, location } = event

    return (
        <div className='page-wrapper my-6 '>
            <Card className='max-w-2xl' title={<span className='text-lg font-bold'>Details</span>}>
                <div className='flex flex-col gap-2'>

                    {Boolean(interested_count) &&
                        <div className='flex items-center gap-2'>
                            <UsergroupAddOutlined />
                            <span>{interested_count} people are interested</span>
                        </div>
                    }

                    <div className='flex items-center gap-2'>
                        <UserOutlined />
                        <span>Hosted by: {user.fullname}</span>
                    </div>

                    {Boolean(is_online) 
                        ?
                            <div className='flex items-center gap-2'>
                                <LaptopOutlined />
                                <span>Online</span>
                            </div>
                        :
                            <div className='flex items-center gap-2'>
                                <EnvironmentOutlined />
                                <span>{location}</span>
                            </div>
                    }

                </div>

                <Divider />

                <p>
                    {event.description}
                </p>

            </Card>
        </div>
    )
}