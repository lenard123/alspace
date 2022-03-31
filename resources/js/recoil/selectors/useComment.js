import { useRecoilValue } from "recoil"
import commentsLikerIdsState from "../states/commentsLikerIdsState"
import commentsState from "../states/commentsState"


const useComment = (commentId) => {
    const comments = useRecoilValue(commentsState)
    return comments[commentId]
}

export const useCommentLikerIds = (commentId) => {
    const commentsLikerIds = useRecoilValue(commentsLikerIdsState)
    return commentsLikerIds[commentId] || []
}

export const useCommentLikersCount = (commentId) => {
    return useCommentLikerIds(commentId).length
}

export default useComment