import { ProfileRoutesContext } from "@/js/components/layout/ProfileLayout/components/ProfileRoutes";
import { useCurrentUser } from "@/js/query/queries/useCurrentUserQuery";
import { Button, Card, DatePicker, Form, Input, Select, Typography } from "antd";
import { Navigate } from "react-router-dom";
import { useContext } from 'react'
const { Title, Text, Paragraph } = Typography

export default function UpdateProfile() {

    const { id: currentUserId } = useCurrentUser()
    const { user } = useContext(ProfileRoutesContext)

    if (user.id !== currentUserId) {
        return <Navigate to={`/profile/${user.id}`} />
    }

    return (
        <>
            <Card
                className='mt-3 shadow-lg'
                title={null}
            >
                <Title level={3}>Update Details</Title>

                <Form layout="vertical">

                    <Form.Item label='Gender'>
                        <Select size='large'>
                            <Select.Option value='Male'>Male</Select.Option>
                            <Select.Option value='Female'>Female</Select.Option>
                            <Select.Option>Prefer not to say</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='Birthday'>
                        <DatePicker className='w-full' size='large' />
                    </Form.Item>

                    <Form.Item label='Bio'>
                        <Input.TextArea />
                    </Form.Item>

                    <div className='mt-4 flex justify-end'>
                        <Button size='large' type='primary'>Save</Button>
                    </div>

                </Form>

            </Card>
            {/* <Card
                className='mt-4 shadow-lg'
                title={null}
            >
                <Title level={3}>Update Contact</Title>

                <Form layout="vertical">

                    <Form.Item label='Gender'>
                        <Select size='large'>
                            <Select.Option value='Male'>Male</Select.Option>
                            <Select.Option value='Female'>Female</Select.Option>
                            <Select.Option>Prefer not to say</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label='Birthday'>
                        <DatePicker className='w-full' size='large' />
                    </Form.Item>

                    <Form.Item label='Bio'>
                        <Input.TextArea />
                    </Form.Item>

                </Form>

            </Card> */}
        </>
    )
}