import { AuthApi } from "@/js/apis";
import Logo from "@/js/components/Logo";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import Helmet from 'react-helmet'
import { useMutation } from "react-query";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from 'react'
import { successMessage } from "@/js/utils";

const rules = {
    password: [
        { required: true, message: 'Password is required.' },
        { min: 8, message: 'Password must be atleast 8 characters.'},
        { pattern: /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{0,}$/, message: 'Password must contain letter and a number.' } //Must have letter and number
    ],

    password_confirmation: [
        { required: true, message: 'Please confirm your password.' },
        ({ getFieldValue  }) => ({
            validator: async(_, value) => {
                if (!value || getFieldValue('password') === value) {
                    return
                }
                throw new Error('The two password you entered does not match')
            }
        })
    ]
}

export default function ResetPassword() {

    const [validationErrors, setValidationErrors] = useState({})
    const [params] = useSearchParams()
    const { token } = useParams()
    const email = params.get('email')
    const navigate = useNavigate()
    const { mutate, isLoading } = useMutation(AuthApi.resetPassword, {
        onMutate() { setValidationErrors({}) },
        onSuccess(data) {
            successMessage(data)
            navigate('/login')
        },
        onError(error) {
            setValidationErrors(error.validationErrors)
        }
    })

    const handleSubmit = (formData) => {
        if (isLoading) return;
        mutate({
            ...formData,
            email,
            token
        })
    }

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <div className='bg-gray-100 min-h-screen flex flex-col items-center justify-center gap-4'>
                <Link to='/'><Logo /></Link>
                <Card
                    title={<div className='font-semibold'>Reset Password</div>}
                    className='w-[360px] rounded'
                >
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item {...validationErrors.email} initialValue={email} className='mb-4' name='email' label='Email' hasFeedback>
                            <Input
                                disabled
                                type='email'
                                prefix={<MailOutlined className='mr-2' />}
                                size='large'
                                className='rounded'
                            />
                        </Form.Item>

                        <Form.Item {...validationErrors.password} rules={rules.password} className='mb-4' name='password' label='New Password' hasFeedback>
                            <Input.Password
                                prefix={<LockOutlined className='mr-2' />}
                                size='large'
                                className='rounded'
                                placeholder='Enter your new password here.'
                            />
                        </Form.Item>

                        <Form.Item rules={rules.password_confirmation} className='mb-4' name='password_confirmation' label='Confirm New Password' hasFeedback>
                            <Input.Password
                                prefix={<LockOutlined className='mr-2' />}
                                size='large'
                                className='rounded'
                                placeholder='Re-Enter your new password here.'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit' type='primary' block size='large'>Submit</Button>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        </>
    )
}