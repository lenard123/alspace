import { FileAddOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Image, Input, Switch, Upload } from "antd"
import Modal from "antd/lib/modal/Modal"
import { useState } from 'react'

export default function AddEventModal(props) {

    const [coverPreview, setCoverPreview] = useState(null)

    return (
        <Modal
            className='FullpageOnMobileModal'
            centered={true}
            title='Host Event'
            bodyStyle={{ paddingBottom: '0',backgroundColor: 'white' }}
            footer={false}
            {...props}
        >
            <Form layout="vertical" >

                <div className='bg-red-500 -m-6 mb-4 h-40 relative'>
                    <Upload.Dragger 
                        multiple={false} 
                        onChange={function({file}) {
                            if (file) {
                                setCoverPreview(URL.createObjectURL(file))
                            }
                        }} 
                        beforeUpload={() => false} 
                        maxCount={1}
                        showUploadList={false}
                    >
                        {
                            coverPreview && <img className='h-40 w-full object-cover absolute inset-0' src={coverPreview} />
                        }
                        <span className='relative text-xs text-white p-1 rounded bg-gray-400'><FileAddOutlined /> Add Cover Photo</span>
                    </Upload.Dragger>
                </div>

                <Form.Item label='Event name'>
                    <Input size='large' className='rounded'/>
                </Form.Item>

                <Form.Item label='Start Date'>
                    <DatePicker className='block' size='large' showTime format='MMMM DD, YYYY HH:mm'/>
                </Form.Item>

                <div className='flex justify-between pb-5'>
                    <label>Online</label>
                    <Switch />
                </div>

                <Form.Item label='Location'>
                    <Input size='large' className='rounded' placeholder='Event location or link to the meeting.' />
                </Form.Item>

                <Form.Item label='Description'>
                    <Input.TextArea className='rounded' size='large' />
                </Form.Item>

                <Form.Item>
                    <Button block size='large' type='primary' className='rounded'>Create</Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}
