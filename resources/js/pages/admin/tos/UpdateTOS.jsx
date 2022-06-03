import { Button, Form, Input, message, Modal, Space } from "antd";
import { useMutation } from "react-query";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { queryClient } from "@/js/query/ReactQueryProvider";
import { successMessage } from "@/js/utils";

const apiCall = async(tos) => {
    await requestCookie()
    return await Http.put('/tos', { tos })    
}

export default function UpdateTOS({ tos, setTos, initialValues })
{
    const [form] = Form.useForm()

    const { isLoading, mutate } = useMutation(apiCall, {
        onSuccess(data) {
            successMessage('Terms of Services updated successfully')
            queryClient.setQueryData(['tos'], data)
        },
        onError(error) {
            handleError(error)
        }
    })

    const handleSubmit = () => {
        Modal.confirm({
            title: 'Are you sure to update terms of services?',
            onOk() {
                mutate(tos)
            }
        })
    }

    return (
        <Form form={form} layout='vertical' initialValues={initialValues} onFinish={handleSubmit}>
            <Form.Item name='tos'>
                <Input.TextArea disabled={isLoading} onChange={e => setTos(e.target.value)} autoSize={{minRows: 10, maxRows: 14}}></Input.TextArea>
            </Form.Item>
            <Space>
                <Button onClick={() => form.resetFields()} size="large" className="rounded">Reset</Button>
                <Button loading={isLoading} htmlType="submit" type='primary' size="large" className="rounded">Save</Button>
            </Space>
        </Form>
    )
}