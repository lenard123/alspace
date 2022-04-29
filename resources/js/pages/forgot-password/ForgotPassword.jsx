import { AuthApi } from '@/js/apis'
import { MailOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, Result } from 'antd'
import Helmet from 'react-helmet'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const rules = [
    {required: true, message: 'Please enter your email.'},
    {type: 'email', message: 'Please enter a valid email.'},
]

export default function ForgotPassword() {

    const [validationErrors, setValidationErrors] = useState({})
    const { mutate, isLoading, isSuccess, data } = useMutation(AuthApi.forgotPassword, {
        onMutate() { setValidationErrors({}) },
        onError(error) {
            setValidationErrors(error.validationErrors)
        }
    });

    const handleSubmit = ({ email }) => {
        if(isLoading) return;
        mutate(email)
    }

    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <div className='bg-gray-200 min-h-screen flex flex-col justify-center'>
                {isSuccess
                    ? <Result
                        status='success'
                        title='Success'
                        subTitle={data}
                        extra={[
                            <Link to='/login' key='login'><Button type='primary'>Go to Login</Button></Link>
                        ]}
                    />

                    :
                        <Card title={<div className='text-xl font-semibold text-center font-mono'>Forgot Your Password?</div>} className='w-[360px] mx-auto rounded'>
                            <div className='text-center font-mono'>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</div>

                            <Form layout='vertical' onFinish={handleSubmit}>
                                <Form.Item {...validationErrors.email} rules={rules} hasFeedback name='email' className='mb-4' label={<span className='font-semibold'>Email</span>}>
                                    <Input 
                                        type='email' 
                                        prefix={<MailOutlined className='mr-2' />}
                                        placeholder='Enter your email here'
                                        size='large'
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button loading={isLoading} shape='round' size='large' block type='primary' htmlType='submit'>
                                        Reset Password
                                    </Button>
                                    <p className='mt-2 text-center font-mono'>
                                        <Link className='link block' to='/register'>Create an Account!</Link>
                                        <Link className='link block' to='/login'>Already have an account? Login!</Link>
                                    </p>
                                </Form.Item>
                            </Form>

                        </Card>
                }
            </div>
        </>
    )
}