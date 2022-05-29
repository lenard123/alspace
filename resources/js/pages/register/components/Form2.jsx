import { Input, Button, Form } from 'antd'
import rules from '../validationRules'
import _ from 'lodash'
import useFormValidator from './useFormValidator'

const Form2 = ({ onFinish, className, back }) => {
    const { validationErrors, isLoading, validate } = useFormValidator(1, onFinish)

    return (
        <Form className={className} layout='vertical' onFinish={validate}>
            <Form.Item
                rules={rules.email}
                className='mb-4'
                label='Email'
                name='email'
                hasFeedback
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
                        - Must Contain Letters and Numbers<br/>
                        - Must contain Uppercase and Lowecase letter
                    </span>
                }
                hasFeedback
                {...(validationErrors.password)}
            >
                <Input.Password
                    placeholder='Enter your password here'
                    size='large'
                    className='rounded'
                />
            </Form.Item>

            <Form.Item
                rules={rules.password_confirmation}
                className='mb-6'
                label='Confirm Password'
                name='password_confirmation'
                required
                hasFeedback
            >
                <Input.Password
                    placeholder='Confrm your password here'
                    size='large'
                    className='rounded'
                />
            </Form.Item>

            <div className='flex justify-between mb-4'>
                <Button onClick={back} size='large'>Back</Button>
                <Button htmlType='submit' type='primary' size='large' loading={isLoading}>Next</Button>
            </div>

        </Form>
    )

}

export default Form2