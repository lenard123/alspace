import { EventApi } from "@/js/apis"
import { TODAY } from "@/js/hooks/useDates"
import { PlusOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Image, Input, message, Switch, Upload } from "antd"
import Modal from "antd/lib/modal/Modal"
import { useState } from 'react'
import { useMutation } from "react-query"

const rules = {
    title: [{ required: true, message: 'This field is required' }],
    start_date: [{ required: true, message: 'This field is required' }],
    description: [{ required: true, message: 'This field is required' }]
}

export default function AddEventModal(props) {

    const [isOnline, setIsOnline] = useState(false)
    const [image, setImage] = useState(null)

    const { isLoading, mutate } = useMutation(EventApi.createEvent, {
        onSuccess: (data) => {
            message.success('Event added successfully')
            props.onCancel()
        }
    })

    const handleSubmit = (formData) => {
        if (isLoading) return;
        mutate({
            is_online: Boolean(isOnline),
            image,
            ...formData
        })
    }

    return (
        <Modal
            afterClose={() => setImage(null)}
            centered={true}
            title='Host Event'
            style={{ top: '20px' }}
            bodyStyle={{ paddingBottom: '8px', backgroundColor: 'white' }}
            footer={false}
            destroyOnClose={true}
            maskClosable={false}
            {...props}
        >
            <Form onFinish={handleSubmit} layout="vertical" >

                <Form.Item label='Cover Image'>
                    <Upload.Dragger
                        accept='image/*'
                        multiple={false}
                        onChange={files => { setImage(files.file) }}
                        beforeUpload={() => false}
                        showUploadList={false}
                    >
                        {image
                            ? <Image preview={false} className='h-32 w-full object-cover' src={URL.createObjectURL(image)}/>
                            : (
                                <div className='h-32 flex flex-col justify-center'>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )
                        }
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item name='title' label='Event name' rules={rules.title}>
                    <Input size='large' className='rounded' />
                </Form.Item>

                <Form.Item name='start_at' label='Start Date' rules={rules.start_date}>
                    <DatePicker 
                        className='block' 
                        size='large' 
                        showTime 
                        format='MMMM DD, YYYY HH:mm' 
                        disabledDate={(currentDate) => (TODAY - currentDate) > 0}
                    />
                </Form.Item>

                <div className='flex justify-between pb-5'>
                    <label>Online</label>
                    <Switch checked={isOnline} onChange={checked => setIsOnline(checked)} />
                </div>

                <Form.Item name='location' label='Location'>
                    <Input size='large' className='rounded' placeholder='Event location or link to the meeting.' />
                </Form.Item>

                <Form.Item name='description' label='Description' rules={rules.description}>
                    <Input.TextArea className='rounded' size='large' />
                </Form.Item>

                <Form.Item>
                    <Button loading={isLoading} htmlType='submit' block size='large' type='primary' className='rounded'>Create</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}
