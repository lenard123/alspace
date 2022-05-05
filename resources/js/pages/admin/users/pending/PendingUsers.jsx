import usePendingUsersQuery from "@/js/query/queries/usePendingUsersQuery";
import { Breadcrumb, Button, PageHeader, Popconfirm, Space, Table } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import Column from "antd/lib/table/Column";
import ApproveButton from "./components/ApproveButton";

export default function PendingUsers() {

    const { data, isLoading } = usePendingUsersQuery()

    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbItem>Users</BreadcrumbItem>
                        <BreadcrumbItem>Pending</BreadcrumbItem>
                    </Breadcrumb>
                }
                title='Pending Users'
            />

            <Table dataSource={data} className='sm:px-8' rowKey='id' loading={isLoading} scroll={{ x: true }}>
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