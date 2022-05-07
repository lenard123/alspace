import { CalendarTwoTone, IdcardOutlined, IdcardTwoTone, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, PageHeader, Statistic } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

export default function Dashboard() {
    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbItem>Dashboard</BreadcrumbItem>
                    </Breadcrumb>
                }
            />

            <div className='mx-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <Card>
                        <Statistic
                            title='Pending Registration'
                            value={100}
                            prefix={<UserOutlined className='text-green-500' />}
                        />
                    </Card>

                    <Card>
                        <Statistic
                            title='Upcoming Events'
                            value={100}
                            prefix={<CalendarTwoTone />}
                        />
                    </Card>

                    <Card>
                        <Statistic
                            title='Item Requests'
                            value={100}
                            prefix={<IdcardOutlined className='text-pink-500' />}
                        />
                    </Card>

                    <Card>
                        <Statistic
                            title='Unread Messages'
                            value={100}
                            prefix={<MessageOutlined className='text-orange-500' />}
                        />
                    </Card>
                </div>
            </div>
        </>
    )
}