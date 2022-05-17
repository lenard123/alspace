import Option from "@/js/components/Option";
import { CameraOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from 'react'
import UpdateDisplayPicture from "./UpdateDisplayPicture";

export default function ChangeProfileOptions() {

    const uploader = useRef(null)

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
            <UpdateDisplayPicture ref={uploader} />
        </>
    )
}