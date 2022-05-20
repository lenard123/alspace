import { Carousel, Image } from "antd";
import { useState } from 'react'


export default function PostImage({ images }) {

    const [previewVisible, setPreviewVisible] = useState(false)
    const [currentPreview, setCurrentPreview] = useState()

    if (images.length <= 0) return null;

    return (
        <>
            <div className='-mx-4 -mt-2 relative bg-gray-700'>
                <Carousel>
                    {images.map((image, i) => (
                        <div className='relative h-[320px]' key={image.id} >
                            <div
                                className='absolute inset-0 blur bg-cover bg-center'
                                style={{ backgroundImage: `url(${image.url})` }}>
                            </div>

                            <Image
                                width='100%'
                                height={320}
                                preview={{ visible: false }}
                                src={image.url}
                                className='object-contain'
                                onClick={() => {
                                    setPreviewVisible(true)
                                    setCurrentPreview(i)
                                }}
                            />
                        </div>
                    ))}

                </Carousel>
            </div>
            <div className='hidden'>
                <Image.PreviewGroup preview={{ current: currentPreview, visible: previewVisible, onVisibleChange: vis => setPreviewVisible(vis) }}>
                    {
                        images.map(image => (
                            <Image src={image.url} key={image.id} />
                        ))
                    }
                </Image.PreviewGroup>
            </div>
        </>
    )
}