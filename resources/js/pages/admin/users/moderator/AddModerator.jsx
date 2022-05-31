import { Breadcrumb, Button, Form, Input, message, PageHeader } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Http, { handleError, requestCookie } from '@/js/utils/Http'
import {  useMutation } from "react-query";


const rules = {

    email: [
        { required: true, message: 'Please enter your email' },
        { type: 'email', message: 'Please enter a valid email' }
    ],

    firstname: [
        { required: true, message: 'Please enter your firstname' },
        { min:2, message: 'Please enter a valid name' },
        { pattern: /^[a-z ,.'-]+$/i, message: 'Please enter a valid name' }
    ],

    lastname: [
        { required: true, message: 'Please enter your lastname' },
        { min:2, message: 'Please enter a valid name' },
        { pattern: /^[a-z ,.'-]+$/i, message: 'Please enter a valid name' }
    ],

    password: [
        { required: true, message: 'Password is required.' },
        { min: 8, message: 'Password must be atleast 8 characters.'},
        { pattern: /^(?=.*?[0-9]).{0,}$/, message: 'Password must contain a number.' },
        { pattern: /^(?=.*?[a-z]).{0,}$/, message: 'Password must contain a lowercase letter.' },
        { pattern: /^(?=.*?[A-Z]).{0,}$/, message: 'Password must contain an uppercase letter.' } //Must have letter and number
    ],

    password_confirmation: [
        { required: true, message: 'Please confirm your password.' },
        ({ getFieldValue  }) => ({
            validator: async(_, value) => {
                if (!value || getFieldValue('password') === value) {
                    return
                }
                throw new Error('The two password you entered does not match')
            }
        })
    ]
}

const apiCall = async (formData) => {
    await requestCookie()
    return await Http.post('/users/moderators', formData)
}

export default function AddModerator() {

    const navigate = useNavigate()
    const { mutate, isLoading } = useMutation(apiCall, {
        onSuccess() {
            navigate('/admin/users/moderator')
            message.success('Moderator added successfully')
        },

        onError(err){
            handleError(err)
        }
    })

    const handleSubmit = (data) => {
        if (isLoading) return;
        mutate(data)
    }

    return (
        <>
            <PageHeader
                title='Add Moderator'
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        <Breadcrumb.Item>Moderators</Breadcrumb.Item>
                        <Breadcrumb.Item>Add New</Breadcrumb.Item>
                    </Breadcrumb>
                }
            />

            <div className='bg-white p-6 sm:mx-6 mb-8 max-w-screen-md'>
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item label='Firstname' name='firstname' rules={rules.firstname} hasFeedback>
                        <Input size='large' className='rounded'/>
                    </Form.Item>

                    <Form.Item label='Lastname' name='lastname' rules={rules.lastname} hasFeedback>
                        <Input size='large' className='rounded'/>
                    </Form.Item>

                    <Form.Item label='Email' name='email' rules={rules.email} hasFeedback>
                        <Input size='large' className='rounded'/>
                    </Form.Item>

                    <Form.Item label='Password' name='password' rules={rules.password} hasFeedback>
                        <Input.Password size='large' className='rounded'/>
                    </Form.Item>

                    <Form.Item label='Retype Password' name='password_confirmation' rules={rules.password_confirmation} hasFeedback>
                        <Input.Password size='large' className='rounded'/>
                    </Form.Item>

                    <Button loading={isLoading} htmlType='submit' className='rounded' type='primary' block size='large'>Submit</Button>
                </Form>
            </div>
        </>
    )
}