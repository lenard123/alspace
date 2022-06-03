import LoadingPage from "@/js/components/LoadingPage";
import Http, { requestCookie } from '@/js/utils/Http'
import { Button, Image, Popconfirm, Table } from "antd";
import Column from "antd/lib/table/Column";
import { useQuery } from "react-query";
import Helmet from 'react-helmet'
import useUpdateRequestStatusAction from "@/js/query/actions/useUpdateRequestStatusAction";


const apiCall = async () => {
    await requestCookie()
    return await Http.get('/items/requests')
}

const CancelButton = ({ record }) => {
    const { mutateAsync } = useUpdateRequestStatusAction(record)
    const handler = async() => {
        await mutateAsync('CANCELLED')
    }

    if (record.status === 'COMPLETED' || record.status === 'CANCELLED') return null

    return (
        <Popconfirm title='Are you sure to cancel this request?' onConfirm={handler}>
            <Button type='link' className='link'>Cancel Request</Button>
        </Popconfirm>
    )
}

export default function RequestsStatus()
{
    const { data, isLoading } = useQuery({
        queryKey: ['items', 'requests'],
        queryFn: apiCall
    })

    if (isLoading)
        return <LoadingPage />


    return (
        <>
            <Helmet>
                <title>Request Status</title>
            </Helmet>
            <Table
                dataSource={data}
                bordered
                simple
                scroll={{ x: true }}
                pagination={{ hideOnSinglePage: true }}
                rowKey='id'
            >
                <Column
                    title='Image'
                    dataIndex={['tshirt', 'thumbnail_url']}
                    width={90}
                    key='image'
                    render={value => <Image width={90} height={120} src={value} />}
                />
                <Column title='Name' dataIndex={['tshirt', 'title']} key='name' />
                <Column title='Status' dataIndex='status' key='status' />
                <Column title='Price' dataIndex='price' key='price' />
                <Column title='Quantity' dataIndex='quantity' key='quantity' />
                <Column title='Total' dataIndex='total' key='total' />

                <Column
                    title='Action'
                    key='action'
                    fixed='right'
                    render={record => <CancelButton record={record} />}
                />
            </Table>
        </>
    )
}
