import { EventApi } from "@/js/apis"
import { FileAddOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Image, Input, Switch, Upload } from "antd"
import Modal from "antd/lib/modal/Modal"
import { useState } from 'react'
import { useMutation } from "react-query"

export default function AddEventModal(props) {

    const [isOnline, setIsOnline] = useState(false)
    const [image, setImage] = useState(null)
    const { isLoading, mutate } = useMutation(EventApi.createEvent, {
        onSuccess: (data) => {
            props.onCancel()
        }
    })

    const handleSubmit = (formData) => {
        if (isLoading) return;
        mutate({
            is_online: isOnline,
            image,
            ...formData
        })
    }

    return (
        <Modal
            afterClose={() => setImage(null)}
            className='FullpageOnMobileModal'
            centered={true}
            title='Host Event'
            bodyStyle={{ paddingBottom: '0',backgroundColor: 'white' }}
            footer={false}
            destroyOnClose={true}
            maskClosable={false}
            {...props}
        >
            <Form onFinish={handleSubmit} layout="vertical" >

                <div className='bg-red-500 -m-6 mb-4 h-40 relative'>
                    <Upload.Dragger 
                        accept='image/*'
                        multiple={false} 
                        onChange={function({file}) {
                            setImage(file)
                        }} 
                        beforeUpload={() => false} 
                        maxCount={1}
                        showUploadList={false}
                    >
                        {
                            image && <img className='h-40 w-full object-cover absolute inset-0' src={URL.createObjectURL(image)} />
                        }
                        <span className='relative text-xs text-white p-1 rounded bg-gray-400'><FileAddOutlined /> Add Cover Photo</span>
                    </Upload.Dragger>
                </div>

                <Form.Item name='title' label='Event name'>
                    <Input size='large' className='rounded'/>
                </Form.Item>

                <Form.Item name='start_at' label='Start Date'>
                    <DatePicker className='block' size='large' showTime format='MMMM DD, YYYY HH:mm'/>
                </Form.Item>

                <div className='flex justify-between pb-5'>
                    <label>Online</label>
                    <Switch checked={isOnline} onChange={checked => setIsOnline(checked)}/>
                </div>

                <Form.Item name='location' label='Location'>
                    <Input size='large' className='rounded' placeholder='Event location or link to the meeting.' />
                </Form.Item>

                <Form.Item name='description' label='Description'>
                    <Input.TextArea className='rounded' size='large' />
                </Form.Item>

                <Form.Item>
                    <Button loading={isLoading} htmlType='submit' block size='large' type='primary' className='rounded'>Create</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}
