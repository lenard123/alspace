import usePostJobAction from "@/js/query/actions/usePostJobAction";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Form, Input, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import FormItem from "antd/lib/form/FormItem";
import { useState } from 'react'
import TagsEditor from "./TagsEditor";

export default function PostJobModal({ isOpen, setIsOpen }) {

    const [form] = Form.useForm()
    const [tags, setTags] = useState([])
    const [image, setImage] = useState(null)
    const { mutate } = usePostJobAction()

    const handleSubmit = (data) => {
        mutate({
            ...data,
            image,
            tags
        })
    }

    return (
        <Modal
            visible={isOpen}
            style={{top: '20px'}}
            onCancel={() => setIsOpen(false)}
            onOk={() => form.submit()}
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

                <FormItem name='title' label='Job Title'>
                    <Input size='large' className='rounded' />
                </FormItem>

                <FormItem name='company' label='Company Name'>
                    <Input size='large' className='rounded' />
                </FormItem>

                <FormItem name='description' label='Description'>
                    <Input.TextArea showCount maxLength={100} className='rounded' />
                </FormItem>

                <FormItem name='tags' label='Tags'>
                    <TagsEditor tags={tags} setTags={setTags} />
                </FormItem>

            </Form>
        </Modal>
    )
}