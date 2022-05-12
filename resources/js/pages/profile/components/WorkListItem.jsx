import { Timeline, Typography } from "antd";

const { Item } = Timeline
const { Text } = Typography

export default function WorkListItem({work}){
    return (
        <Item>
            <Text>Started Working at </Text>
            <Text strong>{work.company}</Text>
            <Text> in </Text>
            <Text type='success'>{moment(work.start_at).format('MMMM DD, YYYY')}</Text>
            {work.position && (
                <>
                    <Text> as </Text>
                    <Text underline>{work.position}</Text>
                </>
            )}
        </Item>
    )
}