import usePendingUsersQuery from "@/js/query/queries/usePendingUsersQuery";
import { toAntdPagination } from "@/js/utils";
import { Breadcrumb, Button, PageHeader, Popconfirm, Space, Table } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import ApproveButton from "./components/ApproveButton";
import { useState } from 'react'

export default function PendingUsers() {

    const [page, setPage] = useState(1)
    const { data, isFetching } = usePendingUsersQuery(page)
    const pagination = toAntdPagination(data)

    const handleTableChange = (data) => {
        setPage(data.current)
    }

    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbItem>Users</BreadcrumbItem>
                        <BreadcrumbItem><Link to='/admin/users/alumni'>Alumni</Link></BreadcrumbItem>
                        <BreadcrumbItem>Pending</BreadcrumbItem>
                    </Breadcrumb>
                }
                title='Pending Users'
            />

            <Table 
                dataSource={data?.data || []} 
                pagination={pagination} 
                className='sm:px-8' 
                rowKey='id' 
                loading={isFetching} 
                scroll={{ x: true }}
                onChange={handleTableChange}
                bordered
                >
                <Column title='Student ID' dataIndex='student_id' key='student_id' />
                <Column className='whitespace-nowrap' title='Name' dataIndex='fullname' key='fullname' />
                <Column title='Email' dataIndex='email' key='email' />
                <Column title='Course' dataIndex='course' key='course' />
                <Column title='Batch' dataIndex='year_graduated' key='year_graduated' />
                <Column 
                    title='Action' 
                    key='action'
                    render={(text, record) => (
                        <Space size="middle" key='test'>
                            <Button danger>Deny</Button>
                            <ApproveButton id={record.id} />
                        </Space>
                    )}
                />
            </Table>

        </>
    )
}