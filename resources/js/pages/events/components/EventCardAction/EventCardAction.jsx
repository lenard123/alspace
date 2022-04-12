import InterestedButton from "./InterestedButton";
import { useContext } from 'react'
import { EventContext } from "../EventCard";
import { Spin } from "antd";
import { useMutation } from "react-query";
import { cancelParticipation } from "@/js/apis/EventApi";
import { LoadingOutlined } from "@ant-design/icons";
import useEventMutator from "@/js/queries/useEventMutator";

export default function EventCardAction() {
    const { is_interested, id } = useContext(EventContext)
    const { updateEvent } = useEventMutator()
    const { isLoading, mutate } = useMutation(cancelParticipation, {
        onSuccess: (data) => {
            updateEvent(data)
        }
    })

    if (is_interested) {
        return (
            <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
                <button onClick={() => mutate(id)} className='w-full rounded text-sm btn btn-secondary active'>
                    <span className='font-semibold'>Interested</span>
                </button>
            </Spin>
        )
    }

    return <InterestedButton />
}