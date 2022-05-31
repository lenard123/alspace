import { Descriptions, Form, Image, Input, InputNumber, message, Modal } from 'antd'
import { useState } from 'react'
import { useMutation } from 'react-query'
import Http, { handleError, requestCookie } from '@/js/utils/Http'

const apiCall = async ({tshirt_id, quantity}) => {
    await requestCookie()
    return await Http.post(`/items/tshirts/${tshirt_id}/request`, {quantity})
}

const RequestForm = function ({ tshirt, isOpen, setIsOpen }) {

    const [quantity, setQuantity] = useState(1)
    const [form] = Form.useForm()

    const { mutate, isLoading } = useMutation(apiCall, {
        onSuccess(data) {
            message.success('Request Submitted Successfully')
            setIsOpen(false)
        },
        onError(error) {
            handleError(error)
        }
    })

    const handleSubmit = () => {
        if (isLoading) return;
        mutate({tshirt_id:tshirt.id, quantity})
    }

    if (tshirt === null) {
        if (isOpen) setIsOpen(false)
        return null
    }

    return (
        <Modal
            visible={isOpen}
            style={{ top: '20px' }}
            onCancel={() => setIsOpen(false)}
            maskClosable={false}
            okButtonProps={{loading: isLoading}}
            closable={false}
            title='Request Alumni Tshirt'
            onOk={() => form.submit()}
            destroyOnClose
        >
            <Descriptions className='mb-4' title='TShirt Info' layout="vertical" bordered>
                <Descriptions.Item label='Image'>
                    <Image width={90} height={120} src={tshirt.thumbnail_url} />
                </Descriptions.Item>
                <Descriptions.Item label='Name'>{tshirt.title}</Descriptions.Item>
                <Descriptions.Item label='Price'>{tshirt.price}</Descriptions.Item>
            </Descriptions>

            <Form form={form} onFinish={handleSubmit} layout='vertical'>
                <Form.Item className="mb-4" hasFeedback  name='quantity' label='Quantity' required>
                    <InputNumber 
                        value={quantity} 
                        onChange={(val) => {
                            setQuantity(val || 1)
                        }}
                        min={1} 
                        size='large' 
                        className='rounded w-full' 
                        placeholder='1'
                    />
                </Form.Item>

                <Form.Item className="mb-4" hasFeedback label='Subtotal'>
                    <Input size='large' value={quantity && quantity * tshirt.price} className='rounded' disabled/>
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default function useRequestFormModal() {

    const [isOpen, setIsOpen] = useState(false)
    const [tshirt, setTshirt] = useState(null)

    return {
        RequestForm: () => <RequestForm tshirt={tshirt} isOpen={isOpen} setIsOpen={setIsOpen} />,
        openModal: (tshirt) => {
            setTshirt(tshirt)
            setIsOpen(true)
        }
    }
}