import { Card, Typography } from "antd";

const { Title, Paragraph, Text } = Typography

export default function ProfileCard({ bio, joined, alumnus }) {
    return (
        <Card className='w-2/5 self-start mt-3 shadow-lg hidden md:block'>
            <Title level={5}>Bio</Title>
            {bio
                ? <Paragraph>{bio}</Paragraph>
                : <Text type='secondary' italic>No bio set</Text>
            }

            {alumnus &&
                <>
                    <Title level={5}>Course</Title>
                    <Text>{alumnus.course}</Text>

                    <Title level={5}>Batch</Title>
                    <Text>{alumnus.year_graduated}</Text>
                </>
            }

            <Title level={5}>Joined</Title>
            <Text>{(new Date(joined)).toLocaleDateString()}</Text>
        </Card>
    )
}