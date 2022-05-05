import useAlumniQuery from "@/js/query/queries/useAlumniQuery";
import { toAntdPagination } from "@/js/utils";
import { Avatar, Breadcrumb, PageHeader, Table } from "antd";
import Column from "antd/lib/table/Column";
import { useState } from 'react'
import { Link } from "react-router-dom";


export default function AlumniPage() {

    const [page, setPage] = useState(1)
    const { data, isFetching} = useAlumniQuery(page)

    const handleTableChange = (data) => {
        setPage(data.current)
    }

    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        <Breadcrumb.Item>Alumni</Breadcrumb.Item>
                    </Breadcrumb>
                }
                title='Manage Alumni'
            />

            <Table
                dataSource={data?.data || []}
                className='sm:px-8' 
                scroll={{ x: true }}
                loading={isFetching}
                rowKey='id' 
                pagination={toAntdPagination(data)}
                onChange={handleTableChange}
                bordered
                >
                <Column 
                    dataIndex='avatarUrl' 
                    key='id'
                    width={32}
                    render={(value) => <Avatar src={value} />}
                />
                <Column title='Student ID' dataIndex={['alumnus', 'student_id']} key='student_id'/>
                <Column className='whitespace-nowrap' title='Name' dataIndex='fullname' key='fullname' />
                <Column title='Email' dataIndex='email' key='email' />
                <Column title='Course' dataIndex={['alumnus', 'course']} key='course' />
                <Column title='Batch' dataIndex={['alumnus', 'year_graduated']} key='year_graduated' />

                <Column 
                    title='Action' 
                    dataIndex={'id'}
                    render={value => (
                        <Link target='_blank' className='link' to={`/users/${value}`} >View Profile</Link>
                    )}
                /> 
            </Table>

        </>
    )
}