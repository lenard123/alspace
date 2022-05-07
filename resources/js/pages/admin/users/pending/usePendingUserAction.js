import { UserApi } from "@/js/apis"
import queryKeyFactory from "@/js/query/queryKeyFactory"
import { message, Modal } from "antd"
import { useMutation, useQueryClient } from "react-query"


export default function usePendingUserAction()
{
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation(UserApi.approveUser, {
        onSuccess() {
            message.success('User Successfully Approved')
            queryClient.invalidateQueries(queryKeyFactory.pendingUsersAll)
        }
    })

    const approveAlumni = (id) => {
        Modal.confirm({
            title: 'Are you sure to approve this registration?',
            async onOk(){
                await mutateAsync(id)
            }
        })
    }

    return { approveAlumni }
}