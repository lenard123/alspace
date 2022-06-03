import usePendingUsersQuery from "@/js/query/queries/usePendingUsersQuery";
import { toAntdPagination } from "@/js/utils";
import { Breadcrumb, PageHeader,  Table } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import { useState } from 'react'
import DropOption from "@/js/components/DropOption";
import usePendingUserAction from "./usePendingUserAction";
import Helmet from 'react-helmet'

export default function PendingUsers() {

    const [page, setPage] = useState(1)
    const { data, isFetching } = usePendingUsersQuery(page)
    const { approveAlumni, rejectAlumni } = usePendingUserAction()

    const handleTableChange = (data) => {
        setPage(data.current)
    }

    const handleMenuClick = ({ key }, record) => {
        switch (key) {
            case 'approve':
                approveAlumni(record.id)
                break;
            case 'reject': 
                rejectAlumni(record.id)
                break;
        }
    }

    return (
        <>
            <Helmet>
                <title>Pending Registration</title>
            </Helmet>
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

            <div className='bg-white p-6 sm:mx-6'>
                <Table 
                    dataSource={data?.data || []} 
                    pagination={toAntdPagination(data)} 
                    rowKey='id' 
                    loading={isFetching} 
                    scroll={{ x: true }}
                    onChange={handleTableChange}
                    bordered
                    simple
                    >
                    <Column title='Student ID' dataIndex='student_id' key='student_id' />
                    <Column className='whitespace-nowrap' title='Name' dataIndex='fullname' key='fullname' />
                    <Column title='Email' dataIndex='email' key='email' />
                    <Column title='Course' dataIndex='course' key='course' />
                    <Column title='Batch' dataIndex='year_graduated' key='year_graduated' />
                    <Column
                        title='Action'
                        key='action'
                        fixed='right'
                        render={record => (
                            <DropOption onMenuClick={e => handleMenuClick(e, record)} menuOptions={[
                                {key: 'approve', label: 'Approve'},
                                {key: 'reject', label: 'Reject', danger: true}
                            ]}/>
                        )}
                    />
                </Table>
            </div>

        </>
    )
}