import { AuthApi } from "@/js/apis";
import useApi from "@/js/hooks/useApi";
import useAuthActions from "@/js/recoil/actions/useAuthActions";
import { Modal } from "antd";
import { atom, useRecoilState } from "recoil";

const isDrawerVisibleState = atom({
    key: 'mainlayout.isDrawerVisible',
    default: false
})

const useMainLayoutLogic = () => {
    const { execute, navigate, message } = useApi(AuthApi.logout)
    const { removeCurrentUser } = useAuthActions()
    const [isDrawerVisible, setIsDrawerVisible] = useRecoilState(isDrawerVisibleState)

    const showLogoutModal = () => {
        Modal.confirm({
            title: 'Confirm logout',
            content: 'Are you sure to logout?',
            async onOk() {
                await execute()
                removeCurrentUser()
                navigate('/login')
                message.success('Logout successfully')
            }
        })
    }

    return {
        isDrawerVisible,
        setIsDrawerVisible,
        showLogoutModal
    }
}

export default useMainLayoutLogic