import { UploadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, InputNumber, PageHeader, Select, Upload } from "antd";
import { Link } from "react-router-dom";

const rules = {
    title: [{ required:true, message: 'This field is required' }],
    price: [{ required:true, message: 'This field is required' }]
}

export default function AddTshirtPage() {
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
                <Form layout="vertical">
                    <Form.Item label='Product Name' name='title' hasFeedback rules={rules.title}>
                        <Input size='large' className='rounded' />
                    </Form.Item>

                    <Form.Item label='Price' rules={rules.price} hasFeedback>
                        <InputNumber step={0.25} min={0} size='large' className='w-full rounded' />
                    </Form.Item>

                    <Form.Item label='Status'>
                        <Select size="large" defaultValue='NOT_AVAILABLE'>
                            <Select.Option value='NOT_AVAILABLE'>Not yet available</Select.Option>
                            <Select.Option value='AVAILABLE'>Available</Select.Option>
                            <Select.Option value='OUT_OF_STOCK'>Out of Stock</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='Thumbnail'>
                        <Upload beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label='Additional Images'>
                        <Upload beforeUpload={() => false} listType='picture-card'>
                            Add Image
                        </Upload>
                    </Form.Item>

                    <Button className='rounded' type='primary' block size='large'>Submit</Button>
                </Form>
            </div>
        </>
    )
}