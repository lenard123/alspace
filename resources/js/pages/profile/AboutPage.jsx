import { Card, Descriptions, Divider, Typography } from "antd";

const { Title, Text, Paragraph } = Typography

export default function AboutPage() {
    return (
        <Card
            className='mt-3'
            title={null}
        >
            <Title level={3}>Info</Title>
            <div className='space-y-4 text-base text-gray-700 mt-8'>
                <div className='grid grid-cols-3'>
                    <Title level={5}>Name:</Title>
                    <Text className='col-span-2'>Lenard Mangay-ayam</Text>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Gender:</Title>
                    <Text className='col-span-2' type='secondary' italic>Unspecified</Text>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Birthday:</Title>
                    <Text className='col-span-2' type='secondary' italic>Not Set</Text>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Bio:</Title>
                    {/* <Text className='col-span-2' type='secondary' italic>Not Set</Text> */}
                    <Paragraph className='col-span-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam ducimus consectetur sint voluptatibus beatae similique quod iusto tempora a. Corporis aspernatur libero suscipit soluta reiciendis incidunt eum quia amet non.</Paragraph>
                </div>

                <Divider />

                <div className='grid grid-cols-3'>
                    <Title level={5}>Date Joined:</Title>
                    <Text className='col-span-2'>5/15/2022</Text>
                </div>

            </div>
        </Card>
    )
}