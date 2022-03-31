import { arrayPluck } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import postsCommentIdsState from "../states/postsCommentIdsState"
import useCommentsAction from "./useCommentsAction"

const usePostsCommentIdsAction = () => {

    const setPostsCommentIdsState = useSetRecoilState(postsCommentIdsState)
    const { setComments } = useCommentsAction()

    const setPostsCommentIds = (posts) => {
        const comments = arrayPluck(posts, 'comments').flat()
        setComments(comments)
        setPostsCommentIdsState(oldIds => {
            return posts.reduce((acm, post) => {
                if (!post.comments) return acm
                return {
                    ...acm, 
                    [post.id]: arrayPluck(post.comments, 'id')
                }
            }, oldIds)
        })
    }

    const appendPostCommentIds = (postId, comment) => {
        setComments([comment])
        setPostsCommentIdsState(oldIds => {
            const commentIds = oldIds[postId] || []
            return {
                ...oldIds,
                [postId]: [...commentIds, comment.id]
            }
        })
    }

    return {
        setPostsCommentIds,
        appendPostCommentIds
    }
}

export default usePostsCommentIdsAction