import { Link } from 'react-router-dom'
import { Card, Input, Button, Form, Select, DatePicker, Steps } from 'antd'
import Logo from '@/js/components/Logo'
import rules from './validationRules'
import useRegister from './useRegister'
import { Helmet } from 'react-helmet'
import { useState } from 'react'

const { Option } = Select
const { Step } = Steps

export default function Register() {
    const { register, isLoading, validationErrors } = useRegister()
    const [step, setStep] = useState(0)

    return (
        <div className='bg-gray-200 min-h-screen py-8 flex flex-col items-center'>
            <div className='w-full max-w-lg min-h-[500px] mx-auto rounded flex'>
                <div className='bg-white flex-grow p-4 flex flex-col'>

                    <Link to='/' className='mb-8'>
                        <Logo small />
                    </Link>

                    <div className='px-8'>
                        <div className='font-bold text-2xl mb-6 text-center'>Create Your Account</div>

                        <Steps size='small' className='mb-8' current={step}>
                            <Step title='Account Setup' />
                            <Step title='Personal Details' />
                            <Step title='Verification' />
                        </Steps>


                        <Form layout='vertical'>
                            <Form.Item
                                rules={rules.email}
                                className='mb-4'
                                label='Email'
                                name='email'
                                {...(validationErrors.email)}
                            >
                                <Input
                                    type='email'
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
                                required
                                tooltip={
                                    <span>
                                        - Must be atleast 8 characters<br />
                                        - Must Contain Letters and Numbers
                                    </span>
                                }
                                {...(validationErrors.password)}
                            >
                                <Input.Password
                                    placeholder='Enter your password here'
                                    size='large'
                                    className='rounded'
                                />
                            </Form.Item>

                            <Form.Item rules={rules.password_confirmation} className='mb-4' label='Confirm Password' name='password_confirmation' required>
                                <Input.Password
                                    placeholder='Confrm your password here'
                                    size='large'
                                    className='rounded'
                                />
                            </Form.Item>

                            <div className='flex justify-between mb-8'>
                                {step >= 1 && <Button size='large' onClick={() => setStep(step => step-1)}>Back</Button>}
                                {step < 2 && <Button size='large' onClick={() => setStep(step => step+1)} type='primary'>Next</Button>}
                                {step == 2 && <Button size='large' type='primary'>Submit</Button>}
                            </div>

                        </Form>

                    </div>

                </div>
                {/* <div className='bg-blue-4000 w-2/5 p-4 flex flex-col justify-center'>
                    <Steps current={1} direction="vertical" className=''>
                        <Step title="Finished" description="This is a description. This is a description." />
                        <Step title="Finished" description="This is a description. This is a description." />
                        <Step title="In Progress" description="This is a description. This is a description." />
                        <Step title="Waiting" description="This is a description." />
                        <Step title="Waiting" description="This is a description." />
                    </Steps>
                </div> */}
            </div>
        </div>
    )

    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className='bg-blue-700'>
                <div className="py-8">
                    <Card title={<Logo />} className='max-w-md mx-auto rounded'>
                        <Form layout='vertical' onFinish={register}>

                            <Form.Item
                                rules={rules.email}
                                className='mb-4'
                                label='Email'
                                name='email'
                                {...(validationErrors.email)}
                            >
                                <Input
                                    type='email'
                                    placeholder='Enter your email here'
                                    size='large'
                                    className='rounded'
                                />
                            </Form.Item>

                            <Form.Item
                                rules={rules.firstname}
                                className='mb-4'
                                label='Firstame'
                                name='firstname'
                                {...(validationErrors.firstname)}
                            >
                                <Input
                                    type='text'
                                    placeholder='Enter your firstname here'
                                    size='large'
                                    className='rounded'
                                />
                            </Form.Item>

                            <Form.Item
                                rules={rules.lastname}
                                className='mb-4'
                                label='Lastname'
                                name='lastname'
                                {...(validationErrors.lastname)}
                            >
                                <Input
                                    type='text'
                                    placeholder='Enter your lastname here'
                                    size='large'
                                    className='rounded'
                                />
                            </Form.Item>

                            <Form.Item
                                name='course'
                                label='Course'
                                rules={rules.course}
                            >
                                <Select size='large' placeholder='Select course'>
                                    <Option value="bscs">BSCS</Option>
                                    <Option value="bsis">BSIS</Option>
                                    <Option value="bsit">BSIT</Option>
                                    <Option value="bsemc">BSEMC</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name='year_graduated'
                                label='Year Graduated'
                                rules={rules.year_graduated}
                            >
                                <DatePicker
                                    disabledDate={currentDate => {
                                        const year = currentDate.year()
                                        const start = 1990
                                        const end = moment().year()
                                        return year < start || year > end
                                    }}
                                    className='w-full'
                                    size='large'
                                    picker='year'
                                />
                            </Form.Item>


                            <Form.Item
                                rules={rules.password}
                                className='mb-4'
                                label='Password'
                                name='password'
                                required
                                tooltip={
                                    <span>
                                        - Must be atleast 8 characters<br />
                                        - Must Contain Letters and Numbers
                                    </span>
                                }
                                {...(validationErrors.password)}
                            >
                                <Input.Password
                                    placeholder='Enter your password here'
                                    size='large'
                                    className='rounded'
                                />
                            </Form.Item>

                            <Form.Item rules={rules.password_confirmation} className='mb-4' label='Confirm Password' name='password_confirmation' required>
                                <Input.Password
                                    placeholder='Confrm your password here'
                                    size='large'
                                    className='rounded'
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button size='large' loading={isLoading} className='w-full' type='primary' htmlType='submit'>
                                    Create Account
                                </Button>
                                <p className='mt-2 text-center'>
                                    <span>Already have an account? Log in </span>
                                    <Link className='link' to='/login'>here</Link>.
                                </p>
                            </Form.Item>


                        </Form>
                    </Card>
                </div>
            </div>
        </>
    )
}