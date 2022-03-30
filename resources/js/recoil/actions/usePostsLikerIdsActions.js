import { useSetRecoilState } from "recoil"
import postsLikerIdsState from "../states/postsLikerIds"

const usePostsLikerIdsActions = () => {
    
    const setPostsLikerIdsState = useSetRecoilState(postsLikerIdsState)

    const setPostsLikerIds = (posts) => {
        setPostsLikerIdsState(postsLikerIds => {
            return posts.reduce((acm, post) => {
                return {...acm, [post.id]: post.likerIds}
            }, postsLikerIds)
        })
    }

    const setPostLikerIds = (postId, likerIds) => {
        setPostsLikerIdsState(postsLikerIds => {
            return {...postsLikerIds, [postId]: likerIds}
        })
    }

    return {
        setPostsLikerIds,
        setPostLikerIds
    }
}

export default usePostsLikerIdsActions;