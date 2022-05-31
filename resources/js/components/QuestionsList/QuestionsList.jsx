import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Collapse, message, Modal, Space } from "antd";
import { useMutation, useQuery } from "react-query";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import LoadingPage from "../LoadingPage";

const apiCall = async () => {
    await requestCookie()
    return await Http.get('/faqs')
}

const deleteApiCall = async (id) => {
    await requestCookie()
    return await Http.delete(`/faqs/${id}`)
}

export default function QuestionsList({ showExtra = false }) {
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

    if (isLoading) return <LoadingPage />

    return (
        <Collapse>
            {data.map(faq => (
                <Collapse.Panel
                    header={faq.question}
                    key={faq.id}
                    extra={showExtra &&
                        <Space>
                            <EditOutlined />
                            <DeleteOutlined onClick={e => showDeleteModal(e, faq.id)} />
                        </Space>
                    }>
                    {faq.answer}
                </Collapse.Panel>
            ))}
        </Collapse>
    )
}