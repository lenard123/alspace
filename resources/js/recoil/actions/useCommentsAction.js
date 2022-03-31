import { arrayKeyBy, arrayPluck, arrayPluckAndExclude } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import commentsState from "../states/commentsState"
import useUsersAction from "./useUsersAction"


const useCommentsAction = () => {

    const setCommentsState = useSetRecoilState(commentsState)
    const { setUsers } = useUsersAction()

    const setComments = (comments) => {
        const [users, compactComments] = arrayPluckAndExclude(comments, 'user')
        setUsers(users)
        setCommentsState(oldData => ({
            ...oldData,
            ...arrayKeyBy(compactComments, 'id')
        }))
    }

    return {
        setComments
    }
}

export default useCommentsAction