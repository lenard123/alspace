import Logo from '@/js/components/Logo'
import { MailOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input } from 'antd'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

const rules = [
    {required: true, message: 'Please enter your email.'},
    {type: 'email', message: 'Please enter a valid email.'},
]

export default function ForgotPassword() {
    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <div className='bg-gray-100 min-h-screen flex flex-col justify-center'>
                <Card title={<div className='text-xl font-semibold text-center font-mono'>Forgot Your Password?</div>} className='w-[360px] mx-auto rounded'>
                    <div className='text-center font-mono'>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</div>

                    <Form layout='vertical'>
                        <Form.Item rules={rules} hasFeedback name='email' className='mb-4' label={<span className='font-semibold'>Email</span>}>
                            <Input 
                                type='email' 
                                prefix={<MailOutlined className='mr-2' />}
                                placeholder='Enter your email here'
                                size='large'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button shape='round' size='large' block type='primary' htmlType='submit'>
                                Reset Password
                            </Button>
                            <p className='mt-2 text-center font-mono'>
                                <Link className='link block' to='/register'>Create an Account!</Link>
                                <Link className='link block' to='/login'>Already have an account? Login!</Link>
                            </p>
                        </Form.Item>
                    </Form>

                </Card>
                {/* <Card className='w-[320px] mx-auto'>
                    <div className='text-xl font-semibold text-center'>Forgot Your Password?</div>
                    <div className='text-center mt-4'>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</div>
                </Card> */}
                {/* <div className='bg-white min-h-[320px] w-[320px] mx-auto shadow-lg p-8'>
                    <div className='flex justify-center items-center mb-8'>
                        <img className='rounded mr-2' src='/images/logo.png' width={40} />
                        <span
                            className='text-base uppercase inline-block font-bold text-transparent '
                            style={{
                                backgroundImage: '-webkit-gradient(linear,37.219838% 34.532506%,36.425669% 93.178216%,from(#29cdff),to(#0a60ff),color-stop(.37,#148eff))',
                                backgroundClip: 'text',
                                textFillColor: 'transparent'
                            }}
                        >Alspace</span>
                    </div>
                </div> */}
            </div>
        </>
    )
}