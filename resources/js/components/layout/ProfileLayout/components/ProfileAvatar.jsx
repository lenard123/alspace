import useUpdateAvatarAction from "@/js/query/actions/useUpdateAvatarAction";
import { Avatar } from "antd";
import UpdateImage from "./UpdateImage";


export default function ProfileAvatar({ src, showEditButton }) {
    
    const { mutate } = useUpdateAvatarAction()

    const handleUpload = (file) => {
        mutate(file)
        return false
    }

    return (
        <div className='relative'>
            <Avatar
                className='border-2 border-white'
                src={src}
                size={120}
            />
            <UpdateImage 
                visible={showEditButton}
                handleUpload={handleUpload} 
                cropProps={{
                    modalTitle: 'Update Avatar',
                    shape: 'round',
                }}
                className='absolute bottom-0 right-0' 
            />
        </div>
    )
}