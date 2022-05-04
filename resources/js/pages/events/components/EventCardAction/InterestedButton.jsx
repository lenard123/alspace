import { addToInterested } from "@/js/apis/EventApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useMutation } from "react-query";
import { useContext } from 'react'
import { EventContext } from "../EventCard";
import useEventMutator from "@/js/query/mutators/useEventMutator";

export default function InterestedButton()
{
    const { id } = useContext(EventContext)
    const { updateEvent } = useEventMutator()
    const { isLoading, mutate } = useMutation(addToInterested, {
        onSuccess: (data) => {
            updateEvent(data)
        }
    })
    
    return (
        <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
            <button onClick={() => mutate(id)} className='w-full rounded text-sm btn btn-secondary'>
                <span className='font-semibold'>Interested</span>
            </button>
        </Spin>
    )
}