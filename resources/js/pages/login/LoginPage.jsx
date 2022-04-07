import { Card, Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '@/js/components/Logo'
import rules from './validationRules'
import useLogin from './useLogin'

export default function LoginPage() {

    const { validationErrors, handleSubmit, isLoading } = useLogin()

    return (
        <div className='bg-blue-700 min-h-screen flex flex-col justify-center'>
            <div className="py-8">
                <Card title={<Logo />} className='max-w-md mx-auto rounded'>

                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item
                            rules={rules.email}
                            className='mb-4'
                            label='Email'
                            name='email'
                            {...(validationErrors.email)}
                        >
                            <Input
                                type='email'
                                prefix={<MailOutlined className='mr-2' />}
                                placeholder='Enter your email here'
                                size='large'
                                className='rounded'
                            />
                        </Form.Item>

                        <Form.Item
                            rules={rules.password}
                            className='mb-4'
                            label='Password'
                            name='password'
                            {...(validationErrors.password)}
                        >
                            <Input.Password
                                prefix={<LockOutlined className='mr-2' />}
                                className='rounded'
                                placeholder="Enter your password here."
                                size='large'
                            />
                        </Form.Item>

                        <Form.Item className='mt-4'>
                            <Checkbox>Remember me</Checkbox>

                            <a className='float-right' href='#'>Forgot Password</a>
                        </Form.Item>

                        <Form.Item>
                            <Button size='large' loading={isLoading} className='w-full' type='primary' htmlType='submit'>
                                Sign in
                            </Button>
                            <p className='mt-2 text-center'>
                                <span>Don't have an account? Sign up </span>
                                <Link className='link' to='/register'>here</Link>.
                            </p>
                        </Form.Item>


                    </Form>
                </Card>
            </div>
        </div>
    )
}