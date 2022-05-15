import { UserApi } from "@/js/apis";
import Option from "@/js/components/Option";
import queryKeyFactory from "@/js/query/queryKeyFactory";
import { CameraOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from "react-query";

export default function ChangeProfileOptions() {

    const uploader = useRef(null)
    const queryClient = useQueryClient()
    const { mutate } = useMutation(({file}) => UserApi.updateAvatar(file), {
        onSuccess(response, { hide }) {
            queryClient.invalidateQueries(queryKeyFactory.currentUser)
            hide()
            message.success('Avatar updated successfully')
        }
    })

    const handleMenuClick = ({ key }) => {
        switch (key) {
            case 'update': {
                uploader.current.click()
                break;
            }
        }
    }

    return (
        <>
            <Option
                onMenuClick={handleMenuClick}
                menuOptions={[
                    { key: 'remove', label: 'Remote Photo' },
                    { key: 'update', label: 'Update Display Picture' }
                ]}
                placement="bottomLeft"
            >
                <Button 
                    className='absolute bottom-0 right-0' 
                    type='primary' 
                    shape='circle' 
                    icon={<CameraOutlined />} />
            </Option>
            <ImgCrop shape='round'>
                <Upload 
                    className='hidden'
                    beforeUpload={file => {
                        const hide = message.loading('Uploading Image')
                        mutate({file, hide})
                        return false
                    }}
                    >
                    <span ref={uploader}></span>
                </Upload>
            </ImgCrop>
        </>
    )
}