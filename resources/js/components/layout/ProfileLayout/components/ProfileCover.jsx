import { Image } from "antd";
import UpdateImage from "./UpdateImage";
import useUpdateProfileCoverAction from "@/js/query/actions/useUpdateProfileCoverAction";

export default function ProfileCover({ src, showEditButton }) {

    const { mutate } = useUpdateProfileCoverAction()

    const handleUpload = (file) => {
        const data = new FormData()
        data.append('cover', file)
        mutate(data)
        return false;
    }

    return (
        <>
            <div className='relative'>
                <Image
                    width='100%'
                    height='min(300px, 60vw)'
                    className='object-cover'
                    src={src}
                />
                <UpdateImage
                    visible={showEditButton}
                    cropProps={{
                        modalTitle: 'Update Cover Image',
                        aspect: 2/1,
                    }}
                    title='Update Cover Image'
                    handleUpload={handleUpload}
                    className='absolute top-0 sm:top-auto sm:bottom-0 right-0 m-4'
                />
            </div>
        </>
    )
}