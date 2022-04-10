import { useRef } from 'react'
import { Upload } from 'antd'
import { CameraFilled } from '@ant-design/icons'
import classNames from 'classnames'

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
                ref={uploader}
                fileList={files}
                onChange={({ fileList }) => setFiles(fileList)}
                className={classNames({ 'hidden': files.length === 0 })}
                listType='picture-card'
                beforeUpload={() => false}
                maxCount={3}
                previewFile={file => Promise.resolve(URL.createObjectURL(file))}
            >
                {files.length < 3 &&
                    <div ref={uploadElement} className='flex flex-col text-xs'>
                        <CameraFilled />
                        <span>Attach a photo</span>
                    </div>
                }
            </Upload>
        </>
    )
}