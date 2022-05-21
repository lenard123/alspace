import useUpdateAvatarAction from "@/js/query/actions/useUpdateAvatarAction";
import { EditOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

export default function UpdateImage({ cropProps = {}, visible, className, handleUpload }) {

    if (!visible) return null

    return (
        <ImgCrop {...cropProps}>
            <Upload showUploadList={false} beforeUpload={handleUpload}>
                <Button
                    className={className}
                    type='primary'
                    shape='circle'
                    icon={<EditOutlined />}
                />
            </Upload>
        </ImgCrop>
    )
}