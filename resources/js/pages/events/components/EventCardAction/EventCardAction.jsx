import InterestedButton from "./InterestedButton";
import { useContext, useState } from 'react'
import { EventContext } from "../EventCard";
import { Dropdown, Spin, Menu } from "antd";
import { useMutation } from "react-query";
import { addToGoing, addToInterested, cancelParticipation } from "@/js/apis/EventApi";
import { LoadingOutlined } from "@ant-design/icons";
import useEventMutator from "@/js/query/mutators/useEventMutator";
import classNames from "classnames";

const action = (type, id) => {
    switch (type) {
        case 'going':
            return addToGoing(id)
        case 'cancel':
            return cancelParticipation(id)
        default:
            return addToInterested(id)
    }
}


export default function EventCardAction() {
    const [visible, setVisible] = useState(false)
    const { is_interested, is_going, id } = useContext(EventContext) || {}
    const is_participating = is_interested || is_going
    const { updateEvent } = useEventMutator()
    const { isLoading, mutate } = useMutation(
        (type) => action(type, id), 
        {
            onSuccess: (data) => {
                updateEvent(data)
                setVisible(false)
            }
        }
    )

    const handleClick = () => {
        if (is_participating) {
            setVisible(true)
            return
        }
        mutate('interested')
        setVisible(false)
    }

    const handleMenuClick = ({key}) => {
        mutate(key)
    }

    return (
        <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
            <Dropdown 
                placement='top' 
                overlay={is_participating ?<Menu onClick={handleMenuClick}>
                            <Menu.Item key='going'><a>Going</a></Menu.Item>
                            <Menu.Item key='cancel'><a>Not Interested</a></Menu.Item>
                        </Menu>                    
                :<span/>}
                visible={visible}
                onVisibleChange={() => setVisible(false)}
                >
                <button
                    onClick={handleClick}
                    className={classNames(`w-full rounded text-sm btn btn-secondary`, { 'active': is_participating })}
                    >
                    <span className='font-semibold'>{is_going ? 'Going' : 'Interested'}</span>
                </button>
            </Dropdown>
        </Spin>
    )

}