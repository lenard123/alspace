import { UserApi } from "@/js/apis"
import queryKeyFactory from "@/js/query/queryKeyFactory"
import { successMessage } from "@/js/utils"
import { message, Modal } from "antd"
import { useMutation, useQueryClient } from "react-query"


export default function usePendingUserAction()
{
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation(UserApi.approveUser, {
        onSuccess() {
            successMessage('User Successfully Approved')
            queryClient.invalidateQueries(queryKeyFactory.pendingUsersAll)
        }
    })

    const { mutateAsync:rejectRegistration } = useMutation(UserApi.rejectUser, {
        onSuccess() {
            successMessage('User Application has been successfully rejected')
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

    const rejectAlumni = (id) => {
        Modal.confirm({
            title: 'Are you sure to reject this application?',
            async onOk() {
                await rejectRegistration(id)
            }
        })
    }

    return { approveAlumni, rejectAlumni}
}