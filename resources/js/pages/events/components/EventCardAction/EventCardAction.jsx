import InterestedButton from "./InterestedButton";
import { useContext } from 'react'
import { EventContext } from "../EventCard";
import { Spin } from "antd";
import { useMutation } from "react-query";
import { addToInterested, cancelParticipation } from "@/js/apis/EventApi";
import { LoadingOutlined } from "@ant-design/icons";
import useEventMutator from "@/js/queries/useEventMutator";
import classNames from "classnames";

export default function EventCardAction() {
    const { is_interested, id } = useContext(EventContext)
    const { updateEvent } = useEventMutator()
    const { isLoading, mutate } = useMutation(
        () => is_interested 
            ? cancelParticipation(id) 
            : addToInterested(id), {
        onSuccess: (data) => {
            updateEvent(data)
        }
    })

    return (
        <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
            <button 
                onClick={() => mutate()} 
                className={classNames(`w-full rounded text-sm btn btn-secondary`, {'active': is_interested})}
                >
                <span className='font-semibold'>Interested</span>
            </button>
        </Spin>
    )

    return <InterestedButton />
}