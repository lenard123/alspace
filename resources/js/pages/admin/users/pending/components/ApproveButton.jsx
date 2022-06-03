import { UserApi } from "@/js/apis";
import queryKeyFactory from "@/js/query/queryKeyFactory";
import { Button, message, Popconfirm } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { useState } from 'react'
import { successMessage } from "@/js/utils";

export default function ApproveButton({ id }) {

    const [visible, setVisible] = useState(false)
    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation(() => UserApi.approveUser(id), {
        onSuccess() {
            successMessage('User Successfully Approved')
            setVisible(false)
            queryClient.invalidateQueries(queryKeyFactory.pendingUsersAll)
        }
    })

    const handleClick = () => {
        if (isLoading) return;
        mutate()        
    }

    const handleCancel = () => {
        if (isLoading) return
        setVisible(false)
    }

    return (
        <Popconfirm
            title="Are you sure to Approve this user?"
            onConfirm={handleClick}
            onCancel={handleCancel}
            okButtonProps={{loading: isLoading}}
            visible={visible}
            >
            <Button onClick={() => setVisible(true)} type='primary' ghost>Approve</Button>
        </Popconfirm>
    )
}