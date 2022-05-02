import { Form, Input, Button, Checkbox } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '@/js/components/Logo'
import rules from './validationRules'
import useLogin from './useLogin'
import { Helmet } from 'react-helmet'

export default function LoginPage() {

    const { validationErrors, handleSubmit, isLoading, remember, setRemember } = useLogin()

    return (
        <div className='bg-gray-200 min-h-screen py-8 flex items-center'>
            <Helmet>
                <title>Login to your Alspace Account</title>
            </Helmet>
            <div className='flex-grow max-w-4xl min-h-[500px] mx-auto rounded grid grid-cols-1 lg:grid-cols-2'>
                <div className='w-full max-w-[360px] sm:max-w-none sm:w-auto bg-white p-4 flex flex-col mx-auto lg:mx-0'>
                    <Link to='/'><Logo small/></Link>

                    <div className='w-full sm:w-[360px] flex-grow mx-auto flex flex-col justify-center pt-12'>

                        <div className='font-bold text-2xl mb-4'>Login to your account</div>

                        <Form layout='vertical' onFinish={handleSubmit}>
                            <Form.Item
                                rules={rules.user_id}
                                className='mb-4'
                                label='Email or Student ID'
                                name='user_id'
                                {...(validationErrors.user_id)}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className='mr-2' />}
                                    placeholder='Enter your email or student id here'
                                    className='rounded'
                                    size='large'
                                />
                            </Form.Item>

                            <Form.Item
                                rules={rules.password}
                                className='mb-4'
                                label='Password'
                                name='password'
                                hasFeedback
                                {...(validationErrors.password)}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className='mr-2' />}
                                    className='rounded'
                                    placeholder="Enter your password here."
                                    size='large'
                                />
                            </Form.Item>

                            <Form.Item className='my-4'>
                                <Checkbox
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                >Remember me</Checkbox>

                                <Link className='float-right' to='/forgot-password'>Forgot Password</Link>
                            </Form.Item>

                            <Form.Item>
                                <Button size='large' loading={isLoading} className='w-full' type='primary' htmlType='submit'>
                                    Submit
                                </Button>
                                <p className='mt-2 text-center'>
                                    <span>Don't have an account? Sign up </span>
                                    <Link className='link' to='/register'>here</Link>.
                                </p>
                            </Form.Item>


                        </Form>
                    </div>

                    <span className='text-xs text-gray-500 font-mono text-center'>(c) Alspace 2022</span>

                </div>
                <div className='hidden lg:block bg-blue-400'></div>
            </div>
        </div>
    )

}