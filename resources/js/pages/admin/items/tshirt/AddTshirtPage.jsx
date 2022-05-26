import { UploadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, InputNumber, message, PageHeader, Select, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useMutation } from "react-query";
import Http, { handleError, requestCookie } from '@/js/utils/Http'


const rules = {
    title: [{ required:true, message: 'This field is required' }],
    price: [{ required:true, message: 'This field is required' }]
}

const apiCall = async (formData) => {
    await requestCookie()
    return await Http.post('/items/tshirts', formData)
}

export default function AddTshirtPage() {

    const [thumbnail, setThumbnail] = useState(null)
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(apiCall, {
        onSuccess() {
            message.success('Alumni TShirt Added Successfully')
            navigate('/admin/items/tshirt')
        },

        onError(error) {
            handleError(error)
        }
    })

    const handleSubmit = ({title, price, availability}) => {
        if (isLoading) return;

        if (thumbnail == null) {
            message.error('Please select image to be uploaded')
            return;
        }

        const formData = new FormData();
        formData.append('title', title)
        formData.append('price', price)
        formData.append('availability', availability)
        formData.append('image', thumbnail)

        mutate(formData)
    }

    return (
        <>
            <PageHeader
                breadcrumb={
                    <Breadcrumb>
                        <Breadcrumb.Item>Items</Breadcrumb.Item>
                        <Breadcrumb.Item><Link to='/admin/items/tshirt'>Alumni T-Shirt</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Create New</Breadcrumb.Item>
                    </Breadcrumb>
                }
                title='Add Alumni T-Shirt'
            />

            <div className='bg-white p-6 sm:mx-6 mb-8'>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label='Product Name' name='title' hasFeedback rules={rules.title}>
                        <Input size='large' className='rounded' />
                    </Form.Item>

                    <Form.Item name='price' label='Price' rules={rules.price} hasFeedback required>
                        <InputNumber step={0.25} min={0} size='large' className='w-full rounded' />
                    </Form.Item>

                    <Form.Item label='Status' initialValue='NOT_AVAILABLE' name='availability'>
                        <Select size="large"  name='availability'>
                            <Select.Option value='NOT_AVAILABLE'>Not yet available</Select.Option>
                            <Select.Option value='AVAILABLE'>Available</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='Image'>
                        <Upload
                            accept='image/*' 
                            maxCount={1}
                            listType='picture'
                            onRemove={() => setThumbnail(null)}
                            beforeUpload={(file) => {
                                setThumbnail(file)
                                return false
                            }}
                            >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Button loading={isLoading} htmlType='submit' className='rounded' type='primary' block size='large'>Submit</Button>
                </Form>
            </div>
        </>
    )
}