import { AuthApi } from "@/js/apis"
import { message, Modal } from "antd"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import queryKeyFactory from "../query/queryKeyFactory"
import { successMessage } from "../utils"


const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutateAsync } = useMutation(AuthApi.logout, {
        onSuccess: () => {
            queryClient.removeQueries([])
            queryClient.setQueryData(queryKeyFactory.currentUser, null)
            successMessage('Logout succesfully')
            navigate('/login')
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