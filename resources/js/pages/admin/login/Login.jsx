import { Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"

const rules = {
    email: [
        {required: true, message: 'Please enter your email.'},
        {type: 'email', message: 'Please enter a valid email.'},
    ],
    password: [
        {required: true, message: 'Please enter your password.'},
    ]
}

export default function Login()
{
    const navigate = useNavigate()

    const handleSubmit = (data) => {
        navigate('/admin')
    }

    return (
        <div className='bg-gray-100 min-h-screen flex flex-col justify-center'>

            <div className='bg-white min-h-[320px] w-[320px] mx-auto shadow-lg p-8'>
                <div className='flex justify-center items-center mb-8'>
                    <img className='rounded mr-2' src='/images/logo.png' width={40}/>
                    <span 
                        className='text-base uppercase inline-block font-bold text-transparent '
                        style={{
                            backgroundImage: '-webkit-gradient(linear,37.219838% 34.532506%,36.425669% 93.178216%,from(#29cdff),to(#0a60ff),color-stop(.37,#148eff))',
                            backgroundClip: 'text',
                            textFillColor: 'transparent'
                        }}
                    >Alspace Admin</span>
                </div>

                <Form onFinish={handleSubmit}>
                    <Form.Item name='email' rules={rules.email} className="mb-4" hasFeedback>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Form.Item name='password' rules={rules.password} className="mb-4" hasFeedback>
                        <Input.Password placeholder='Password'/>
                    </Form.Item>
                    <Button htmlType='submit' type='primary' block>Sign in</Button>
                    <p className='text-center text-gray-500'>Forgot Password</p>
                </Form>

            </div>

        </div>
    )
}