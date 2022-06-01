import { Button, Card, DatePicker, Form, Input, message, Select, Typography } from "antd";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import queryKeyFactory from "@/js/query/queryKeyFactory";

const apiCall = async (data) => {
    await requestCookie()
    return await Http.post('/user/info', {...data, '_method': 'PATCH'})
}

export default function UpdateInfo({ initialValues}) {

    const navigate = useNavigate()
    const { id } = useCurrentUser()
    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation(apiCall, {
        onSuccess: (data) => {
            message.success('Info updated successfully')
            queryClient.invalidateQueries(queryKeyFactory.user(id))
            navigate(`/profile/${id}/about`)
        },
        onError: handleError
    })

    const handleSubmit = (data) => {
        if (isLoading) return;
        mutate(data)
    }

    return (
        <Card
            className='mt-3 shadow-lg'
            title={null}
        >
            <Typography.Title level={3}>Update Details</Typography.Title>

            <Form layout="vertical" initialValues={initialValues} onFinish={handleSubmit}>

                <Form.Item label='Gender' name='gender'>
                    <Select size='large'>
                        <Select.Option value='Male'>Male</Select.Option>
                        <Select.Option value='Female'>Female</Select.Option>
                        <Select.Option value={null}>Prefer not to say</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Birthday' name='birthday'>
                    <DatePicker className='w-full' size='large' />
                </Form.Item>

                <Form.Item label='Bio' name='bio'>
                    <Input.TextArea />
                </Form.Item>

                <div className='mt-4 flex justify-end'>
                    <Button loading={isLoading} className='rounded' htmlType='submit' size='large' type='primary'>Save</Button>
                </div>

            </Form>

        </Card>
    )
}