import { UserApi } from "@/js/apis";
import queryKeyFactory from "@/js/queries/queryKeyFactory";
import { Button, message, Popconfirm } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { useState } from 'react'

export default function ApproveButton({ id }) {

    const [visible, setVisible] = useState(false)
    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation(() => UserApi.approveUser(id), {
        onSuccess() {
            message.success('User Successfully Approved')
            setVisible(false)
            queryClient.invalidateQueries(queryKeyFactory.pendingUsersAll)
        }
    })

    const handleClick = () => {
        if (isLoading) return;
        mutate()        
    }

    return (
        <Popconfirm
            title="Are you sure to Approve this user?"
            onConfirm={handleClick}
            okButtonProps={{loading: isLoading}}
            visible={visible}
            >
            <Button onClick={() => setVisible(true)} type='primary' ghost>Approve</Button>
        </Popconfirm>
    )
}