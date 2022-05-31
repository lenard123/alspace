import LoadingPage from "@/js/components/LoadingPage";
import { Breadcrumb, Button, Collapse, message, Modal, PageHeader, Space } from "antd";
import { Link } from "react-router-dom";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { useMutation, useQuery } from "react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/faqs')
}

const deleteApiCall = async (id) => {
    await requestCookie()
    return await Http.delete(`/faqs/${id}`)
}

export default function ManageFAQ() {

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['faqs'],
        queryFn: apiCall
    })

    const { mutateAsync } = useMutation(deleteApiCall, {
        onSuccess() {
            message.success('Entry deleted successfully')
            refetch()
        },
        onError(error) {
            handleError(error)
        }
    })

    const showDeleteModal = (e, id) => {
        e.stopPropagation()
        Modal.confirm({
            title: 'Are you sure to delete this entry?',
            async onOk() {
                await mutateAsync(id)
            }
        })
    }

    return (
        <>
            <PageHeader
                title='Manage Frequently Ask Questions'
                extra={[
                    <Link key='add' to='/admin/settings/faqs/new'>
                        <Button type='primary' shape='round'>Add FAQ</Button>
                    </Link>
                ]}
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/admin/settings/faqs">Manage FAQs</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
            />
            <div className='bg-white p-6 sm:mx-6 mb-8'>
                {isLoading ? <LoadingPage /> : 
                    <Collapse>
                        {data.map(faq => (
                            <Collapse.Panel 
                                header={faq.question} 
                                key={faq.id} 
                                extra={
                                    <Space>
                                        <EditOutlined />
                                        <DeleteOutlined onClick={e => showDeleteModal(e, faq.id)}/>
                                    </Space>
                                }>
                                {faq.answer}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                }
            </div>
        </>
    )
}