import { AuthApi } from "@/js/apis"
import { message, Modal } from "antd"
import { useMutation, useQueryClient } from "react-query"


const useLogout = () => {
    const queryClient = useQueryClient()
    const { mutateAsync } = useMutation(AuthApi.logout, {
        onSuccess: () => {
            queryClient.setQueryData(['users', 'current'], null)
            queryClient.removeQueries([])
            message.success('Logout succesfully')
        }
    })

    const showLogoutModal = () => {
        Modal.confirm({
            title: 'Confirm logout',
            content: 'Are you sure to logout?',
            async onOk() {
                await mutateAsync()
            }
        })
    }

    return {
        showLogoutModal
    }
}

export default useLogout