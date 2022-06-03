import { Breadcrumb, Button, Image, PageHeader, Table, Tag } from "antd";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import DropOption from "@/js/components/DropOption";
import Helmet from 'react-helmet'


const { Column } = Table

export default function ManageTshirtPage() {

    const { data, isLoading } = useQuery({
        queryKey: ['tshirts'],
        queryFn: async() => {
            await requestCookie()
            return await Http.get('/items/tshirts')
        }
    })

    return (
        <>
            <Helmet>
                <title>Manage Items</title>
            </Helmet>
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
                    dataSource={isLoading ? [] : data}
                    bordered
                    simple
                    scroll={{ x: true }}
                    loading={isLoading}
                    pagination={{hideOnSinglePage: true}}
                    rowKey='id'
                    >
                    <Column 
                        title='Image' 
                        dataIndex='thumbnail_url'
                        width={90}
                        key='image'
                        render={value => <Image width={90} height={120} src={value} />}
                    />
                    <Column title='Name' dataIndex='title' key='name'/>
                    <Column title='Price' dataIndex='price' key='price'/>
                    <Column 
                        title='Availability'
                        dataIndex='availability'
                        key='availability'
                        render={value => {
                            if (value === 'AVAILABLE') return <Tag color='green'>Available</Tag>
                            return <Tag>Not Available</Tag>
                        }}
                    />
                    <Column 
                        title='Action' 
                        key='action'
                        fixed='right'
                        render={record => (
                            <DropOption menuOptions={[
                                {key: 'edit', label: 'Edit'},
                                {key: 'toggle', label: 'Toggle Availability'},
                            ]}/>
                        )}
                    />
                </Table>
            </div>
        </>
    )
}