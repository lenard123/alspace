import { BriefcaseOutlined } from "@/js/components/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Form, Input, Modal, Upload } from "antd";
import FormItem from "antd/lib/form/FormItem";
import useTilg from 'tilg'
import { useState } from 'react'
import TagsEditor from "./TagsEditor";

export default function PostJobModal({ isOpen, setIsOpen }) {

    const [tags, setTags] = useState(['test', 'a', 'b'])

    return (
        <Modal
            visible={isOpen}
            style={{top: '20px'}}
            onCancel={() => setIsOpen(false)}
            maskClosable={false}
            closable={false}
            title='Post Job Advertisement'
        >
            <Form layout="vertical">

                <Upload
                    className='avatar-uploader'
                    listType="picture-card"
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={() => false}
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>

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