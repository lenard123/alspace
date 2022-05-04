import useEventParticipantsQuery from "@/js/query/queries/useEventParticipantsQuery";
import { Avatar, Card, Empty, List } from "antd";


export default function EventDetailsPageParticipants({ type, id })
{

    const { isLoading, data } = useEventParticipantsQuery(id, type)
    
    return (
        <div className='page-wrapper my-6'>
            <Card className='max-w-2xl' title={<span className='text-lg font-bold capitalize'>{type}</span>}>
                <List
                    loading={isLoading}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatarUrl} />}
                                title={item.fullname}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}