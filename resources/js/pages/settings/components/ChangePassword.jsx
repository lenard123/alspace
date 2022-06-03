import { Button, Form, Input } from "antd";
import { useMutation } from "react-query";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import { successMessage } from "@/js/utils";

const apiCall = async(data) => {
    await requestCookie()
    return Http.post('/user/password', { ...data, _method: 'PATCH' })
}

export default function ChangePassword() {

    const [form] = Form.useForm()

    const { isLoading, mutate, isError } = useMutation(apiCall, {
        onError: handleError,
        onSuccess() {
            successMessage('Password successfully updated')
            form.resetFields()
        }
    })

    const handleSubmit = (data) => {
        if (isLoading) return;
        mutate(data)
    }

    return (
        <div className="max-w-screen-sm">

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label='Enter New Password' name='new_password'>
                    <Input.Password size="large" />
                </Form.Item>

                <Form.Item label='Re-enter New Password' name='new_password_confirmation'>
                    <Input.Password size="large" />
                </Form.Item>

                <Form.Item label='Enter Old Password' name='password'>
                    <Input.Password size="large" />
                </Form.Item>

                <Button loading={isLoading} htmlType="submit" type='primary' size="large">Save</Button>
            </Form>
        </div>
    )
}