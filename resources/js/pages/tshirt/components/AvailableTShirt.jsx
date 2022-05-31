import { useEffect } from 'react'
import { useQuery } from 'react-query'
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import LoadingPage from '../../alumni/components/LoadingPage'
import { Image, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import DropOption from '@/js/components/DropOption'

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/items/tshirts/available')
}

export default function AvailableTShirt() {
    const { data, isLoading } = useQuery({
        queryKey: ['tshirts', 'available'],
        queryFn: apiCall
    })



    if (isLoading) return <LoadingPage />

    return (
        <>
            <Table
                dataSource={data}
                bordered
                simple
                scroll={{ x: true }}
                pagination={{ hideOnSinglePage: true }}
            >
                <Column
                    title='Image'
                    dataIndex='thumbnail_url'
                    width={90}
                    key='image'
                    render={value => <Image width={90} height={120} src={value} />}
                />
                <Column title='Name' dataIndex='title' key='name' />
                <Column title='Price' dataIndex='price' key='price' />
                <Column
                    title='Action'
                    key='action'
                    fixed='right'
                    render={record => <a className='link' href='#'>Submit Request</a>}
                />
            </Table>
        </>
    )
}