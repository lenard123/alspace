import LoadingPage from "@/js/components/LoadingPage";
import Http, { requestCookie } from '@/js/utils/Http'
import { Image, Table } from "antd";
import Column from "antd/lib/table/Column";
import { useQuery } from "react-query";

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/items/requests')
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
                <Column title='Price' dataIndex='price' key='price' />
                <Column title='Status' dataIndex='status' key='status' />
                <Column title='Total' dataIndex='total' key='total' />

                <Column
                    title='Action'
                    key='action'
                    fixed='right'
                    render={record => <a className='link' href='#'>Cancel Request</a>}
                />
            </Table>
        </>
    )
}
