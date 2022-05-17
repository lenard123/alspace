import useUpdateAvatarAction from "@/js/query/actions/useUpdateAvatarAction"
import { Upload } from "antd"
import ImgCrop from "antd-img-crop"
import { forwardRef } from 'react'

const UpdateDisplayPicture = forwardRef((props, ref) => {
    const { mutate } = useUpdateAvatarAction()
    return (
        <ImgCrop shape='round'>
            <Upload
                className='hidden'
                beforeUpload={file => {
                    mutate(file)
                    return false
                }}
            >
                <span ref={ref}></span>
            </Upload>
        </ImgCrop>
    )
})

export default UpdateDisplayPicture