import { Input, Button, Form } from 'antd'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { AuthApi } from '@/js/apis'
import _ from 'lodash'
import useOtp from './useOtp'

const Form3 = ({ data, back, className, onFinish }) => {

    const [validationErrors, setValidationErrors] = useState({})
    const { sendOTP, sending, throttle } = useOtp(data.email)
    const { mutate:register, isLoading:registering } = useMutation(AuthApi.register, {
        onSuccess(data) {
            onFinish()
        },
        onError(error) {
            setValidationErrors(error.validationErrors)
        }
    })

    const submit = (otp) => {
        if (registering) return;
        setValidationErrors({})
        register({...data, ...otp})
    }

    return (
        <Form layout='vertical' className={className} onFinish={submit}>
            <p>
                <span className='text-lg font-bold'>Your 1 step away from registering</span><br />
                <span>We just need to verify your email. Click the Send Code button and we will send a Verification code to your email.</span>
            </p>
            <Form.Item
                className='mb-4'
                label='Email'
                hasFeedback
            >
                <Input
                    disabled
                    type='email'
                    size='large'
                    className='rounded'
                    value={data.email}
                />
            </Form.Item>
            <Form.Item
                className='mb-4'
                label='Code'
                hasFeedback
                name='otp'
                {...validationErrors.otp}
            >
                <Input
                    size='large'
                    className='rounded'
                    suffix={
                        <Button disabled={throttle} loading={sending} onClick={sendOTP} type='link'>
                            { throttle > 0 ? `Resend in ${throttle}s` : 'Send Code' }
                        </Button>
                    }
                />
            </Form.Item>
            <Button className='mb-4' block size='large' htmlType='submit' loading={registering} type='primary'>Submit</Button>
            <Button className='mb-4' block size='large' onClick={back}>Go back</Button>

        </Form>
    )
}

export default Form3