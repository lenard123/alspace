import { Cache } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import authState from "../states/authState"
import useUsersAction from "./useUsersAction"

const useAuthActions = () => {
    const setAuthState = useSetRecoilState(authState)
    const { setUser } = useUsersAction()

    const setCurrentUser = (user) => {
        setUser(user)
        setAuthState({
            isAuthenticated: Cache.set('isAuthenticated', true),
            currentUserId: user.id
        })
    }

    const setAuthenticated = () => {
        setAuthState({
            isAuthenticated: Cache.set('isAuthenticated', true),
            currentUserId: null
        })
    }

    const removeCurrentUser = () => {
        setAuthState({
            isAuthenticated: Cache.set('isAuthenticated', false),
            currentUserId: null
        })
    }

    return {
        setCurrentUser,
        setAuthenticated,
        removeCurrentUser
    }

}

export default useAuthActions