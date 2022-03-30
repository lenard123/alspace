import { useRecoilValue } from "recoil"
import postsLikerIdsState from "../states/postsLikerIds";
import postsState from "../states/postsState"


export const usePostLikerIds = (id) => {
    const postsLikerIds = useRecoilValue(postsLikerIdsState);
    return postsLikerIds[id] || []
}

export const usePostLikeCount = (id) => {
    const likerIds = usePostLikerIds(id)
    return likerIds.length
}

const usePost = (id) => {
    const posts = useRecoilValue(postsState)
    return posts[id]
}

export default usePost