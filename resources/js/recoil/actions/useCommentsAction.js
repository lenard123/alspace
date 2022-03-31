import { arrayDropKeys, arrayKeyBy, arrayPluck, arrayPluckAndExclude } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import commentsState from "../states/commentsState"
import useCommentsLikerIdsActions from "./useCommentsLikerIdsActions"
import useUsersAction from "./useUsersAction"


const useCommentsAction = () => {

    const setCommentsState = useSetRecoilState(commentsState)
    const { setUsers } = useUsersAction()
    const { setCommentsLikerIds } = useCommentsLikerIdsActions()

    const setComments = (comments) => {
        const [compactComments, {user:users}] = arrayDropKeys(comments, 'likerIds', 'user')
        setUsers(users)
        setCommentsLikerIds(comments)

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