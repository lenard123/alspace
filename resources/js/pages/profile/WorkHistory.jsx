import { Card, Timeline, Typography } from "antd";

const { Item } = Timeline
const { Title, Text } = Typography

export default function WorkHistory()
{
    return (
        <Card
            className='max-w-xl'
            title={<Title level={4}>Work Experience</Title>}
            >
            <Timeline>
                <Item>
                    Started Working at <Text strong> Krasty Crab</Text> in <Text type='success'>May 9, 2021</Text> as <Text underline>Cook</Text>
                </Item>
            </Timeline>
        </Card>
    )
}