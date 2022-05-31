import { Avatar, Breadcrumb, Button, Card, PageHeader, Table } from "antd";
import Column from "antd/lib/table/Column";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Http, { handleError, requestCookie } from '@/js/utils/Http'

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/users/moderators')
}

export default function ManageModerator() {

    const { data, isFetching } = useQuery({
        queryKey: ['users', 'moderators'],
        queryFn: apiCall
    })

    return (
        <>
            <PageHeader
                title='Manage Moderators'
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        <Breadcrumb.Item>Moderators</Breadcrumb.Item>
                    </Breadcrumb>
                }
                extra={[
                    <Link key='add' to='/admin/users/moderator/new'>
                        <Button type='primary' shape='round'>Add Moderator</Button>
                    </Link>
                ]}
            />

            <div className='bg-white p-6 sm:mx-6'>
                <Table
                    dataSource={data || []}
                    scroll={{ x: true }}
                    loading={isFetching}
                    rowKey='id'
                    bordered
                    pagination={{hideOnSinglePage: true}}
                >
                    <Column
                        dataIndex='avatarUrl'
                        key='id'
                        width={32}
                        render={(value) => <Avatar src={value} />}
                        fixed='left'
                    />
                    <Column
                        className='whitespace-nowrap'
                        title='Name'
                        dataIndex='fullname'
                        key='fullname'
                        render={(fullname, record) => (
                            <Link target='_blank' className='link' to={`/profile/${record.id}`}>
                                {fullname}
                            </Link>
                        )}
                    />
                    <Column title='Email' dataIndex='email' key='email' />
                </Table>
            </div>
        </>
    )
}