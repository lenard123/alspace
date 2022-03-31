import { useRecoilValue } from "recoil"
import commentsState from "../states/commentsState"
import postsCommentIdsState from "../states/postsCommentIdsState"


const usePostComments = (postId) => {
    const comments = useRecoilValue(commentsState)
    const postsCommentIds = useRecoilValue(postsCommentIdsState)
    const postCommentIds = postsCommentIds[postId] || []
    return postCommentIds.map(id => comments[id])
}

export default usePostComments