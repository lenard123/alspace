import { AuthApi } from "@/js/apis"
import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { useMutation, useQueryClient } from "react-query"
import rules from "./rules"
import { useState } from 'react'
import { Link } from "react-router-dom"
import Helmet from 'react-helmet'

export default function Login()
{
    const [validationErrors, setValidationErrors] = useState({})
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(AuthApi.adminLogin, {
        onSuccess(data) {
            queryClient.setQueryData(['users', 'current'], data)
        },
        onError(error) {
            setValidationErrors(error.validationErrors)
        }
    })

    const handleSubmit = (data) => {
        if (isLoading) return;
        setValidationErrors({})
        mutate(data)
    }

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col justify-center'>
            <Helmet>
                <title>Admin Login</title>
            </Helmet>
            <div className='bg-white min-h-[320px] w-[320px] mx-auto shadow-lg p-8'>
                <Link to='/' className='flex justify-center items-center mb-8'>
                    <img className='rounded mr-2' src='/images/logo.png' width={40}/>
                    <span 
                        className='text-base uppercase inline-block font-bold text-transparent '
                        style={{
                            backgroundImage: '-webkit-gradient(linear,37.219838% 34.532506%,36.425669% 93.178216%,from(#29cdff),to(#0a60ff),color-stop(.37,#148eff))',
                            backgroundClip: 'text',
                            textFillColor: 'transparent'
                        }}
                    >Alspace Admin</span>
                </Link>

                <Form onFinish={handleSubmit}>
                    <Form.Item {...validationErrors.email} name='email' rules={rules.email} className="mb-4" hasFeedback>
                        <Input prefix={<MailOutlined className='mr-2' />} placeholder='Email'/>
                    </Form.Item>
                    <Form.Item {...validationErrors.password} name='password' rules={rules.password} className="mb-4" hasFeedback>
                        <Input.Password prefix={<LockOutlined className='mr-2' />} placeholder='Password'/>
                    </Form.Item>
                    <Button loading={isLoading} htmlType='submit' type='primary' block>Sign in</Button>
                    <Link to='/forgot-password' className='text-center text-gray-500 block mt-4'>Forgot Password</Link>
                </Form>

            </div>

        </div>
    )
}