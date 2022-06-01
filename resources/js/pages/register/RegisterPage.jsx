import { Link } from 'react-router-dom'
import { Button, Result, Steps } from 'antd'
import Logo from '@/js/components/Logo'
import { Helmet } from 'react-helmet'
import classNames from 'classnames'
import { useState } from 'react'
import _ from 'lodash'
import Form1 from './components/Form1'
import Form2 from './components/Form2'
import Form3 from './components/Form3'

const { Step } = Steps

export default function Register() {
    const [step, setStep] = useState(0)
    const [data, setData] = useState({})
    const [success, setSuccess] = useState(false)

    const next = (data) => {
        setStep(step => step + 1)
        setData(oldData => {
            return { ...oldData, ...data }
        })
    }

    if (success) {
        return (
            <Result
                className='min-h-screen flex flex-col justify-center'
                status='success'
                title='Registration Successfull'
                subTitle='We will send you a mail once the admin verify your account'
                extra={[
                    <Link to='/login' key='login'><Button type='primary'>Go to Login</Button></Link>
                ]}
            />
        )
    }

    return (
        <div className='bg-gray-200 min-h-screen py-8 flex flex-col items-center'>
            <Helmet>
                <title>Create an Account</title>
            </Helmet>
            <div className='w-full max-w-lg min-h-[500px] mx-auto rounded flex flex-col'>
                <div className='bg-white flex-grow p-4 flex flex-col'>

                    <Link to='/' className='mb-8'>
                        <Logo small />
                    </Link>

                    <div className='px-8'>
                        <div className='font-bold text-2xl mb-6 text-center'>Create Your Account</div>

                        <Steps size='small' className='mb-8' current={step}>
                            <Step title='Personal Details' />
                            <Step title='Account Setup' />
                            <Step title='Verification' />
                        </Steps>

                        <Form1 className={classNames({ 'hidden': step != 0 })} onFinish={next} />
                        <Form2 className={classNames({ 'hidden': step != 1 })} onFinish={next} back={() => setStep(0)} />
                        <Form3 className={classNames({ 'hidden': step != 2 })} onFinish={() => setSuccess(true)} data={data} back={() => setStep(1)} />

                    </div>

                </div>


                <p className='mt-2 text-center'>
                    <span>By signing up you agree to our </span>
                    <Link className='link' to='/tos'>terms of services.</Link>.
                </p>
            </div>
        </div>
    )
}