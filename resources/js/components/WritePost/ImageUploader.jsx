import { useRef } from 'react'
import { Upload } from 'antd'
import { CameraFilled } from '@ant-design/icons'
import classNames from 'classnames'

const MAX_UPLOAD = 10;

export default function ImageUploader ({ files, setFiles }) {

    const uploadElement = useRef(null)
    const uploader = useRef(null)

    return (
        <>
            {files.length === 0 &&
                <div onClick={() => uploadElement.current.click()} className='space-x-2 cursor-pointer'>
                    <CameraFilled />
                    <span>Attach a photo</span>
                </div>
            }

            <Upload
                accept='image/*'
                ref={uploader}
                fileList={files}
                onChange={({ fileList }) => setFiles(fileList)}
                className={classNames({ 'hidden': files.length === 0 })}
                listType='picture-card'
                beforeUpload={() => false}
                maxCount={MAX_UPLOAD}
                previewFile={file => Promise.resolve(URL.createObjectURL(file))}
            >
                {files.length < MAX_UPLOAD &&
                    <div ref={uploadElement} className='flex flex-col text-xs'>
                        <CameraFilled />
                        <span>Attach a photo</span>
                    </div>
                }
            </Upload>
        </>
    )
}