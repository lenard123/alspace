import useAddWorkAction from "@/js/query/actions/useAddWorkAction";
import queryKeyFactory from "@/js/query/queryKeyFactory";
import { DatePicker, Form, Input, message, Modal, Typography } from "antd";
import moment from "moment";
import { useQueryClient } from "react-query";
import validationRules from "./validationRules";

const { Title } = Typography


export default function AddWorkModal({ isOpen, setIsOpen, alumni_id }) {

    const [form] = Form.useForm()
    const queryClient = useQueryClient()
    const { mutate, isLoading } = useAddWorkAction({
        onSuccess() {
            setIsOpen(false)
            queryClient.invalidateQueries(queryKeyFactory.alumniWorks(alumni_id))
            message.success('Work added successfully')
        },
        onError() {
            message.error('An error occured')
        }
    })

    const handleSubmit = (formData) => {
        if (isLoading) return
        mutate(formData)
    }

    return (
        <Modal
            visible={isOpen}
            title={<Title level={4}>Add Work</Title>}
            onOk={() => form.submit()}
            onCancel={() => setIsOpen(false)}
            closable={false}
            maskClosable={false}
            okButtonProps={{ loading: isLoading }}
        >
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                    className='mb-4'
                    label='Company Name'
                    name='company'
                    rules={validationRules.company}
                >
                    <Input className='rounded' size='large' />
                </Form.Item>

                <Form.Item
                    className='mb-4'
                    label='Job Title'
                    name='position'
                    rules={validationRules.position}
                >
                    <Input className='rounded' size='large' />
                </Form.Item>

                <Form.Item
                    className='mb-4'
                    label='Start Date'
                    name='start_at'
                    rules={validationRules.start_at}
                >
                    <DatePicker 
                        size='large' 
                        className='w-full rounded'
                        disabledDate={current => current > moment().endOf('day')}
                    />
                </Form.Item>

                <Form.Item
                    className='mb-4'
                    label='End Date (Optional)'
                    name='end_at'
                >
                    <DatePicker size='large' className='w-full rounded'/>
                </Form.Item>

            </Form>
        </Modal>
    )
}