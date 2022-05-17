import usePostJobAction from "@/js/query/actions/usePostJobAction";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Form, Input, message, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import FormItem from "antd/lib/form/FormItem";
import { useState } from 'react'
import TagsEditor from "./TagsEditor";

const rules = {
    title: [{required: true, message: 'This field is required'}],
    company: [{required: true, message: 'This field is required'}],
    description: [{required: true, message: 'This field is required'}],
}

export default function PostJobModal({ isOpen, setIsOpen }) {

    const [form] = Form.useForm()
    const [tags, setTags] = useState([])
    const [image, setImage] = useState(null)
    const { mutate, isLoading } = usePostJobAction({
        onSuccess() {
            setIsOpen(false)
            setImage(null)
            setTags([])
            form.resetFields()
            message.success('Job Posted Successfully')
        }
    })

    const handleSubmit = (data) => {

        if (isLoading) return;

        mutate({...data,image,tags})
    }

    return (
        <Modal
            visible={isOpen}
            style={{top: '20px'}}
            onCancel={() => setIsOpen(false)}
            onOk={() => form.submit()}
            okButtonProps={{loading: isLoading}}
            maskClosable={false}
            closable={false}
            title='Post Job Advertisement'
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>

                <ImgCrop shape='round'>
                    <Upload
                        className='avatar-uploader'
                        listType="picture-card"
                        maxCount={1}
                        showUploadList={false}
                        beforeUpload={(file) => {
                            setImage(file)
                            return false
                        }}
                    >
                        {image 
                            ? <Avatar className='w-full h-full' src={URL.createObjectURL(image)}/>
                            :(
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )
                        }
                    </Upload>
                </ImgCrop>

                <Form.Item className="mb-4" hasFeedback name='title' label='Job Title' rules={rules.title}>
                    <Input size='large' className='rounded' />
                </Form.Item>

                <Form.Item className="mb-4" hasFeedback name='company' label='Company Name' rules={rules.company}>
                    <Input size='large' className='rounded' />
                </Form.Item>

                <Form.Item className="mb-4" hasFeedback name='description' label='Description' rules={rules.description}>
                    <Input.TextArea showCount maxLength={100} className='rounded' />
                </Form.Item>

                <Form.Item name='tags' label='Tags'>
                    <TagsEditor tags={tags} setTags={setTags} />
                </Form.Item>

            </Form>
        </Modal>
    )
}