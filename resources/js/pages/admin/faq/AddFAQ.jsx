import { Breadcrumb, Button, Form, Input, message, PageHeader } from "antd";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Http, { handleError, requestCookie } from '@/js/utils/Http'

const rules = {
    question: [{required: true, message: 'This field is required.'}],
    answer: [{required: true, message: 'This field is required.'}]
}

const apiCall = async (data) => {
    await requestCookie()
    return await Http.post('/faqs', data)
}

export default function AddFAQ() {

    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(apiCall, {
        onSuccess() {
            navigate('/admin/settings/faqs')
            message.success('New entry added successfully')
        },
        onError: handleError
    })

    const handleSubmit = data => {
        if (isLoading) return;
        mutate(data)
    }    

    return (
        <>
            <PageHeader
                title='Add Frequently Ask Questions'
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/admin/settings/faqs">Manage FAQs</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Add FAQ</Breadcrumb.Item>
                    </Breadcrumb>
                }
            />
            
            <div className='bg-white p-6 sm:mx-6 mb-8 max-w-screen-md'>
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item label='Question' name='question' hasFeedback rules={rules.question}>
                        <Input size='large' className='rounded' />
                    </Form.Item>

                    <Form.Item label='Answer' name='answer' hasFeedback rules={rules.answer}>
                        <Input.TextArea size='large' className='rounded'/>
                    </Form.Item>

                    <Button loading={isLoading} htmlType='submit' className='rounded' type='primary' block size='large'>Submit</Button>
                </Form>
            </div>

        </>
    )
}