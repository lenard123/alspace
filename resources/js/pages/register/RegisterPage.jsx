import { Link } from 'react-router-dom'
import { Card, Input, Button, Form, Select, DatePicker } from 'antd'
import Logo from '@/js/components/Logo'
import rules from './validationRules'
import useRegistrationLogic from './useRegistrationLogic'
const { Option } = Select

export default function Register() {

    const { register, isLoading, validationErrors } = useRegistrationLogic()

    return (
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
                                Already have an account? Log in
                                <Link to='/login'> here</Link>
                            </p>
                        </Form.Item>


                    </Form>
                </Card>
            </div>
        </div>
    )
}