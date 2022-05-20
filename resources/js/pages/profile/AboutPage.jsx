import { ProfileRoutesContext } from "@/js/components/layout/ProfileLayout/components/ProfileRoutes";
import { Card, Divider, Typography } from "antd";
import { useContext } from 'react'

const { Title, Text, Paragraph } = Typography

const Description = ({children, value, select, defaultText = 'Not Set'}) => {

    if (!value)
        return <Text className='col-span-2' type='secondary' italic>{defaultText}</Text>

    if (children)
        return children

    return <Text className='col-span-2'>{select ? select(value) : value}</Text>
}

export default function AboutPage() {

    const { user } = useContext(ProfileRoutesContext)

    const { fullname, info, created_at, email } = user
    const { gender, birthday, bio } = info

    return (
        <Card
            className='mt-3'
            title={null}
        >
            <Title level={3}>Info</Title>
            <div className='space-y-4 text-base text-gray-700 mt-8'>
                <div className='grid grid-cols-3'>
                    <Title level={5}>Name:</Title>
                    <Description value={fullname} />
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Gender:</Title>
                    <Description value={gender} defaultText='Unspecified'/>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Birthday:</Title>
                    <Description value={birthday}/>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Bio:</Title>
                    <Description value={bio}>
                        <Paragraph className='col-span-2'>{bio}</Paragraph>
                    </Description>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Date Joined:</Title>
                    <Description 
                        value={created_at} 
                        select={value => (new Date(value)).toLocaleDateString()}
                    />
                </div>

            </div>

            <Divider />

            <Title level={3}>Contact</Title>
            <div className='space-y-4 text-base text-gray-700 mt-8'>
                <div className='grid grid-cols-3'>
                    <Title level={5}>Email:</Title>
                    <Typography.Link href={`mailto:${email}`}  className='col-span-2'>{email}</Typography.Link>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Facebook:</Title>
                    <Text className='col-span-2' type='secondary' italic>Not Set</Text>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>LinkedIn:</Title>
                    <Text className='col-span-2' type='secondary' italic>Not Set</Text>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Contact Number:</Title>
                    <Text className='col-span-2' type='secondary' italic>Not Set</Text>
                </div>

            </div>
        </Card>
    )
}