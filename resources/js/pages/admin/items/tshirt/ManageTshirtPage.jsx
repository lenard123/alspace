import { Breadcrumb, Button, PageHeader, Table } from "antd";
import { Link } from "react-router-dom";

const { Column } = Table

export default function ManageTshirtPage() {
    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>Items</Breadcrumb.Item>
                        <Breadcrumb.Item>Alumni T-Shirt</Breadcrumb.Item>
                    </Breadcrumb>
                }
                title='Manage Alumni T-Shirt'
                extra={[
                    <Link key='add' to='/admin/items/tshirt/new'>
                        <Button type='primary' shape='round'>Add Item</Button>
                    </Link>
                ]}
            />

            <div className='bg-white p-6 sm:mx-6'>
                <Table
                    dataSource={[]}
                    bordered
                    simple
                    >
                    <Column title='Image'/>
                    <Column title='Name' />
                    <Column title='Price' />
                    <Column title='Availability' />
                    <Column title='Action' />
                </Table>
            </div>
        </>
    )
}