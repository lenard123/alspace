import LoadingPage from '@/js/components/LoadingPage'
import useUpdateRequestStatusAction from '@/js/query/actions/useUpdateRequestStatusAction'
import { successMessage } from '@/js/utils'
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { Button, Image, message, Modal, Popconfirm, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'



const apiCall = async (filter) => {
    await requestCookie()
    return await Http.get('/items/requests/all?filter=' + filter)
}

const useHandler = (status, record) => {

    const { mutateAsync } = useUpdateRequestStatusAction(record)

    return async () => {
        await mutateAsync(status)
    }
}

const ProcessButton = ({ record }) => {

    const handler = useHandler('READY', record)

    if (record.status !== 'PENDING') return null

    return (
        <Popconfirm title='Are you sure to process this request?' onConfirm={handler}>
            <Button type='link' className='link'>Process Request</Button>
        </Popconfirm>
    )
}

const CancelButton = ({ record }) => {
    const handler = useHandler('CANCELLED', record)

    if (record.status === 'COMPLETED' || record.status === 'CANCELLED') return null

    return (
        <Popconfirm title='Are you sure to cancel this request?' onConfirm={handler}>
            <Button type='link' className='link'>Cancel Request</Button>
        </Popconfirm>
    )
}

const CompleteButton = ({ record }) => {
    const handler = useHandler('COMPLETED', record)

    if (record.status !== 'READY') return null

    return (
        <Popconfirm title='Are you sure to comple this this request?' onConfirm={handler}>
            <Button type='link' className='link'>Complete Request</Button>
        </Popconfirm>
    )
}

export default function RequestTable({ filter }) {
    const { data, isLoading } = useQuery({
        queryKey: ['items', 'requests', 'all', filter],
        queryFn: () => apiCall(filter),
        onSuccess(data) {
            console.log({ filter, data })
        }
    })

    if (isLoading)
        return <LoadingPage />

    return (
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
            <Column 
                title='Requested by' 
                key='name' 
                render={(record) => (
                    <Link target='_blank' className='link' to={`/profile/${record.user_id}`}>
                        {record.user.fullname}
                    </Link>
                )}
            />
            <Column title='Status' dataIndex='status' key='status' />
            <Column title='Price' dataIndex='price' key='price' />
            <Column title='Quantity' dataIndex='quantity' key='quantity' />
            <Column title='Total' dataIndex='total' key='total' />


            <Column
                title='Action'
                key='action'
                fixed='right'
                render={record => (
                    <Space>
                        <ProcessButton record={record} />
                        <CompleteButton record={record} />
                        <CancelButton record={record} />
                    </Space>
                )}
            />
        </Table>
    )
}