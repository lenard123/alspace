import { useSetRecoilState } from "recoil"
import commentsLikerIdsState from "../states/commentsLikerIdsState"

const useCommentsLikerIdsActions = () => {

    const setCommentsLikerIdsState = useSetRecoilState(commentsLikerIdsState)

    const setCommentsLikerIds = (comments) => {
        setCommentsLikerIdsState(commentsLikerIds => {
            return comments.reduce((acm, comment) => {
                return {...acm, [comment.id]:comment.likerIds}
            }, commentsLikerIds)
        })
    }

    const setCommentLikerIds = (commentId, likerIds) => {
        setCommentsLikerIdsState(old => ({
            ...old,
            [commentId]: likerIds
        }))
    }
    
    return {
        setCommentsLikerIds,
        setCommentLikerIds
    }
}

export default useCommentsLikerIdsActions