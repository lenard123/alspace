import { Avatar, Breadcrumb, Descriptions, List, PageHeader, Table, Tag } from "antd"
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem"
import { Link, useSearchParams } from "react-router-dom"
import EventList from "../../events/components/EventList"
import { useMemo } from 'react'
import useEventsQuery, { filters } from "@/js/query/queries/useEventsQuery"
import { toAntdPagination } from "@/js/utils"
import Column from "antd/lib/table/Column"
import moment from "moment"
import { EnvironmentOutlined, LaptopOutlined } from "@ant-design/icons"

const title = {
    'active': 'Upcoming Events',
    'cancelled': 'Cancelled Events',
    'past': 'Past Events',
    'pending': 'Pending Events',
}

export const useFilter = () => {
    const [searchParams] = useSearchParams()
    const filter = useMemo(() => {
        const filter = searchParams.get('filter')
        if (Object.keys(title).includes(filter)) {
            return filter
        }
        return 'active'
    }, [searchParams.get('filter')])
    return { filter, title: title[filter] }
}

export default function EventsPage() {
    const { filter, title } = useFilter()
    const { data, isFetching } = useEventsQuery(filter)

    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbItem>Events</BreadcrumbItem>
                        <BreadcrumbItem className='capitalize'>{filter}</BreadcrumbItem>
                    </Breadcrumb>
                }
                title={title}
            />

            <div className='bg-white p-6 sm:mx-6'>
            <Table 
                    dataSource={data?.data} 
                    pagination={toAntdPagination(data)} 
                    rowKey='id' 
                    loading={isFetching} 
                    scroll={{ x: true }}
                    // onChange={handleTableChange}
                    bordered
                    simple
                    expandable={{
                        expandedRowRender: (record) => record.description
                    }}
                    >
                    <Column 
                        title='Title' 
                        dataIndex='title' 
                        render={(title, record) => (
                            <Link className='link' to={`/events/${record.id}`} target='_blank'>{title}</Link>
                        )}
                    />
                    <Column title='Posted By' dataIndex={['user', 'fullname']} />
                    <Column title='Date' dataIndex='start_at' render={start_at => start_at.format('MMMM DD, yyyy')} />
                    <Column 
                        title='Type' 
                        dataIndex='is_online'
                        render={isOnline => (
                            isOnline
                                ?<Tag icon={<LaptopOutlined />} color='processing'>Online</Tag>
                                :<Tag icon={<EnvironmentOutlined />} color='warning'>On Site</Tag>
                        )}
                    />
                </Table>               
            </div>
        </>
    )
}