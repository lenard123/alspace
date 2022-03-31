import { useMemo } from 'react'
import { selector, useRecoilValue } from "recoil"
import authState from "../states/authState"
import usersState from "../states/usersState"
import { useCommentLikerIds } from './useComment'
import { usePostLikerIds } from "./usePost"

const currentUserSelector = selector({
    key: 'currentUser',
    get: ({get}) => {
        const users = get(usersState)
        const { currentUserId } = get(authState)
        return users[currentUserId]
    }
})

export const useIsCurrentUserLikePost = (postId) => {
    const { currentUserId } = useRecoilValue(authState)
    const postLikerIds = usePostLikerIds(postId)
    return useMemo(() => {
        return postLikerIds.indexOf(currentUserId) !== -1
    }, [postLikerIds])
}

export const useIsCurrentUserLikeComment = (commentId) => {
    const { currentUserId } = useRecoilValue(authState)
    const commentLikerIds = useCommentLikerIds(commentId)
    return useMemo(() => {
        return commentLikerIds.indexOf(currentUserId) !== -1
    }, [commentLikerIds])
}

export default currentUserSelector